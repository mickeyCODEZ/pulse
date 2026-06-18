Sticky, horizontally-scrollable chip bar above the feed: Today · This weekend · Free · Near me · [categories].

```jsx
<FilterBar
  filters={[{key:"today",label:"Today"},{key:"weekend",label:"This weekend"},{key:"free",label:"Free"},{key:"near",label:"Near me"}]}
  active={["weekend"]} onToggle={toggle} />
```
