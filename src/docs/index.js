/* eslint-disable import/extensions */
import basicInfo from "./basicInfo.js";
import server from "./server.js";
import tags from "./tag.js";
import components from "./components.js";
import path from "./path.js";

const docs = {
  ...basicInfo,
  ...server,
  ...tags,
  ...components,
  ...path,
};

export default docs;
