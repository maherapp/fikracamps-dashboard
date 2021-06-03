import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  ButtonGroup,
  Button,
  TextField,
} from "@material-ui/core";

import { Editor, EditorState, RichUtils } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import PagesIcon from "@material-ui/icons/Pages";
import MenuIcon from "@material-ui/icons/Menu";
import ImageIcon from "@material-ui/icons/Image";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import SaveIcon from "@material-ui/icons/Save";
import CodeIcon from "@material-ui/icons/Code";
import SpaceBarIcon from "@material-ui/icons/SpaceBar";
import { useRef, useState } from "react";
import "draft-js/dist/Draft.css";

import classes from "./App.module.css";
export default function App() {
  const blogTitle = useRef(null);
  const blogImage = useRef(null);

  const submit = async (ev) => {
    try {
      ev.preventDefault();
      const data = new FormData();
      data.append("title", blogTitle.current.value);
      data.append("content", stateToHTML(editorState.getCurrentContent()));
      data.append("image", blogImage.current.files[0]);
      const respone = await fetch(`http://${process.env.REACT_APP_DOMAIN}/api/blogs`, {
        method: "POST",
        body: data,
      });
      const json = await respone.json();
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editorRef = useRef(null);

  const bold = (ev) => {
    ev.preventDefault();
    const newState = RichUtils.toggleInlineStyle(editorState, "BOLD");
    setEditorState(newState);
  };

  const italic = (ev) => {
    ev.preventDefault();
    const newState = RichUtils.toggleInlineStyle(editorState, "ITALIC");
    setEditorState(newState);
  };

  const underline = (ev) => {
    ev.preventDefault();
    const newState = RichUtils.toggleInlineStyle(editorState, "UNDERLINE");
    setEditorState(newState);
  };

  const monospace = (ev) => {
    ev.preventDefault();
    const newState = RichUtils.toggleInlineStyle(editorState, "CODE");
    setEditorState(newState);
  };

  const h1 = (ev) => {
    ev.preventDefault();
    const newState = RichUtils.toggleBlockType(editorState, "header-one");
    setEditorState(newState);
  };

  const h2 = (ev) => {
    ev.preventDefault();
    const newState = RichUtils.toggleBlockType(editorState, "header-two");
    setEditorState(newState);
  };

  const h3 = (ev) => {
    ev.preventDefault();
    const newState = RichUtils.toggleBlockType(editorState, "header-three");
    setEditorState(newState);
  };

  const h4 = (ev) => {
    ev.preventDefault();
    const newState = RichUtils.toggleBlockType(editorState, "header-four");
    setEditorState(newState);
  };

  const h5 = (ev) => {
    ev.preventDefault();
    const newState = RichUtils.toggleBlockType(editorState, "header-five");
    setEditorState(newState);
  };

  const h6 = (ev) => {
    ev.preventDefault();
    const newState = RichUtils.toggleBlockType(editorState, "header-six");
    setEditorState(newState);
  };

  const bq = (ev) => {
    ev.preventDefault();
    const newState = RichUtils.toggleBlockType(editorState, "blockquote");
    setEditorState(newState);
  };

  const ul = (ev) => {
    ev.preventDefault();
    const newState = RichUtils.toggleBlockType(
      editorState,
      "unordered-list-item"
    );
    setEditorState(newState);
  };

  const ol = (ev) => {
    ev.preventDefault();
    const newState = RichUtils.toggleBlockType(
      editorState,
      "ordered-list-item"
    );
    setEditorState(newState);
  };

  const cb = (ev) => {
    ev.preventDefault();
    const newState = RichUtils.toggleBlockType(editorState, "code-block");
    setEditorState(newState);
  };

  const handleKeyCommand = function (command, editorState) {
    console.log(command);
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) setEditorState(newState);
  };
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" edge="start">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">FikraCamps Dashboard</Typography>
        </Toolbar>
      </AppBar>
      <Drawer>
        <List>
          <ListItem button>
            <ListItemIcon>
              <PagesIcon />
            </ListItemIcon>
            <ListItemText primary="Blog" />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <main className={classes.container}>
        <div>
          <form className={classes.blogForm} onSubmit={submit}>
            <TextField
              variant="outlined"
              label="Title"
              className={classes.blogTitle}
              inputRef={blogTitle}
            />
            <Button
              type="button"
              color="primary"
              variant="contained"
              component="label"
              className={classes.uploadImage}
            >
              <ImageIcon />
              <input type="file" hidden ref={blogImage} />
            </Button>
            <Button type="submit" color="primary" variant="contained">
              <SaveIcon />
            </Button>
          </form>
          <div className={classes.buttonContainer}>
            <ButtonGroup color="primary" variant="contained">
              <Button onMouseDown={h1}>H1</Button>
              <Button onMouseDown={h2}>H2</Button>
              <Button onMouseDown={h3}>H3</Button>
              <Button onMouseDown={h4}>H4</Button>
              <Button onMouseDown={h5}>H5</Button>
              <Button onMouseDown={h6}>H6</Button>
              <Button onMouseDown={bq}>
                <FormatQuoteIcon />
              </Button>
              <Button onMouseDown={ul}>
                <FormatListBulletedIcon />
              </Button>
              <Button onMouseDown={ol}>
                <FormatListNumberedIcon />
              </Button>
              <Button onMouseDown={cb}>
                <CodeIcon />
              </Button>
              <Button onMouseDown={bold}>
                <FormatBoldIcon />
              </Button>
              <Button onMouseDown={italic}>
                <FormatItalicIcon />
              </Button>
              <Button onMouseDown={underline}>
                <FormatUnderlinedIcon />
              </Button>
              <Button onMouseDown={monospace}>
                <SpaceBarIcon />
              </Button>
            </ButtonGroup>
          </div>
          <div
            className={classes.editorContainer}
            onClick={() => editorRef && editorRef.current.focus()}
          >
            <Editor
              ref={editorRef}
              editorState={editorState}
              onChange={setEditorState}
              handleKeyCommand={handleKeyCommand}
            />
          </div>
        </div>
      </main>
    </>
  );
}
