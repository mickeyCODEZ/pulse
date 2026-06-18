Mobile bottom nav — up to 5 destinations (Feed, Saved, Digest, For me…). `badge:true` shows an unread dot.

```jsx
<BottomNav active="feed" onSelect={go}
  items={[{key:"feed",label:"Feed",icon:<Home/>},{key:"saved",label:"Saved",icon:<Bookmark/>},{key:"me",label:"For me",icon:<User/>}]} />
```
