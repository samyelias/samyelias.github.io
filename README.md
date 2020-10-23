# Weighted Milestones and Awards Randomizer

To use the randomizer, go to https://samyelias.github.io/ma-randomizer and pull the lever!

I've modified ssimeonoff's original Milestones and Awards Randomizer in several important ways:

* I've added a filter for max pair-wise synergies; this is the first of the dials, from 1 to 9. If it's set to 3, no two goals in the resulting list will have more than 3 synergy. Note that setting it to 1 or 2 is probably too aggressive; I tend to use 3. Below this dial is the original total synergy max, defaulted to 60.
* I added weights to the randomization process (under the hood) to ensure a more equal probability of getting any particular goal. Otherwise, because of the synergy scores, certain goals would be much more likely (like Tactician) and others much less likely (like Landlord). Each of the "max" choices has its own weights associated with it.
* Getting Desert Settler and Estate Dealer together is high synergy for any map except the one they first appeared on (Elysium), so I made it randomly choose a map as well (shown in the readout).
* I added a fifth "exclude" slot, and set the default to exclude Hoverlord and Venuphile, since I tend not to play with Venus
* I tweaked the synergy scores compared to what's on those other sources: https://docs.google.com/spreadsheets/d/1dRpa9eUXjvPWg9-xyvaWrnD24I8ROXntFxRnswNBg40/

## Authors

* **[Samy Elias](https://github.com/samyelias)** - *Changes noted above*
* **[Simeon Simeonov](https://github.com/ssimeonoff)** - *Initial work*

See also the list of [contributors](https://github.com/your/project/contributors) who participated in ssimeonoff's project.

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
