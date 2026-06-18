The "travel anywhere" control — active city + picker, with progressive cold-start status baked in.

```jsx
<LocationSwitcher city="Lisbon" loading statusText="still finding local gems…" onClick={openPicker} />
```

Use `size="lg"` in the mobile header. Never show a blank wait — keep `loading` on until niche sources finish trickling in.
