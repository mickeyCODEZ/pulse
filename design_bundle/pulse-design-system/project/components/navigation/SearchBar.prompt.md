Pill search field with leading glyph + clear button. For event search and the city picker.

```jsx
<SearchBar value={q} onChange={setQ} onSubmit={run} placeholder="Search events, venues, categories" autoFocus />
```

Sizes `sm | md | lg`. Controlled — wire `value`/`onChange`; the clear button resets to "".
