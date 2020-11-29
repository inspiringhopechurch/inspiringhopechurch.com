// Code taken from https://github.com/Faithlife/react-reftagger
import { useState, useEffect } from "react";

const addScript = (setScriptAdded) => {
  setScriptAdded(true);
  const el = document.createElement("script");
  el.type = "text/javascript";
  el.async = true;
  el.src = "../assets/refTagger.js";
  document.getElementsByTagName("body")[0].appendChild(el);
};

const addRefTagger = (props) => {
  window.refTagger = {
    settings: {
      bibleVersion: props.bibleVersion,
      tooltipStyle: props.tooltipStyle,
      tagChapters: props.tagChapters,
      roundCorners: true,
      socialSharing: [],
    },
  };
};

export const RefTagger = (props) => {
  const [scriptAdded, setScriptAdded] = useState(false);

  useEffect(() => {
    !scriptAdded && addScript(setScriptAdded);
    window && !window.refTagger && addRefTagger(props);
    window.refTagger && window.refTagger.tag && window.refTagger.tag();
    return () => window.refTagger && window.refTagger.tag && window.refTagger.tag();
  }, [scriptAdded, props]);

  return null;
};
