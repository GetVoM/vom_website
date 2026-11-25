import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Images go through components/ui/Image.tsx (or ImageView in client components), which serve the pre-optimized files.
  {
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "next/image",
              importNames: ["default"],
              message: "Use @/components/ui/Image (ImageView in a client component): it serves the pre-optimized files in public/images/optimized/.",
            },
          ],
        },
      ],
    },
  },
  { files: ["components/ui/ImageView.tsx"], rules: { "no-restricted-imports": "off" } },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Downloaded copy of the WordPress site, kept only as a content source.
    "getvom.com/**",
  ]),
]);

export default eslintConfig;
