Pill action button — monochrome; `primary` is a solid ink/bone fill, `secondary` a hairline outline, `ghost` is bare.

```jsx
<Button>Get tickets</Button>
<Button variant="secondary" iconLeft={<SaveIcon/>}>Save</Button>
<Button variant="ghost" size="sm">Not interested</Button>
<Button block size="lg">Build my feed</Button>
```

Sizes `sm | md | lg`. Use exactly one `primary` per view. Reserve it for the outbound/primary action.
