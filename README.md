# heardquake

Heardquake is a visualization project to see recent sismic activities over a map and also to get some detailed informations on the activity. The project is written in TypeScript with VueJS UI framework and it uses a Leaflet map to visualize the incident locations. There are four categorical color indicators have been determined to show the significance level of the earthquakes. Color scheme goes from green (less significant) to red (highly significant). Colors in the midrange; dark blue, light purple, purple, shows the incidents with the magnitude of > 4, > 5, > 6 respectively. Besides, there is a collapsable feed section on the right edge of the application, which shows a bit more details about the showing results over the map in a more-recent-on-top order. Finally, there is one area chart show a selected place's sismic history that is limited by me only with 10K points and 3 years due to the possible amount of data could be fetched at a moment.

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

or just visit

```
[https://buraktekin.github.io/futurice](https://buraktekin.github.io/futurice)
```

### Enjoy!