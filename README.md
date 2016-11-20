# weights
Output weight matrix for workout.

Quick and dirty output for weight lifting workouts which are fiddly and annoying.

Easier to write code than learn google sheets :)

Displays weights for each exercise that vary per set and day, based on [this workout](http://forum.bodybuilding.com/showthread.php?t=169172473). This outputs the plate configuration needed for each exercise/set/day.

Usage: `node weights.js -day <day> -week <week>`
Where `day` is one of `monday, wednesday, friday` (or `1, 2, 3`) and week is 1 through 5.
