# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## 0.0.0 (2025-12-24)

### ⚠ BREAKING CHANGES

- **application:** useGetTasks() no longer receives useCase parameter.
  Hook now uses Apollo Client useQuery directly with cache-and-network policy.

### 🚀 Features

- add application package ([aca179c](https://github.com/LeoVitale/vita-product-boilerplate/commit/aca179c8b02ec38151fe5be11f1160a08ba43ebb))
- add domain package ([91bbc31](https://github.com/LeoVitale/vita-product-boilerplate/commit/91bbc3198f3bed85e624e174a07bc5a3f590b986))
- add GraphQL codegen setup ([fe30b59](https://github.com/LeoVitale/vita-product-boilerplate/commit/fe30b594659b74279bb64fd19ff27b58433dd99c))
- **application:** create use-cases factory ([da2331b](https://github.com/LeoVitale/vita-product-boilerplate/commit/da2331b010e1ba5a9620fca02731da31b522dbb0))
- **config:** add centralized API configuration ([3144b6a](https://github.com/LeoVitale/vita-product-boilerplate/commit/3144b6abe03ed9faee80a368eaa7296f7323389d))
- connect web app to api with react query ([6af5220](https://github.com/LeoVitale/vita-product-boilerplate/commit/6af5220d352bae3fd57345eb8a169ab8cb4944cd))
- **create-turbo:** apply official-starter transform ([d27d623](https://github.com/LeoVitale/vita-product-boilerplate/commit/d27d623eac77a250232c7e4c237f8ffa1b714c6a))
- **create-turbo:** apply pnpm-eslint transform ([5e7a951](https://github.com/LeoVitale/vita-product-boilerplate/commit/5e7a951c5b4cd8e52a1ab8c70daab1387c53e201))
- **create-turbo:** create basic ([3fb8616](https://github.com/LeoVitale/vita-product-boilerplate/commit/3fb861605e031527ea92a766bcf52ce881acddc5))
- **create-turbo:** install dependencies ([76cea92](https://github.com/LeoVitale/vita-product-boilerplate/commit/76cea92ddac73eebb0f30d4b9296e8ffafe05a77))
- **domain:** add zod, result and interfaces ([d933037](https://github.com/LeoVitale/vita-product-boilerplate/commit/d9330372d7ee7844ade6adebf348057cc3984d2a))
- **infra:** add apollo repository implementation ([ce88ce0](https://github.com/LeoVitale/vita-product-boilerplate/commit/ce88ce01a53b6fae874deb93fc81c2e4809d939c))
- init mobile app with Expo and React Navigation ([0490a0b](https://github.com/LeoVitale/vita-product-boilerplate/commit/0490a0b6387eb1c75e6061c0fc72dadd0cb958c1))
- init nestjs api with graphql ([4305eff](https://github.com/LeoVitale/vita-product-boilerplate/commit/4305eff917f01c0e4017b8dc3310214131e15068))
- **mobile:** create UseCasesProvider composition root ([445732b](https://github.com/LeoVitale/vita-product-boilerplate/commit/445732b7e8b256e80c52e5850470bc78f2ef6b03))
- **web:** create UseCasesProvider composition root ([312e8df](https://github.com/LeoVitale/vita-product-boilerplate/commit/312e8df6090f38df94b1729bfb31c9759e0f3496))

### ♻️ Refactoring

- **application:** migrate useGetTasks to Apollo useQuery ([3e12d28](https://github.com/LeoVitale/vita-product-boilerplate/commit/3e12d283a1195589deb86dcbe26fb24e8bcaea76))
- **app:** remove apollo and add use cases ([b48596d](https://github.com/LeoVitale/vita-product-boilerplate/commit/b48596deedba1696e38466504857ec698c9124be))
- **apps:** wire new architecture in web and mobile ([df83c6c](https://github.com/LeoVitale/vita-product-boilerplate/commit/df83c6c88756db09653422c5fe27034a0ab01808))
- mobile uses shared app ([8f842a7](https://github.com/LeoVitale/vita-product-boilerplate/commit/8f842a707bc23c63e1496bb1e9f0cd9e2e587b7c))
- **mobile:** integrate UseCasesProvider in App ([49fe0c7](https://github.com/LeoVitale/vita-product-boilerplate/commit/49fe0c76a43add587aeb406e01891ae43ab893a3))
- **mobile:** simplify asset loading in App.tsx ([21c0a6b](https://github.com/LeoVitale/vita-product-boilerplate/commit/21c0a6b0d9eb8e3226fc88b489cf4b2fcd18d52d))
- **mobile:** use centralized API config in ApolloProvider ([24d48fb](https://github.com/LeoVitale/vita-product-boilerplate/commit/24d48fb2404a23d42f79378e3dea7e60f88b9dbc))
- web uses shared app ([41705ea](https://github.com/LeoVitale/vita-product-boilerplate/commit/41705ea2136215e66326f1ac140b6c6858723a99))
- **web:** integrate UseCasesProvider in app layout ([43d8954](https://github.com/LeoVitale/vita-product-boilerplate/commit/43d89548284a879f892b6cbdac0ff35fcc8302bc))
- **web:** use centralized API config in apollo-client ([7b095ff](https://github.com/LeoVitale/vita-product-boilerplate/commit/7b095ffb20ef9061e5649b622966f5c36df901f2))

### 📚 Documentation

- add Apollo Client architecture documentation (EN) ([5fed3fd](https://github.com/LeoVitale/vita-product-boilerplate/commit/5fed3fd71052e56ae0dc935aa335ecf9d8970fda))
- add Apollo Client architecture documentation (PT) ([ecbbe1e](https://github.com/LeoVitale/vita-product-boilerplate/commit/ecbbe1e3b94a859a670398349a57fe1df51fce29))
- add architecture pages ([b0a2832](https://github.com/LeoVitale/vita-product-boilerplate/commit/b0a28322c5c51f5b53006ec6cfca05cf37d27098))
- add Clean Architecture rules ([d7737cd](https://github.com/LeoVitale/vita-product-boilerplate/commit/d7737cd933cc28f665f57a5a1db914bbbe83d561))
- add Composition Root pattern documentation (EN) ([81e89d1](https://github.com/LeoVitale/vita-product-boilerplate/commit/81e89d1464ed754311eba865a6a1a7e3e915edce))
- add Composition Root pattern documentation (PT) ([41394a4](https://github.com/LeoVitale/vita-product-boilerplate/commit/41394a43a6f693159e1c835b4efcbb1c19987bf4))
- add cursor tdd and docs rules ([1966681](https://github.com/LeoVitale/vita-product-boilerplate/commit/1966681f124b248baacd24f4656fe701a02c33bc))
- add docs skeleton ([0fd27e2](https://github.com/LeoVitale/vita-product-boilerplate/commit/0fd27e2ead38016a886e6640f1c6f51c86eab633))
- add glossary and references ([b4e58d8](https://github.com/LeoVitale/vita-product-boilerplate/commit/b4e58d85be59280055aa2b19e711aa58f868d979))
- add patterns pages ([9e3d9de](https://github.com/LeoVitale/vita-product-boilerplate/commit/9e3d9de772990798baedf306f87d1e9bfe51a0cc))
- add testing setup documentation (PT/EN) ([8a9efc3](https://github.com/LeoVitale/vita-product-boilerplate/commit/8a9efc38108099a4d329f7599df46ce8d0116b17))
- add workflows (feature, tdd) ([61c4ca2](https://github.com/LeoVitale/vita-product-boilerplate/commit/61c4ca23d84d5cd3e7ae0f0efdbb9d0dd7997f23))
- fix mermaid diagram syntax for github ([a099f65](https://github.com/LeoVitale/vita-product-boilerplate/commit/a099f65de78429bb98864e8d82c764ab105abf45))
- link readme to docs ([02fe245](https://github.com/LeoVitale/vita-product-boilerplate/commit/02fe24559283644701a6f4f4d67aef17da1277f9))
- tidy clean arch rules formatting ([74a3858](https://github.com/LeoVitale/vita-product-boilerplate/commit/74a3858a282f0c6e9bc48bda749dc02d58fd8c6f))
- update adding-a-feature workflow (EN) ([eb191e9](https://github.com/LeoVitale/vita-product-boilerplate/commit/eb191e944ba861885dfa5cf9b00ee091276371d9))
- update adding-a-feature workflow (PT) ([0931fce](https://github.com/LeoVitale/vita-product-boilerplate/commit/0931fce19b9524526b721dc605a03b02284e090b))
- update clean arch rules ([12cc612](https://github.com/LeoVitale/vita-product-boilerplate/commit/12cc612a75160f16623b7832ec1783b04365b745))
- update Clean Architecture rules ([1e9bfd4](https://github.com/LeoVitale/vita-product-boilerplate/commit/1e9bfd447352c5fce3e4deaefba9a8ac5a761ef5))
- update readme and architecture guide ([f4dee14](https://github.com/LeoVitale/vita-product-boilerplate/commit/f4dee1422cf4bcb50ea5f29a9527e8f398404b49))
- update rules for advanced clean architecture ([cc344ff](https://github.com/LeoVitale/vita-product-boilerplate/commit/cc344ff4c53a46ed5bc2496f229dd47066712002))

### 🐛 Bug Fixes

- add shebang to pre-commit hook ([34e98cf](https://github.com/LeoVitale/vita-product-boilerplate/commit/34e98cf94992db892074a24b109c311e95a81819))
- **api:** resolve lint issues ([cc7931a](https://github.com/LeoVitale/vita-product-boilerplate/commit/cc7931a50f96b6daa5048aca9d924fa850a7e629))
- **application:** fix test setup for Apollo Client ([614132a](https://github.com/LeoVitale/vita-product-boilerplate/commit/614132a1f980e9a17e32196948a06b80c2d8c4b2))
- **application:** resolve MockedProvider issues in Vitest ([322af83](https://github.com/LeoVitale/vita-product-boilerplate/commit/322af83e69696004083bd78f226f0a1c6fea8a7e))
- **config:** support eslint js/mjs ([4db9345](https://github.com/LeoVitale/vita-product-boilerplate/commit/4db93457475a7516cc7259416662557d83a406d4))
- correct Apollo Client imports and test setup ([e2f7095](https://github.com/LeoVitale/vita-product-boilerplate/commit/e2f7095e59ecb5eb43f2edb01858b4451d7a3dc6))
- **mobile:** resolve lint warnings ([8d128be](https://github.com/LeoVitale/vita-product-boilerplate/commit/8d128be21f09128fe2d00d46444f24e55fb7f1b9))
- resolve apollo imports and infra types ([4104320](https://github.com/LeoVitale/vita-product-boilerplate/commit/4104320ba76f2a7481164ec93a47e94300bb2c56))
- update config exports for tsconfig resolution ([fb75f13](https://github.com/LeoVitale/vita-product-boilerplate/commit/fb75f1393d812233e5b8b31662342570ef95cf5f))

### 🧪 Tests

- **application:** add factory tests for use-cases ([3c95b16](https://github.com/LeoVitale/vita-product-boilerplate/commit/3c95b1604d70bf51e14c19a1f21d42ceb256cad2))
- **application:** add useGetTasks Apollo hook tests ([b7dbccb](https://github.com/LeoVitale/vita-product-boilerplate/commit/b7dbccb97a17a45d78919b7a7038630976d3f2dc))
- improve tests following Testing Library best practices ([2667095](https://github.com/LeoVitale/vita-product-boilerplate/commit/2667095a521e4a82faba888640f8b5d1e8bb08ac))
- **mobile:** add UseCasesProvider tests ([43fe8cc](https://github.com/LeoVitale/vita-product-boilerplate/commit/43fe8cc244de5de49601745aaaa7fe1c23c817ee))
- verify hooks work ([b4cedae](https://github.com/LeoVitale/vita-product-boilerplate/commit/b4cedaedf8d7be11b19cb1c03f85d9ca42034238))
- **web:** add UseCasesProvider tests ([007e96a](https://github.com/LeoVitale/vita-product-boilerplate/commit/007e96ac60205e7af25b93b454cfbf476373569c))
