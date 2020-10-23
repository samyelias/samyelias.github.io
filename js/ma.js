/**
* jQuery Slot Machine by Stefan Petre.
* http://www.eyecon.ro/slotmachine/
*
* Modified.
*/

var MAPS = ["ORIGINAL", "HELLAS", "ELYSIUM"];

NAMES = ["TERRAFORMER", "MAYOR", "GARDENER", "BUILDER", "PLANNER",
         "GENERALIST", "SPECIALIST", "ECOLOGIST", "TYCOON", "LEGEND",
         "DIVERSIFIER", "TACTICIAN", "POLAR EXPLORER", "ENERGIZER", "RIM SETTLER",
         "HOVERLORD",
         "LANDLORD", "SCIENTIST", "BANKER", "THERMALIST", "MINER",
         "CELEBRITY", "INDUSTRIALIST", "DESERT SETTLER", "ESTATE DEALER", "BENEFACTOR",
         "CULTIVATOR", "MAGNATE", "SPACE BARON", "EXCENTRIC", "CONTRACTOR",
         "VENUPHILE"]

var WEIGHT_MATRIX = {};
for (let i=1;i<10;i++) {
  WEIGHT_MATRIX[i] = {};
}

var WEIGHT_ELYSIUM_MATRIX = {};
for (let i=1;i<10;i++) {
  WEIGHT_ELYSIUM_MATRIX[i] = {};
}

//                      TER  MAY  GAR  BUI  PLA  GEN  SPE  ECO  TYC  LEG  DIV  TAC  POL  ENE  RIM  HOV  LAN  SCI  BAN  THE  MIN  CEL  IND  DES  EST  BEN  CUL  MAG  SPA  EXC  CON  VEN
WEIGHT_MATRIX[1][20] = [2.24,2.39,56.89,2.24,1.02,1,2.24,2.24,2.38,1.02,1.76,1.04,2.39,2.24,2.24,2.24,2.24,2.24,2.24,2.24,2.24,2.24,2.24,2.24,2.24,2.24,2.24,2.24,2.24,2.24,2.24,2.24]
WEIGHT_MATRIX[1][30] = [2.2,2.29,52.13,2.2,1.04,1,2.2,2.2,2.29,1.02,1.72,1.04,2.33,2.2,2.2,2.2,2.2,2.2,2.2,2.2,2.2,2.2,2.2,2.2,2.2,2.2,2.2,2.2,2.2,2.2,2.2,2.2]
WEIGHT_MATRIX[1][40] = [2.24,2.34,57.48,2.24,1,1,2.24,2.24,2.54,1.02,1.76,1.02,2.34,2.24,2.24,2.24,2.24,2.24,2.24,2.24,2.24,2.24,2.24,2.24,2.24,2.24,2.24,2.24,2.24,2.24,2.24,2.24]
WEIGHT_MATRIX[1][50] = [2.16,2.34,50.79,2.16,1,1,2.16,2.16,2.24,1,1.72,1,2.24,2.16,2.16,2.16,2.16,2.16,2.16,2.16,2.16,2.16,2.16,2.16,2.16,2.16,2.16,2.16,2.16,2.16,2.16,2.16]
WEIGHT_MATRIX[1][60] = [2.24,2.38,59.27,2.24,1.02,1,2.24,2.24,2.34,1.02,1.72,1.02,2.44,2.24,2.24,2.24,2.24,2.24,2.24,2.24,2.24,2.24,2.24,2.24,2.24,2.24,2.24,2.24,2.24,2.24,2.24,2.24]
WEIGHT_MATRIX[2][20] = [1.96,55.24,56.79,2.49,1.02,1.02,1.27,1.76,2.49,1.02,1.6,1,2.49,2.49,1.69,2.2,2.49,2.24,2.29,2.29,2.49,2.49,2.49,2.49,2.49,2.49,2.49,2.29,2.49,2.29,2.49,2.29]
WEIGHT_MATRIX[2][30] = [1.96,45.69,46.85,2.44,1.02,1.02,1.27,1.8,2.44,1.02,1.63,1,2.44,2.44,1.69,2.2,2.44,2.34,2.24,2.24,2.44,2.44,2.44,2.44,2.44,2.44,2.44,2.29,2.44,2.29,2.44,2.29]
WEIGHT_MATRIX[2][40] = [1.88,28.38,29.55,2.24,1,1,1.27,1.76,2.24,1,1.6,1,2.24,2.24,1.66,2.24,2.24,2.16,2.16,2.16,2.24,2.24,2.24,2.24,2.24,2.24,2.24,2.12,2.24,2.16,2.24,2.16]
WEIGHT_MATRIX[2][50] = [1.92,24.81,27.61,2.24,1.02,1,1.27,1.8,2.24,1.02,1.63,1,2.24,2.24,1.69,2.24,2.24,2.16,2.16,2.2,2.24,2.24,2.24,2.24,2.24,2.24,2.24,2.2,2.24,2.2,2.24,2.2]
WEIGHT_MATRIX[2][60] = [1.92,23.69,24.79,2.2,1,1.02,1.24,1.84,2.2,1,1.63,1.02,2.2,2.2,1.69,2.2,2.2,2.12,2.12,2.12,2.2,2.2,2.2,2.2,2.2,2.2,2.2,2.12,2.2,2.12,2.2,2.12]
WEIGHT_MATRIX[3][20] = [2.49,2.04,2.67,2.49,1.57,1.57,1.96,2.49,2.67,1.57,2.12,1.57,4.79,2.49,1.6,2.49,27.95,1.02,1,1.02,2.8,1,2.49,27.37,28.02,1.02,27.14,1.02,1.51,1,2.49,1]
WEIGHT_MATRIX[3][30] = [2.59,2.08,2.72,2.59,1.63,1.63,2.04,2.59,2.74,1.6,2.24,1.63,5.06,2.59,1.63,2.59,31.32,1.02,1.04,1,2.92,1.02,2.59,31.26,32.1,1.02,30.97,1.02,1.51,1,2.59,1.02]
WEIGHT_MATRIX[3][40] = [2.92,2.29,3.1,2.92,1.8,1.8,2.24,2.92,3.14,1.8,2.49,1.76,5.66,2.92,1.8,2.92,48.14,1,1,1.02,3.29,1.04,2.92,48.2,48.83,1.02,47.81,1.02,1.54,1.02,2.92,1]
WEIGHT_MATRIX[3][50] = [2.86,2.29,3.02,2.86,1.76,1.72,2.16,2.86,3.1,1.76,2.39,1.76,5.52,2.86,1.76,2.86,45.94,1,1.02,1,3.2,1.02,2.86,44.91,46.27,1,45.62,1.02,1.54,1.02,2.86,1.02]
WEIGHT_MATRIX[3][60] = [2.74,2.2,2.96,2.74,1.69,1.72,2.08,2.74,2.96,1.72,2.34,1.69,5.32,2.74,1.69,2.74,40.23,1,1,1,3.1,1,2.74,40.53,40.67,1,40.92,1,1.48,1,2.74,1]
WEIGHT_MATRIX[4][20] = [2.24,1.96,2.24,2.24,1.36,1.39,1.42,1.54,2.24,1.36,1.45,1.39,2.57,2.24,1.45,2.24,50.05,1.02,1,1,1.42,1.04,1.39,49.82,49.04,1.04,48.57,1.04,1.1,1.02,1.06,1.02]
WEIGHT_MATRIX[4][30] = [1.54,1.27,1.54,1.54,1.02,1,1,1,1.54,1,1.02,1,1.69,1.54,1,1.54,9.68,1.06,1.06,1.08,1.42,1.06,1.42,9.69,9.8,1.08,9.77,1.06,1.06,1.08,1.06,1.06]
WEIGHT_MATRIX[4][40] = [1.54,1.3,1.54,1.54,1.02,1,1.02,1.02,1.54,1.02,1.02,1.02,1.76,1.54,1.02,1.54,8.23,1.1,1.12,1.12,1.48,1.1,1.45,8.05,8.26,1.12,8.1,1.12,1.12,1.1,1.12,1.12]
WEIGHT_MATRIX[4][50] = [1.54,1.3,1.54,1.54,1.02,1.02,1.02,1.02,1.54,1.02,1.02,1.02,1.76,1.54,1.02,1.54,10.82,1,1.02,1,1.36,1,1.36,10.94,10.86,1.02,11.04,1,1,1,1.02,1.02]
WEIGHT_MATRIX[4][60] = [1.88,1.57,1.88,1.88,1.2,1.22,1.22,1.22,1.88,1.2,1.22,1.22,2.12,1.88,1.22,1.88,24.81,1.02,1.02,1,1.33,1.02,1.3,24.48,25.02,1.02,24.76,1.02,1.02,1,1.02,1]
WEIGHT_MATRIX[5][20] = [1.76,1.6,2.26,1.76,1.06,1.06,1.1,1.22,1.9,1.06,1.12,1.08,2.39,1.76,1.12,1.12,20.21,1,1,1,1.42,1.02,1.36,19.82,18.93,1.04,19.42,1.02,1.12,1.04,1.06,1]
WEIGHT_MATRIX[5][30] = [1.88,1.54,2.08,1.88,1.14,1.14,1.16,1.14,1.88,1.14,1.16,1.14,2.56,1.88,1.14,1.14,34.82,1,1,1,1.3,1.02,1.3,27.27,26.63,1,35.21,1.02,1.02,1.02,1,1]
WEIGHT_MATRIX[5][40] = [2,1.6,2.14,2,1.2,1.2,1.2,1.2,2,1.2,1.2,1.2,2.78,1.96,1.2,1.2,36.95,1.02,1.02,1.02,1.33,1.02,1.33,28.89,28.63,1.02,36.9,1.02,1,1.02,1.04,1.02]
WEIGHT_MATRIX[5][50] = [2.04,1.6,2.2,2,1.2,1.2,1.22,1.2,2,1.2,1.2,1.2,2.73,2,1.2,1.2,44.73,1.02,1,1,1.3,1,1.33,34.61,34.26,1,44.25,1,1.02,1.02,1,1]
WEIGHT_MATRIX[5][60] = [1.8,1.45,1.95,1.76,1.1,1.08,1.1,1.1,1.76,1.1,1.1,1.08,2.42,1.76,1.1,1.1,25.24,1.02,1,1.02,1.33,1.02,1.33,19.52,20,1.02,25.78,1.04,1.04,1.02,1.02,1.02]
WEIGHT_MATRIX[6][20] = [1.88,1.8,2.48,1.88,1.12,1.12,1.22,1.33,2.04,1.08,1.18,1.14,2.53,1.3,1.2,1.18,18.29,1.04,1,1.02,1.42,1.04,1.48,17.48,17.14,1.04,17.44,1.06,1.16,1.04,1.1,1.04]
WEIGHT_MATRIX[6][30] = [2.32,1.96,2.64,2.34,1.45,1.45,1.45,1.45,2.32,1.45,1.45,1.45,3.35,1.45,1.45,1.42,44.72,1.02,1.02,1.02,1.33,1,1.33,35.43,35.37,1.04,45.32,1.02,1.04,1.02,1.02,1.02]
WEIGHT_MATRIX[6][40] = [2.12,1.76,2.31,2.12,1.3,1.3,1.3,1.3,2.12,1.3,1.3,1.3,3.01,1.3,1.33,1.3,26.88,1.02,1.02,1.02,1.3,1.02,1.3,20.45,20.09,1.02,27,1,1.02,1.02,1.02,1]
WEIGHT_MATRIX[6][50] = [2.1,1.72,2.36,2.12,1.27,1.27,1.3,1.3,2.08,1.27,1.3,1.3,2.96,1.3,1.27,1.27,27.93,1.02,1.02,1.02,1.3,1,1.3,21.18,21.74,1.02,28.34,1,1,1.02,1.02,1]
WEIGHT_MATRIX[6][60] = [1.96,1.63,2.16,1.92,1.2,1.2,1.2,1.2,1.92,1.2,1.18,1.22,2.74,1.22,1.2,1.22,20.45,1,1,1,1.3,1,1.3,15.32,15.77,1,20.07,1,1,1,1,1]
WEIGHT_MATRIX[7][20] = [2.05,2.38,4.79,2.12,1,1,1.23,1.45,2.51,1,1.16,1.06,3.93,1.39,1.16,1.14,3.32,1.23,1.14,1.23,1.69,1.21,1.8,2.76,3.23,1.33,2.58,1.3,1.48,1.3,1.39,1.23]
WEIGHT_MATRIX[7][30] = [1.7,1.51,2.67,1.72,1,1.02,1.02,1.06,1.73,1,1.02,1,3.28,1.04,1.04,1,2.04,1.36,1.36,1.36,1.42,1.36,1.39,1.66,2.25,1.39,2.38,1.39,1.39,1.39,1.42,1.36]
WEIGHT_MATRIX[7][40] = [1.71,1.42,2.5,1.68,1.02,1.02,1.02,1.02,1.68,1,1.02,1,3.11,1.02,1.02,1.02,1.79,1.3,1.3,1.33,1.33,1.33,1.33,1.45,1.93,1.3,2.22,1.33,1.3,1.3,1.32,1.33]
WEIGHT_MATRIX[7][50] = [1.66,1.39,2.41,1.68,1,1.02,1,1.02,1.69,1.02,1.02,1.02,3.11,1.02,1.02,1,1.85,1.39,1.39,1.39,1.39,1.39,1.39,1.51,2.06,1.39,2.36,1.39,1.39,1.39,1.39,1.39]
WEIGHT_MATRIX[7][60] = [1.65,1.42,2.43,1.66,1,1,1,1.02,1.65,1,1,1.02,3.08,1.02,1,1,1.79,1.36,1.36,1.36,1.33,1.36,1.36,1.45,1.97,1.33,2.31,1.33,1.36,1.33,1.33,1.33]
WEIGHT_MATRIX[8][20] = [2.27,2.32,4.33,2.31,1.02,1.02,1.3,1.63,2.94,1,1.22,1.1,3.41,1.54,1.27,1.22,3.46,1.29,1.16,1.25,1.88,1.27,2.03,4.02,3,1.48,2.66,1.48,1.63,1.39,1.57,1.3]
WEIGHT_MATRIX[8][30] = [1.74,1.27,2.06,1.74,1.02,1.02,1.06,1.08,1.8,1,1.04,1.04,1.42,1.08,1.04,1.04,1.56,1.18,1.14,1.16,1.23,1.16,1.26,1.68,1.56,1.2,1.44,1.2,1.2,1.18,1.22,1.16]
WEIGHT_MATRIX[8][40] = [1.69,1.06,1.74,1.69,1,1,1.02,1.02,1.71,1,1.02,1,1.1,1.02,1,1.02,1.2,1.1,1.1,1.1,1.1,1.08,1.12,1.25,1.2,1.12,1.14,1.1,1.1,1.1,1.12,1.1]
WEIGHT_MATRIX[8][50] = [1.69,1.04,1.68,1.66,1,1.02,1.02,1.02,1.69,1,1.02,1.02,1.06,1.02,1.02,1.02,1.16,1.12,1.12,1.12,1.12,1.12,1.12,1.18,1.18,1.12,1.12,1.12,1.12,1.12,1.12,1.12]
WEIGHT_MATRIX[8][60] = [1.68,1.04,1.68,1.68,1.02,1,1.02,1.02,1.68,1,1.02,1.02,1.04,1,1.02,1.02,1.18,1.16,1.18,1.16,1.16,1.16,1.16,1.22,1.22,1.16,1.18,1.18,1.14,1.16,1.16,1.16]
WEIGHT_MATRIX[9][20] = [2.2,2.8,5.11,2.28,1.12,1.14,1.54,1.96,3.25,1.08,1.39,1.24,4.36,1.8,1.42,1.39,3.55,1.14,1,1.1,1.76,1.1,1.92,4.3,3.06,1.84,5.44,2.19,1.57,1.24,1.96,1.12]
WEIGHT_MATRIX[9][30] = [1.24,1.47,1.72,1.25,1.02,1.02,1.1,1.18,1.35,1.02,1.08,1.02,1.68,1.16,1.08,1.06,1.56,1.04,1,1.02,1.16,1.02,1.18,1.68,1.54,1.2,1.89,1.26,1.1,1.02,1.22,1.02]
WEIGHT_MATRIX[9][40] = [1.12,1.18,1.29,1.14,1.06,1.04,1.08,1.12,1.14,1.06,1.06,1.08,1.26,1.1,1.06,1.08,1.18,1.02,1,1.02,1.04,1.02,1.06,1.24,1.18,1.08,1.25,1.08,1.04,1.04,1.08,1.02]
WEIGHT_MATRIX[9][50] = [1.04,1.06,1.1,1.04,1.02,1.02,1.02,1.04,1.06,1.04,1.04,1.02,1.1,1.04,1.02,1.04,1.08,1,1.02,1.02,1.02,1,1.02,1.08,1.1,1.04,1.1,1.02,1.02,1.02,1.02,1.02]
WEIGHT_MATRIX[9][60] = [1.06,1.06,1.06,1.04,1.06,1.04,1.06,1.06,1.04,1.04,1.04,1.06,1.06,1.06,1.04,1.04,1.04,1.02,1.02,1.02,1.04,1.02,1.02,1.06,1.04,1,1.06,1.02,1.04,1.02,1.02,1.02]
//                              TER  MAY  GAR  BUI  PLA  GEN  SPE  ECO  TYC  LEG  DIV  TAC  POL  ENE  RIM  HOV  LAN  SCI  BAN  THE  MIN  CEL  IND  DES  EST  BEN  CUL  MAG  SPA  EXC  CON  VEN
WEIGHT_ELYSIUM_MATRIX[1][20] = [2.2,2.34,53.72,2.2,1,1.02,2.2,2.2,2.39,1.02,1.76,1,2.24,2.2,2.2,2.2,2.2,2.2,2.2,2.2,2.2,2.2,2.2,2.2,2.2,2.2,2.2,2.2,2.2,2.2,2.2,2.2]
WEIGHT_ELYSIUM_MATRIX[1][30] = [2.12,2.12,47.62,2.12,1,1,2.12,2.12,2.24,1.02,1.69,1,2.2,2.12,2.12,2.12,2.12,2.12,2.12,2.12,2.12,2.12,2.12,2.12,2.12,2.12,2.12,2.12,2.12,2.12,2.12,2.12]
WEIGHT_ELYSIUM_MATRIX[1][40] = [1.88,1.88,25.46,1.88,1,1,1.88,1.88,1.92,1,1.69,1,1.88,1.88,1.88,1.88,1.88,1.88,1.88,1.88,1.88,1.88,1.88,1.88,1.88,1.88,1.88,1.88,1.88,1.88,1.88,1.88]
WEIGHT_ELYSIUM_MATRIX[1][50] = [2.24,2.33,52.84,2.24,1.04,1.04,2.24,2.24,2.44,1,1.8,1.04,2.43,2.24,2.24,2.24,2.24,2.24,2.24,2.24,2.24,2.24,2.24,2.24,2.24,2.24,2.24,2.24,2.24,2.24,2.24,2.24]
WEIGHT_ELYSIUM_MATRIX[1][60] = [2.16,2.28,49.12,2.16,1,1,2.16,2.16,2.29,1,1.72,1,2.28,2.16,2.16,2.16,2.16,2.16,2.16,2.16,2.16,2.16,2.16,2.16,2.16,2.16,2.16,2.16,2.16,2.16,2.16,2.16]
WEIGHT_ELYSIUM_MATRIX[2][20] = [1.92,14.09,15.31,2.04,1,1,1.24,1.84,2.04,1,1.66,1,2.04,2.04,1.69,2.04,2.04,2,2,2.04,2.04,2.04,2.04,2.04,2.04,2.04,2.04,2,2.04,1.96,2.04,2.04]
WEIGHT_ELYSIUM_MATRIX[2][30] = [1.92,30.09,31.45,2.29,1.02,1,1.27,1.84,2.29,1.02,1.66,1.02,2.29,2.29,1.69,2.29,2.29,2.2,2.16,2.16,2.29,2.29,2.29,2.29,2.29,2.29,2.29,2.16,2.29,2.16,2.29,2.16]
WEIGHT_ELYSIUM_MATRIX[2][40] = [1.92,23.39,24.12,2.2,1,1.02,1.27,1.8,2.2,1,1.63,1.02,2.2,2.2,1.66,2.2,2.2,2.12,2.16,2.16,2.2,2.2,2.2,2.2,2.2,2.2,2.2,2.12,2.2,2.16,2.2,2.12]
WEIGHT_ELYSIUM_MATRIX[2][50] = [1.96,44,46.54,2.39,1,1,1.24,1.76,2.39,1,1.6,1,2.39,2.39,1.66,2.2,2.39,2.24,2.2,2.24,2.39,2.39,2.39,2.39,2.39,2.39,2.39,2.2,2.39,2.2,2.39,2.2]
WEIGHT_ELYSIUM_MATRIX[2][60] = [1.92,26.78,28.92,2.24,1.02,1.02,1.24,1.8,2.24,1,1.66,1,2.24,2.24,1.66,2.24,2.24,2.16,2.16,2.12,2.24,2.24,2.24,2.24,2.24,2.24,2.24,2.16,2.24,2.16,2.24,2.12]
WEIGHT_ELYSIUM_MATRIX[3][20] = [2.98,2.54,4.08,3.22,1.76,1.72,2.2,2.98,3.62,1.76,2.39,1.76,9.02,3.28,1.76,2.98,42.44,1,1,1.02,3.86,1.02,3.16,36.38,36.32,1.02,43.21,1.02,1.57,1.02,3.21,1]
WEIGHT_ELYSIUM_MATRIX[3][30] = [3.1,2.49,4.1,3.56,1.88,1.84,2.39,3.1,3.79,1.84,2.49,1.84,9.64,3.63,1.84,3.1,54.99,1,1.02,1.02,4.27,1.02,3.62,42.76,42.18,1,54.81,1,1.57,1,3.62,1.02]
WEIGHT_ELYSIUM_MATRIX[3][40] = [3.04,2.44,4.08,3.42,1.8,1.8,2.24,3.1,3.69,1.76,2.44,1.8,9.4,3.5,1.76,2.98,52.85,1.02,1,1,4.09,1,3.55,41.64,40.81,1.02,53.93,1.02,1.57,1.02,3.55,1]
WEIGHT_ELYSIUM_MATRIX[3][50] = [2.64,2.12,3.43,2.97,1.6,1.6,2.04,2.64,3.2,1.57,2.16,1.6,8.21,3.04,1.57,2.69,32.74,1.02,1,1,3.69,1.02,3.04,25.34,25.27,1.02,32.78,1,1.57,1,3.04,1.02]
WEIGHT_ELYSIUM_MATRIX[3][60] = [2.8,2.24,3.62,3.1,1.63,1.66,2.08,2.8,3.34,1.66,2.24,1.66,8.39,3.16,1.66,2.8,35.53,1.02,1.02,1.02,3.92,1.02,3.22,27.32,27.96,1.02,36.12,1,1.57,1.02,3.22,1]
WEIGHT_ELYSIUM_MATRIX[4][20] = [2.04,1.76,2.48,2.04,1.16,1.16,1.2,1.33,2.04,1.16,1.2,1.16,2.68,2.04,1.22,2,37.62,1.02,1,1.02,1.42,1.04,1.33,33.49,31.86,1.04,36.35,1.06,1.1,1.02,1.06,1.04]
WEIGHT_ELYSIUM_MATRIX[4][30] = [1.88,1.51,2,1.88,1.14,1.14,1.12,1.14,1.88,1.14,1.12,1.14,2.53,1.88,1.14,1.88,32.11,1.02,1,1,1.3,1,1.3,25.12,24.87,1.02,32.09,1,1,1,1.02,1]
WEIGHT_ELYSIUM_MATRIX[4][40] = [1.8,1.45,1.88,1.8,1.08,1.08,1.1,1.1,1.8,1.1,1.08,1.1,2.37,1.8,1.08,1.8,27.19,1.02,1.02,1.02,1.3,1,1.3,21.42,21.2,1,27.55,1.02,1,1,1.02,1.02]
WEIGHT_ELYSIUM_MATRIX[4][50] = [1.72,1.39,1.8,1.72,1.04,1.04,1.04,1.04,1.72,1.04,1.04,1.04,2.32,1.72,1.04,1.72,24.27,1.02,1,1,1.27,1,1.33,18.77,18.7,1,24.65,1.02,1,1,1,1.02]
WEIGHT_ELYSIUM_MATRIX[4][60] = [1.8,1.42,1.91,1.8,1.1,1.08,1.1,1.08,1.8,1.1,1.06,1.08,2.39,1.8,1.08,1.8,27.95,1.02,1,1.02,1.33,1,1.3,21.32,21.25,1.02,28.53,1,1,1.02,1,1.02]
WEIGHT_ELYSIUM_MATRIX[5][20] = [1.84,1.66,2.32,1.8,1.06,1.08,1.12,1.22,1.92,1.06,1.12,1.08,2.52,1.8,1.14,1.12,22.44,1.02,1,1,1.42,1.04,1.36,20.28,20.16,1.04,22.09,1.02,1.12,1.04,1.06,1.02]
WEIGHT_ELYSIUM_MATRIX[5][30] = [1.76,1.45,1.95,1.76,1.1,1.1,1.08,1.1,1.76,1.1,1.1,1.1,2.44,1.76,1.1,1.08,26.91,1,1,1,1.3,1,1.3,20.67,20.86,1.02,26.64,1,1.02,1,1.02,1.02]
WEIGHT_ELYSIUM_MATRIX[5][40] = [1.76,1.42,1.88,1.72,1.08,1.06,1.06,1.06,1.72,1.06,1.06,1.08,2.36,1.72,1.06,1.06,26.14,1,1,1,1.27,1,1.27,20.63,19.91,1,25.82,1.02,1,1,1,1]
WEIGHT_ELYSIUM_MATRIX[5][50] = [1.63,1.36,1.76,1.63,1.02,1.02,1.02,1.02,1.63,1.02,1.02,1,2.28,1.63,1.02,1.02,18.42,1.02,1.04,1.02,1.33,1.04,1.33,14.41,14.16,1.02,18.39,1.02,1.02,1.02,1.02,1.02]
WEIGHT_ELYSIUM_MATRIX[5][60] = [2.08,1.63,2.2,2.04,1.22,1.22,1.22,1.22,2.08,1.22,1.24,1.24,2.88,2.04,1.24,1.22,46.83,1.02,1.02,1.02,1.3,1.02,1.3,35.96,35.52,1.02,45.83,1,1.04,1.02,1.02,1]
WEIGHT_ELYSIUM_MATRIX[6][20] = [1.9,1.8,2.52,1.96,1.12,1.12,1.22,1.33,2.08,1.1,1.2,1.14,2.63,1.3,1.2,1.18,21.3,1.02,1,1.02,1.42,1.04,1.45,19.67,18.7,1.06,20.26,1.04,1.14,1.06,1.1,1.04]
WEIGHT_ELYSIUM_MATRIX[6][30] = [2.2,1.84,2.47,2.2,1.39,1.39,1.36,1.39,2.22,1.33,1.36,1.36,3.14,1.36,1.39,1.36,36.79,1,1,1,1.33,1,1.3,28.53,28.94,1,37.28,1,1,1,1,1]
WEIGHT_ELYSIUM_MATRIX[6][40] = [2.29,1.88,2.59,2.32,1.45,1.42,1.42,1.45,2.29,1.42,1.42,1.42,3.22,1.42,1.45,1.45,43.65,1,1,1,1.27,1.02,1.3,33.7,34.04,1,44.46,1,1,1,1,1]
WEIGHT_ELYSIUM_MATRIX[6][50] = [1.92,1.6,2.12,1.92,1.18,1.18,1.2,1.22,1.92,1.18,1.2,1.2,2.77,1.18,1.2,1.2,19.4,1.04,1.02,1.04,1.33,1.02,1.33,15.15,14.66,1.04,19.41,1.02,1,1.04,1.04,1.02]
WEIGHT_ELYSIUM_MATRIX[6][60] = [2.12,1.76,2.37,2.16,1.33,1.3,1.33,1.33,2.14,1.33,1.33,1.33,2.96,1.33,1.33,1.3,30.64,1,1,1,1.3,1,1.27,23.94,23.62,1,30.47,1,1,1.02,1.02,1]
WEIGHT_ELYSIUM_MATRIX[7][20] = [2.04,2.37,4.71,2.12,1.02,1.02,1.22,1.45,2.54,1,1.14,1.06,3.9,1.42,1.18,1.16,3.47,1.3,1.2,1.28,1.75,1.27,1.84,2.76,3.3,1.36,2.73,1.36,1.57,1.36,1.48,1.3]
WEIGHT_ELYSIUM_MATRIX[7][30] = [1.74,1.54,2.71,1.73,1,1.04,1.04,1.06,1.7,1.02,1.02,1.02,3.27,1.06,1.04,1.02,1.93,1.29,1.31,1.3,1.36,1.3,1.33,1.57,2.1,1.3,2.29,1.33,1.33,1.3,1.33,1.29]
WEIGHT_ELYSIUM_MATRIX[7][40] = [1.69,1.39,2.45,1.65,1,1,1.02,1.02,1.65,1,1,1,3.06,1,1,1,1.92,1.42,1.39,1.39,1.39,1.39,1.39,1.57,2.09,1.39,2.41,1.36,1.39,1.39,1.39,1.39]
WEIGHT_ELYSIUM_MATRIX[7][50] = [1.68,1.42,2.41,1.68,1.02,1,1,1.02,1.65,1.02,1,1.02,3.05,1.02,1,1.04,1.77,1.36,1.33,1.33,1.33,1.33,1.33,1.42,1.94,1.33,2.27,1.33,1.33,1.36,1.33,1.33]
WEIGHT_ELYSIUM_MATRIX[7][60] = [1.65,1.39,2.35,1.65,1,1,1.02,1,1.63,1,1,1,2.99,1,1,1,1.69,1.25,1.26,1.25,1.26,1.24,1.25,1.36,1.81,1.25,2.16,1.27,1.25,1.25,1.25,1.26]
WEIGHT_ELYSIUM_MATRIX[8][20] = [2.31,2.39,4.51,2.41,1.04,1.06,1.36,1.66,3.01,1,1.24,1.12,3.53,1.57,1.3,1.24,3.45,1.24,1.12,1.22,1.87,1.24,1.95,3.9,2.84,1.45,2.68,1.45,1.63,1.3,1.57,1.24]
WEIGHT_ELYSIUM_MATRIX[8][30] = [1.73,1.25,2.02,1.77,1,1,1.04,1.08,1.77,1,1.04,1.02,1.39,1.08,1.04,1.02,1.57,1.18,1.16,1.18,1.26,1.2,1.26,1.66,1.54,1.22,1.44,1.21,1.24,1.18,1.25,1.16]
WEIGHT_ELYSIUM_MATRIX[8][40] = [1.69,1.06,1.73,1.68,1,1,1,1.02,1.65,1,1,1.02,1.08,1.02,1,1.02,1.23,1.14,1.14,1.14,1.16,1.12,1.16,1.3,1.25,1.16,1.18,1.16,1.16,1.14,1.16,1.14]
WEIGHT_ELYSIUM_MATRIX[8][50] = [1.68,1.04,1.68,1.68,1,1.02,1,1,1.65,1,1.02,1,1.04,1.02,1.02,1,1.16,1.14,1.12,1.12,1.12,1.12,1.12,1.18,1.18,1.12,1.14,1.12,1.16,1.12,1.14,1.12]
WEIGHT_ELYSIUM_MATRIX[8][60] = [1.66,1.02,1.65,1.66,1.02,1.02,1,1.04,1.66,1.02,1,1,1,1.02,1.02,1,1.14,1.12,1.14,1.16,1.12,1.14,1.14,1.16,1.16,1.14,1.14,1.12,1.14,1.14,1.14,1.14]
WEIGHT_ELYSIUM_MATRIX[9][20] = [2.37,3.03,5.63,2.47,1.16,1.16,1.6,2.08,3.49,1.12,1.45,1.27,4.7,1.88,1.51,1.42,3.79,1.16,1,1.1,1.84,1.12,1.96,4.4,3.14,1.88,5.9,2.28,1.6,1.26,2.03,1.14]
WEIGHT_ELYSIUM_MATRIX[9][30] = [1.22,1.41,1.68,1.23,1,1,1.06,1.16,1.32,1,1.06,1.02,1.62,1.12,1.04,1.04,1.56,1.02,1,1.02,1.16,1.02,1.18,1.62,1.5,1.18,1.8,1.22,1.1,1.04,1.2,1.02]
WEIGHT_ELYSIUM_MATRIX[9][40] = [1.1,1.14,1.26,1.12,1.02,1.04,1.08,1.1,1.12,1.02,1.06,1.06,1.22,1.06,1.06,1.04,1.16,1.02,1,1,1.04,1.02,1.04,1.18,1.14,1.06,1.23,1.06,1.04,1,1.06,1]
WEIGHT_ELYSIUM_MATRIX[9][50] = [1.02,1.04,1.08,1,1,1,1,1,1.02,1,1,1,1.06,1.02,1,1.02,1.06,1,1,1,1.02,1.02,1.02,1.06,1.06,1.02,1.06,1.02,1.02,1,1.02,1]
WEIGHT_ELYSIUM_MATRIX[9][60] = [1.02,1.02,1.04,1.02,1.02,1,1.02,1.02,1.02,1.02,1.02,1.02,1.04,1,1.02,1.02,1.04,1.02,1,1.02,1.02,1.02,1.02,1.02,1.02,1.02,1.04,1.02,1,1.02,1.02,1.02]


var clearweight_bymap = []
var sumweight_bymap = []

SYNERGIES = [
   ["",0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,  1,0,0,1,0,0,0,1,1,9,2,0,0,0,0,0],
   [0,"",3,0,0,0,0,0,0,0,0,0,8,0,0,0,  6,0,0,0,0,0,0,3,3,0,3,0,0,0,0,0],
   [0,0,"",0,0,0,0,4,0,0,0,0,8,0,0,0,  6,0,0,0,0,0,0,3,3,2,9,0,0,0,0,0],
   [0,0,0,"",0,0,0,0,4,0,0,0,0,0,0,0,  0,0,0,0,1,0,1,0,0,0,0,3,0,0,9,0],
   [0,0,0,0,"",0,0,0,0,0,0,0,0,0,0,0,  0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,"",0,0,0,0,0,0,0,0,0,0,  0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,"",0,0,0,0,0,0,4,0,0,  0,0,2,1,1,0,1,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,"",2,0,4,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,1,1,0,2,0,0],
   [0,0,0,0,0,0,0,0,"",0,1,1,0,0,1,0,  0,2,0,0,0,0,0,0,0,0,0,9,2,0,2,2],
   [0,0,0,0,0,0,0,0,0,"",0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,"",0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,"",0,0,0,0,  0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,"",0,0,0,  4,0,0,0,0,0,0,8,2,0,3,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,"",0,0,  0,0,0,3,0,0,6,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,"",0,  0,0,0,0,0,2,0,0,0,0,0,1,5,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,"",  0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,2],

   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  "",0,0,0,0,0,0,7,7,0,8,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,"",0,0,0,0,0,0,0,0,0,2,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,"",0,0,0,0,0,0,1,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,"",0,0,0,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,"",0,7,0,0,0,0,0,4,0,4,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,"",0,0,0,0,0,1,3,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,"",0,0,0,0,0,0,0,4,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,"",5,1,7,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,"",1,8,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,"",3,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,"",0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,"",2,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0,"",0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0,0,"",0,2],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0,0,0,"",0],
   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,""]
];

//Desert Settler - Estate Dealer synergy reduced for Elysium map
var SYNERGIES_ELYSIUM = [];
for (var i = 0; i < SYNERGIES.length; i++)
   SYNERGIES_ELYSIUM[i] = SYNERGIES[i].slice();
SYNERGIES_ELYSIUM[23][24] = 3;

var synergy_matrix = []

previousSUM = 0;
limit = 3;
limit2 = 60;
gauge(0,0);
(function($){

    var slotMachine = function(){

            startSlot = function(){

                spinning = false;

                $('#slot-trigger').removeClass('slot-triggerDisabled');

                this.blur();

                return false;

            },
            endSlot = function(){

                $('#slot-block').show();
            },
            spin = function(){

                this.blur();

                if(spinning == false){

                    setTimeout(function(){
                      document.getElementById("note").style.transform = "scaleY(0)"
                    },1000)


                    $('#slot-machine .arm').animate({ top: '45px', height: '2%' });
                    $('#slot-machine .arm .knob').animate({ top: '-20px', height: '20px' });
                    $('#slot-machine .arm-shadow').animate({ top: '40px' }, 380);
                    $('#slot-machine .ring1 .shadow, #slot-machine .ring2 .shadow').animate({ top: '50%', opacity: 1 });

                    conflictSUM = 0;
                    spinsArray = [];
                    combinationsText = "";
                    sumsText = "";
                    //generate the spins
                    generateSpins();

                    //display the conflict SUM
                    setTimeout(function(){
                        gauge(previousSUM, conflictSUM);
                        previousSUM = conflictSUM;
                    }, 2500);

                    //trigger the red lamp
                    setTimeout(function(){
                      if (conflictSUM > 45 ) {document.getElementById("lamp-body").classList.add("red-light");}
                      else if (conflictSUM > 29 && conflictSUM < 45) {document.getElementById("lamp-body").classList.add("orange-light");}
                      else {document.getElementById("lamp-body").classList.remove("red-light", "orange-light");}

                      document.getElementById("total-sum").innerHTML = conflictSUM;
                      document.getElementById("combinations").innerHTML = combinationsText;
                      document.getElementById("sums").innerHTML = sumsText;
                      document.getElementById("note").style.transform = "scaleY(1)";

                    },3500);



                    $('#slot-trigger').addClass('slot-triggerDisabled');

                    $('img.slotSpinAnimation').show();

                    $('#wheel1 img:first').css('top', - (spin[0] * 100 + 16) + 'px');
                    $('#wheel2 img:first').css('top', - (spin[1] * 100 + 16) + 'px');
                    $('#wheel3 img:first').css('top', - (spin[2] * 100 + 16) + 'px');
                    $('#wheel4 img:first').css('top', - (spin[3] * 100 + 16) + 'px');
                    $('#wheel5 img:first').css('top', - (spin[4] * 100 + 16) + 'px');

                    $('#wheel6 img:first').css('top', - (spin[5] * 100 + 16) + 1600 + 'px');
                    $('#wheel7 img:first').css('top', - (spin[6] * 100 + 16) + 1600 + 'px');
                    $('#wheel8 img:first').css('top', - (spin[7] * 100 + 16) + 1600 + 'px');
                    $('#wheel9 img:first').css('top', - (spin[8] * 100 + 16) + 1600 + 'px');
                    $('#wheel10 img:first').css('top', - (spin[9] * 100 + 16) + 1600 + 'px');

                    setTimeout(function(){
                        $('#slot-machine .arm').animate({ top: '-25px', height: '50%', overflow: 'visible' });
                        $('#slot-machine .arm .knob').animate({ top: '-15px', height: '16px' });
                        $('#slot-machine .arm-shadow').animate({ top: '13px' });
                        $('#slot-machine .ring1 .shadow, #slot-machine .ring2 .shadow').animate({ top: '0', opacity: 0 });
                    }, 500);

                    setTimeout(function(){
                        stopSpin(1);
                    }, 1500 + parseInt(1500 * Math.random()));

                    setTimeout(function(){
                        stopSpin(2);
                    }, 1500 + parseInt(1500 * Math.random()));

                    setTimeout(function(){
                        stopSpin(3);
                    }, 1500 + parseInt(1500 * Math.random()));

                    setTimeout(function(){
                        stopSpin(4);
                    }, 1500 + parseInt(1500 * Math.random()));

                    setTimeout(function(){
                        stopSpin(5);
                    }, 1500 + parseInt(1500 * Math.random()));

                    setTimeout(function(){
                        stopSpin2(6);
                    }, 1500 + parseInt(1500 * Math.random()));

                    setTimeout(function(){
                        stopSpin2(7);
                    }, 1500 + parseInt(1500 * Math.random()));

                    setTimeout(function(){
                        stopSpin2(8);
                    }, 1500 + parseInt(1500 * Math.random()));

                    setTimeout(function(){
                        stopSpin2(9);
                    }, 1500 + parseInt(1500 * Math.random()));

                    setTimeout(function(){
                        stopSpin2(10);
                    }, 1500 + parseInt(1500 * Math.random()));

                }

                return false;

            },
            stopSpin = function(slot){
                $('#wheel' + slot)
                    .find('img:last')
                    .hide()
                    .end()
                    .find('img:first')
                    .animate({
                        top: - spin[slot - 1] * 100
                    },{
                        duration: 500,
                        easing: 'elasticOut',
                        complete: function() {

                            spinning --;

                            if(spinning <= 0){
                                endSpin();
                            }

                        }
                    });
            },

            stopSpin2 = function(slot){
                $('#wheel' + slot)
                    .find('img:last')
                    .hide()
                    .end()
                    .find('img:first')
                    .animate({
                        top: - spin[slot - 1] * 100 + 1600
                    },{
                        duration: 500,
                        easing: 'elasticOut',
                        complete: function() {

                            spinning --;

                            if(spinning <= 0){
                                endSpin();
                            }

                        }
                    });
            },
            endSpin = function(){

                setTimeout(function(){

                        $('#slot-trigger').removeClass('slot-triggerDisabled');
                        spinning = false;

                }, 10);
            };
        return {

            init: function(){

                startSlot();

                $('#slot-trigger')
                    .bind('mousedown', function(){
                        $(this).addClass('slot-triggerDown');
                    })
                    .bind('click', spin);

                $(document).bind('mouseup', function(){
                    $('#slot-trigger').removeClass('slot-triggerDown');
                });

                $('#wheel1 img:first').css('top', - (16 * 100) + 'px');
                $('#wheel2 img:first').css('top', - (16 * 100) + 'px');
                $('#wheel3 img:first').css('top', - (16 * 100) + 'px');
                $('#wheel4 img:first').css('top', - (16 * 100) + 'px');
                $('#wheel5 img:first').css('top', - (16 * 100) + 'px');

                $('#wheel6 img:first').css('top', - (16 * 100) + 'px');
                $('#wheel7 img:first').css('top', - (16 * 100) + 'px');
                $('#wheel8 img:first').css('top', - (16 * 100) + 'px');
                $('#wheel9 img:first').css('top', - (16 * 100) + 'px');
                $('#wheel10 img:first').css('top', - (16 * 100) + 'px');
            }

        };
    }();

    $.extend($.easing,{
        bounceOut: function (x, t, b, c, d){
            if((t/=d) < (1/2.75)){
                return c*(7.5625*t*t) + b;
            } else if(t < (2/2.75)){
                return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
            } else if(t < (2.5/2.75)){
                return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
            } else {
                return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
            }
        },
        easeOut: function (x, t, b, c, d){
            return -c *(t/=d)*(t-2) + b;
        },
        elasticOut: function (x, t, b, c, d) {
            var s=1.70158;var p=0;var a=c;
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
        }
    });

    $(document).ready(slotMachine.init);

})(jQuery);

function clear_weights(goal) {
  clearweight_bymap[goal] = 0;
  // reduce likelihood of both Desert Settler and Estate Dealer on
  // Elysium map, given both are often heavily weighted to even out chances
  if (goal == 23) clearweight_bymap[24] = 1;
  if (goal == 24) clearweight_bymap[23] = 1;
  for (var i=0;i<32;i++) {
    if (synergy_matrix[i][goal] > limit) {
      clearweight_bymap[i] = 0;
    }
  }
  for (var i=0;i<32;i++) {
    if (synergy_matrix[goal][i] > limit) {
      clearweight_bymap[i] = 0;
    }
  }

  sumweight_bymap = [];
  rolling_sum = 0;
  for (var kk=0;kk<32;kk++) {
    rolling_sum += clearweight_bymap[kk];
    sumweight_bymap.push(rolling_sum);
  }
}

function weighted_milestone_roll() {
  var roll = Math.random()*sumweight_bymap[15];
  var slot = 15;
  for (var k=0;k<16;k++) {
    if (sumweight_bymap[k] > roll) {
      slot = k;
      break;
    }
  }
  return slot;
}

function weighted_award_roll() {
  var roll = Math.random()*(sumweight_bymap[31]-sumweight_bymap[15]) + sumweight_bymap[15];
  var slot = 31;
  for (var k=16;k<32;k++) {
    if (sumweight_bymap[k] > roll) {
      slot = k;
      break;
    }
  }
  return slot;
}

function gauge (previousSUM, conflictSUM) {
  google.charts.load('current', {'packages':['gauge']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

        var data = google.visualization.arrayToDataTable([
          ['Label', 'Value'],
          ['SYNERGY', previousSUM]
        ]);

        var options = {
          width: 600, height: 180,
          redFrom: 45, redTo: 60, min: 0, max: 60,
          yellowFrom:30, yellowTo: 45,
          minorTicks: 5
        };

        var chart = new google.visualization.Gauge(document.getElementById('chart_div'));

        chart.draw(data, options);

        setInterval(function() {
          data.setValue(0, 1, conflictSUM);
          chart.draw(data, options);
        }, 1000);
      }
}

function generateSpins() {

  var limit2_equiv = limit2;
  if (!(limit2_equiv.toString() in WEIGHT_MATRIX[limit])) limit2_equiv += 5;
  var WEIGHT = WEIGHT_MATRIX[limit][limit2_equiv].slice();
  limit2_equiv = limit2;
  if (!(limit2_equiv.toString() in WEIGHT_ELYSIUM_MATRIX[limit])) limit2_equiv += 5;
  var WEIGHT_ELYSIUM = WEIGHT_ELYSIUM_MATRIX[limit][limit2_equiv].slice();

  exceded = true;
 
  var random_map_roll = parseInt(Math.random() * 3);
  var map_choice = MAPS[random_map_roll];
  coloursArray = shuffle([" Black", " Blue", " Red", " Yellow", " Green"]);
 
  while(exceded) {
    conflictSUM = 0;
    spinsArray = [];
    exclusionsArray = [];
    combinationsText = "Map: " + map_choice + "<br><br>";
    combinationsText += coloursArray + "<br><br>";
    sumsText = "";

    synergy_matrix = SYNERGIES;
    clearweight_bymap = WEIGHT.slice();
    if (map_choice == "ELYSIUM") {
      synergy_matrix = SYNERGIES_ELYSIUM;
      clearweight_bymap = WEIGHT_ELYSIUM.slice();
    }

    sumweight_bymap = [];
    var rolling_sum = 0;
    for (var kk=0;kk<32;kk++) {
      rolling_sum += clearweight_bymap[kk];
      sumweight_bymap.push(rolling_sum);
    }

    //////// Adding exclusions //////////
    exclusions = document.querySelectorAll("select");
    for (i=0; i<exclusions.length; i++) {
      if (exclusions[i].value != "label") {exclusionsArray.push(parseInt(exclusions[i].value))}
    }
    console.log(exclusionsArray)
    //////// Calculating the conflict SUM /////////////

    for (var aw=5;aw<10;aw++) {
      spin[aw] = weighted_award_roll();
      while (spinsArray.indexOf(spin[aw]) > -1 || exclusionsArray.indexOf(spin[aw]) > -1) { 
        spin[aw] = weighted_award_roll();
      }
      spinsArray.push(spin[aw]);
      clear_weights(spin[aw],synergy_matrix);
    }

    for (var mi=0;mi<5;mi++) {
      spin[mi] = weighted_milestone_roll();
      while (spinsArray.indexOf(spin[mi]) > -1 || exclusionsArray.indexOf(spin[mi]) > -1) { 
        spin[mi] = weighted_milestone_roll();
      }
      spinsArray.push(spin[mi]);
      clear_weights(spin[mi],synergy_matrix);
    }

    //loop through the matrix interconnections
    //sorting the array - crucial for pair checking with the matrix
    sortedArray = spinsArray.sort(function(a, b){return a - b});

    oldSUM = 0;
    maxCON = 0;
    for (i=0; i<9; i++) {
      for (j=i+1; j<10; j++) {
        conflictSUM += synergy_matrix[sortedArray[i]][sortedArray[j]];
        maxCON = synergy_matrix[sortedArray[i]][sortedArray[j]];
        if (oldSUM > maxCON) maxCON = oldSUM;
        oldSUM = maxCON;
        if (synergy_matrix[sortedArray[i]][sortedArray[j]] > 0) {
          sumsText += synergy_matrix[sortedArray[i]][sortedArray[j]] + "<br>";
          combinationsText += NAMES[sortedArray[i]] + "&nbsp; + &nbsp;" + NAMES[sortedArray[j]] + "<br>"; }
      }
    }

    if (maxCON <= limit && conflictSUM <= limit2) exceded = false;
  }
}

function changeLimit2 (x) {
  if (x < 0 && limit2 > 20) {
    limit2 -=5;
    document.getElementById("limit-image2").style.marginLeft = 200 + (-10 * limit2) + "px";
  }
  if (x > 0 && limit2 < 60) {
    limit2 +=5;
    document.getElementById("limit-image2").style.marginLeft = 200 + (-10 * limit2) + "px";
  }
}

function changeLimit (x) {
  if (x < 0 && limit > 1) {
    limit -=1;
    document.getElementById("limit-image").style.marginLeft = 50 + (-50 * limit) + "px";
  }
  if (x > 0 && limit < 9) {
    limit +=1;
    document.getElementById("limit-image").style.marginLeft = 50 + (-50 * limit) + "px";
  }
}

function shuffle (a) {
    var n = a.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a;
}
