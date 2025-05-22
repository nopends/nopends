# nopends-docgen

## 2.0.0

### Major Changes

- 4642a86: **Remove `typescriptGenerator` from `nopends-docgen`**

  **why:** Move dedicated parts to `nopends-typescript`, so all docs generation features for TypeScript can be put together in a single module.

  **migrate:** Use `nopends-typescript` We made a new `remarkAutoTypeTable` remark plugin generating the type table but with a different syntax:

  ```mdx
  <auto-type-table path="./my-file.ts" name="MyInterface" />
  ```

  Instead of:

  ````mdx
  ```json doc-gen:typescript
  {
    "file": "./my-file.ts",
    "name": "MyInterface"
  }
  ```
  ````

- 4642a86: **Move `remarkTypeScriptToJavaScript` plugin to `nopends-docgen/remark-ts2js`.**

  **why:** Fix existing problems with `oxc-transform`.

  **migrate:**

  Import it like:

  ```ts
  import { remarkTypeScriptToJavaScript } from 'nopends-docgen/remark-ts2js';
  ```

  instead of importing from `nopends-docgen`.

## 1.3.8

### Patch Changes

- Updated dependencies [7608f4e]
  - nopends-typescript@3.0.4

## 1.3.7

### Patch Changes

- 260128f: Add `remarkShow` plugin
  - nopends-typescript@3.0.3

## 1.3.6

### Patch Changes

- a8e9e1f: Bump deps
  - nopends-typescript@3.0.3

## 1.3.5

### Patch Changes

- b9601fb: Update Shiki
- Updated dependencies [b9601fb]
  - nopends-typescript@3.0.3

## 1.3.4

### Patch Changes

- 6d3c7d2: Use `oxc` for `ts2js` remark plugins
  - nopends-typescript@3.0.2

## 1.3.3

### Patch Changes

- 4ab0de6: Support TS2JS remark plugin [experimental]
  - nopends-typescript@3.0.2

## 1.3.2

### Patch Changes

- Updated dependencies [c042eb7]
  - nopends-typescript@3.0.2

## 1.3.1

### Patch Changes

- Updated dependencies [d6d290c]
  - nopends-typescript@3.0.1

## 1.3.0

### Minor Changes

- f9adba6: Support inline type syntax in `AutoTypeTable` `type` prop

### Patch Changes

- be820c4: Bump deps
- Updated dependencies [f9adba6]
- Updated dependencies [f9adba6]
- Updated dependencies [f9adba6]
- Updated dependencies [be820c4]
  - nopends-typescript@3.0.0

## 1.2.0

### Minor Changes

- 3a2c837: Improve caching

### Patch Changes

- 0c251e5: Bump deps
- Updated dependencies [0c251e5]
- Updated dependencies [3a2c837]
  - nopends-typescript@2.1.0

## 1.1.0

### Minor Changes

- 979896f: Support generating Tabs with `persist` enabled (Nopends UI only)

### Patch Changes

- nopends-typescript@2.0.1

## 1.0.2

### Patch Changes

- 8ef2b68: Bump deps
- Updated dependencies [8ef2b68]
  - nopends-typescript@2.0.1

## 1.0.1

### Patch Changes

- Updated dependencies [f75287d]
  - nopends-typescript@2.0.0
