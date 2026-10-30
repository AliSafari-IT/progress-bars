import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

// design-tokens' base CSS @imports Google Fonts; strip those so consumers don't make
// third-party font requests just by loading the library stylesheet.
const stripRemoteFontImports = {
  postcssPlugin: "strip-remote-font-imports",
  AtRule: {
    import(atRule: { params: string; remove: () => void }) {
      if (/fonts\.googleapis\.com/.test(atRule.params)) atRule.remove();
    }
  }
};

export default defineConfig({
  css: { postcss: { plugins: [stripRemoteFontImports] } },
  plugins: [
    react(),
    dts({
      entryRoot: "src",
      outDir: "dist",
      exclude: ["**/*.test.*", "**/*.spec.*", "**/__tests__/**", "**/*.stories.*"],
      insertTypesEntry: true
    })
  ],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "AsafarimProgressBars",
      formats: ["es", "cjs"],
      fileName: (format) => (format === "es" ? "index.js" : "index.cjs")
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM"
        }
      }
    }
  }
});
