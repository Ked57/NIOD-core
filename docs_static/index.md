# NIOD

[WIP]

```typescript
initNiod().then(async () => {
  setInterval(async () => {
    let groupsWithUnits: any[] = [];
    await Promise.all(
      (await getGroups(1)).map(async group =>
        groupsWithUnits.push({
          ...group,
          units: await getUnits(group.name)
        })
      )
    );
    console.log("groups", groupsWithUnits);

    let groupsWithUnits2: any[] = [];
    await Promise.all(
      (await getGroups(2)).map(async group =>
        groupsWithUnits.push({
          ...group,
          units: await getUnits(group.name)
        })
      )
    );
    console.log("groups2", groupsWithUnits2);
  }, 2500);

  addEventHandler(EVENTS.EventKill, (payload: EventKill) =>
    console.log("Player was killed", payload)
  );
});
```
