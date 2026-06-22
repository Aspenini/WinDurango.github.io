import { mount } from "svelte";
import App from "./App.svelte";
import "./styles/global.scss";
import "./styles/home.scss";

const target = document.getElementById("app");

if (!target) {
  throw new Error("Missing #app mount target");
}

export default mount(App, { target });
