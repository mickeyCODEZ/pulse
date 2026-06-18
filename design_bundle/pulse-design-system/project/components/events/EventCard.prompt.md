The key component — image-forward ranked event card. Shows the relevance chip ("why surfaced"), source badges + dedup, price, category, freshness, and lightweight save/dismiss.

```jsx
<EventCard saved={saved} onSave={save} onDismiss={dismiss} onOpen={open}
  event={{
    category:"Live music", title:"Warehouse jazz, late", date:"Fri · 9pm",
    venue:"The Lot", distance:"0.4mi", price:12, freshness:"added 2h ago",
    relevance:["live music","under $15"], score:94,
    sources:["Resident Advisor","DICE"]
  }} />
```

`variant="compact"` is the horizontal row for Saved/Digest. `event.gem:true` applies the inverted "Hidden gems" treatment. `event.free:true` shows the Free marker.
