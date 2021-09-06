# Google Play API

## 1). List - Show list of apps
```
[ENDPOINT](GET) /apps
```
```url
[EXAMPLE] https://api-gplay.azharimm.site/apps?lang=id&category=GAME&collection=topselling_paid&page=1&limit=10
```
### Query params
| params        | desc | required |
| --------------- |:---------:|:---------:|
| lang | Data language | `no`, default 'en' |
| category | App category | `no` |
| collection | App category collection | `no`, default `topselling_free` |
|page | page data | `no`, default `1` |
|limit | size of array data | `no`, default `10` |

## 2). Search - Search apps
```
[ENDPOINT](GET) /apps?q=
```
```url
[EXAMPLE] https://api-gplay.azharimm.site/apps?q=Facebook
```
### Query params
| params        | desc | required |
| --------------- |:---------:|:---------:|
|q | Query search | `yes` |
| lang | Data language | `no`, default 'en' |
|page | page data | `no`, default `1` |
|limit | size of array data | `no`, default `10` |

## 3). Suggest
```
[ENDPOINT](GET) /apps?suggest=
```
```url
[EXAMPLE] https://api-gplay.azharimm.site/apps?suggest=Facebook
```
### Query params
| params        | desc | required |
| --------------- |:---------:|:---------:|
|suggest | Suggest keyword | `yes` |
| lang | Data language | `no`, default 'en' |

## 4). Detail - Show detail info of an app
```
[ENDPOINT](GET) /apps/:appId
```
```url
[EXAMPLE] https://api-gplay.azharimm.site/apps/com.facebook.katana
```

## 5). Similar - Show list of similar apps
```
[ENDPOINT](GET) /apps/:appId/similar
```
```url
[EXAMPLE] https://api-gplay.azharimm.site/apps/com.facebook.katana/similar
```
### Query params
| params        | desc | required |
| --------------- |:---------:|:---------:|
| lang | Data language | `no`, default 'en' |
|page | page data | `no`, default `1` |
|limit | size of array data | `no`, default `10` |

## 6). Permission - Show list permissions of app
```
[ENDPOINT](GET) /apps/:appId/permissions
```
```url
[EXAMPLE] https://api-gplay.azharimm.site/apps/com.facebook.katana/permissions
```

## 7). Reviews - Show list of reviews
```
[ENDPOINT](GET) /apps/:appId/reviews
```
```url
[EXAMPLE] https://api-gplay.azharimm.site/apps/com.facebook.katana/reviews
```
### Query params
| params        | desc | required |
| --------------- |:---------:|:---------:|
| lang | Data language | `no`, default 'en' |
|page | page data | `no`, default `1` |
|limit | size of array data | `no`, default `10` |

## 8). Categories - Show list of categories
```
[ENDPOINT](GET) /categories
```
```url
[EXAMPLE] https://api-gplay.azharimm.site/categories
```

## 9). Collections - Show list of collections
```
[ENDPOINT](GET) /collections
```
```url
[EXAMPLE] https://api-gplay.azharimm.site/collections
```

## 10). Developers - Show list of apps made by developers
```
[ENDPOINT](GET) /developers/:devId
```
```url
[EXAMPLE] https://api-gplay.azharimm.site/developers/Facebook
```
### Query params
| params        | desc | required |
| --------------- |:---------:|:---------:|
| lang | Data language | `no`, default 'en' |
|page | page data | `no`, default `1` |
|limit | size of array data | `no`, default `10` |
