import fs from "node:fs";
import path from "node:path";
import { JSDOM } from "jsdom";
import prettier from "prettier"
import { minify } from "html-minifier";


export class BlueFoxDomGate {
  static async connect(
    index,
    root,
    out = "./index.out.html",
    depth = 10000,
    apply_prettier = true,
    apply_minify = false,
  ) {
    let index_path = path.resolve(index);
    let index_dir = path.dirname(index_path);
    let dist_dir = path.resolve(out);
    let root_dir = root ? path.resolve(root) : root;
    index_dir = root_dir ? root_dir : index_dir;

    let HTML = {};

    fs.globSync(`${index_dir}/**/*.html`).forEach((html_path) => {
      let text = fs.readFileSync(html_path, "utf-8");
      let dom = new JSDOM(text);
      HTML[html_path] = dom;
    });

    for (let counter = 0; counter < depth; counter++) {
      if (HTML[index_path].window.document.querySelector(`gate`)) {
        HTML[index_path].window.document.querySelectorAll(`gate`).forEach((gate_tag) => {
          let gate_target_path = path.join(index_dir, gate_tag.getAttribute("src"));
          gate_tag.outerHTML = HTML[gate_target_path].window.document.querySelector(`html`).outerHTML;
        });
      } else {
        break;
      }
    }

    let result_html = "<!DOCTYPE html>" + HTML[index_path].window.document.querySelector(`html`).outerHTML;
    if (apply_prettier) {
      result_html = await prettier.format(
        result_html,
        { parser: "html" }
      );
    }
    if (apply_minify) {
      result_html = minify(result_html, {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        minifyJS: true,
      });
    }


    fs.writeFileSync(dist_dir, result_html, "utf-8");
  }
}










