import { useEffect, useState } from 'react';
import './App.scss';
import { useBarcode } from 'react-barcodes';
import { GoogleLogin } from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
import { AppBar, Button, Container, IconButton, Input, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { Menu as MenuIcon } from "@material-ui/icons";

function Barcode({ value }: { value: string }) {
  const { inputRef } = useBarcode({
    value: value,
    options: {
      width: 2,
      height: 100
    }
  });

  return <li style={{}}>
    <div style={{ textAlign: 'center', fontWeight: 'bold' }}>Aristo</div>
    <svg ref={inputRef} />
  </li>;
}

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function genRandom() {
  return Math.floor((randomIntFromInterval(1, 99999999999999)))
}

function range(size: number, offset: number = 1) {
  return Array.from({ length: size }, (_, i) => i + offset);
}

let done = false;
const SCOPES = "https://www.googleapis.com/auth/drive.file";
const CLIENT_ID = "843901847350-30igg13jkqtha7fnb3eh7seatf09n93t.apps.googleusercontent.com"

const initClient = (options: {
  updateLoggedInStatus: (status: boolean) => void;
}) => {
  if (done) {
    return;
  }
  done = true;

  try {
    const response = gapi.client.init({ clientId: CLIENT_ID, scope: SCOPES })

    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(options.updateLoggedInStatus);

    // Handle the initial sign-in state.
    options.updateLoggedInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

  } catch (err: any) {
    console.error("Caught error", err);
  }
};

async function sync(arr: number[], setMessage: (msg: string) => any) {
  const fileName = "aristo-unique-codes.txt"

  setMessage("Fetching database...")
  var response = await gapi.client.drive.files.list({ 'pageSize': 100, 'fields': "files(id, name, trashed)", q: 'trashed=false' })

  var files = response.result.files;
  var fileId: string | undefined

  if (files && files.length > 0) {
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      if (file.name == fileName) {
        fileId = file.id
        break;
      }
    }
  }

  if (fileId == undefined) {
    response = await gapi.client.drive.files.create({
      resource: {
        name: fileName,
        mimeType: 'text/plain',
        parents: ["root"]
      },
      fields: "id"
    })
    switch (response.status) {
      case 200:
        file = response.result;
        fileId = file.id
        break;
      default:
        setMessage('Error creating database file, ' + response);
        return;
    }
  }

  if (fileId == undefined)
    return // TODO

  response = await gapi.client.drive.files.get({ fileId: fileId, alt: "media", fields: "id" })

  let content = ""

  switch (response.status) {
    case 200:
      file = response.result;
      content = response.body
      break;
    default:
      setMessage('Error reading file, ' + response);
      return;
  }

  let set = new Set(content.split("\n").map(x => parseInt(x)).concat(arr))
  set.delete(NaN)
  set.delete(0)

  var newContent = Array.from(set.keys()).map(x => x.toString().padStart(14, "0")).join("\n")

  setMessage("Updating database...")

  response = await gapi.client.request({
    path: "https://www.googleapis.com/upload/drive/v3/files/" + fileId,
    method: "PATCH",
    headers: {
      'Content-Type': "text/plain",
      "Content-Length": content.length,
    },
    params: { uploadType: "media" },
    body: newContent
  })

  setMessage("")
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const [value, setValue] = useState(18)
  const [codes, setCodes] = useState<number[]>([])
  const [loggedInStatus, setLoggedInStatus] = useState<boolean>(false);
  const [initiatedClient, setInitiatedClient] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const classes = useStyles();

  useEffect(() => {
    gapi.load('client', function () {
      gapi.client.load('drive', 'v3', function () {
      });
    });

    gapi.load("client:auth2", () => {
      initClient({
        updateLoggedInStatus: (status: any) => {
          setLoggedInStatus(status);
        },
      })
    });

    setInitiatedClient(true);
  }, [])

  function generateRandomCodes() {
    setCodes(range(value).map(() => genRandom()))
  }

  async function print() {
    try {
      await sync(codes, setMessage)
    }
    catch (e) {
      setMessage("")
      alert("An error ocurred while trying to sync with the cloud. Printing codes that are not stored in the cloud is not recommended.")
    }
    window.print()
  }

  function Body() {
    if (!loggedInStatus)
      return <></>
    return <main>
      <div className="noprint" >
        {loggedInStatus && <div>
          <div style={{ margin: "5px" }}>
            <Button variant="contained" color="primary" onClick={generateRandomCodes}>Generate barcodes</Button>
            <Input type="text" style={{ maxWidth: "35px", margin: "0 5px", verticalAlign: "center" }} inputProps={{ maxLength: 3 }} datatype={"number"} value={value} onChange={e => setValue(parseInt(e.target.value))} />
          </div >
          <div style={{ margin: "5px" }}>
            {codes.length > 0 && <Button variant="outlined" color="primary" onClick={async () => await print()}>Print</Button>}
            &nbsp;
          </div>
          <p>
            {message}
          </p>
        </div>}
      </div>
      <ul className="BarcodeList">
        {codes.map(code => <Barcode key={code} value={code.toString().padStart(14, "0")} />)}
      </ul>
    </main>
  }

  return <>
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Aristo
        </Typography>
        <Button color="inherit"> {!loggedInStatus && <GoogleLogin
          clientId={CLIENT_ID}
          buttonText="Log in with Google"
          style={{ display: "inline-block" }}
          scope={SCOPES}
          cookiePolicy={'single_host_origin'}
        />}
          {loggedInStatus &&
            <GoogleLogout
              clientId={CLIENT_ID}
              buttonText="Logout"
            >
            </GoogleLogout>}
        </Button>
      </Toolbar>
    </AppBar>
    {Body()}
  </>
}

export default App;
