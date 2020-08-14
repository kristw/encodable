import {
  schemeCategory10,
  schemeAccent,
  schemeDark2,
  schemePaired,
  schemePastel1,
  schemePastel2,
  schemeSet1,
  schemeSet2,
  schemeSet3,
  schemeTableau10,
  interpolateBrBG,
  schemeBrBG,
  interpolatePRGn,
  schemePRGn,
  interpolatePiYG,
  schemePiYG,
  interpolatePuOr,
  schemePuOr,
  interpolateRdBu,
  schemeRdBu,
  interpolateRdGy,
  schemeRdGy,
  interpolateRdYlBu,
  schemeRdYlBu,
  interpolateRdYlGn,
  schemeRdYlGn,
  interpolateSpectral,
  schemeSpectral,
  interpolateBlues,
  schemeBlues,
  interpolateGreens,
  schemeGreens,
  interpolateGreys,
  schemeGreys,
  interpolateOranges,
  schemeOranges,
  interpolatePurples,
  schemePurples,
  interpolateReds,
  schemeReds,
  interpolateTurbo,
  interpolateViridis,
  interpolateInferno,
  interpolateMagma,
  interpolatePlasma,
  interpolateCividis,
  interpolateWarm,
  interpolateCool,
  interpolateCubehelixDefault,
  interpolateBuGn,
  schemeBuGn,
  interpolateBuPu,
  schemeBuPu,
  interpolateGnBu,
  schemeGnBu,
  interpolateOrRd,
  schemeOrRd,
  interpolatePuBuGn,
  schemePuBuGn,
  interpolatePuBu,
  schemePuBu,
  interpolatePuRd,
  schemePuRd,
  interpolateRdPu,
  schemeRdPu,
  interpolateYlGnBu,
  schemeYlGnBu,
  interpolateYlGn,
  schemeYlGn,
  interpolateYlOrBr,
  schemeYlOrBr,
  interpolateYlOrRd,
  schemeYlOrRd,
  interpolateRainbow,
  interpolateSinebow,
} from 'd3-scale-chromatic';
import type {
  ColorScheme,
  CategoricalScheme,
  SequentialScheme,
  DivergingScheme,
} from '../../types';

const d3CategoricalSchemes: CategoricalScheme[] = [
  {
    type: 'categorical',
    id: 'd3.category10',
    colors: schemeCategory10,
  },
  {
    type: 'categorical',
    id: 'd3.accent',
    colors: schemeAccent,
  },
  {
    type: 'categorical',
    id: 'd3.dark2',
    colors: schemeDark2,
  },
  {
    type: 'categorical',
    id: 'd3.paired',
    colors: schemePaired,
  },
  {
    type: 'categorical',
    id: 'd3.pastel1',
    colors: schemePastel1,
  },
  {
    type: 'categorical',
    id: 'd3.pastel2',
    colors: schemePastel2,
  },
  {
    type: 'categorical',
    id: 'd3.set1',
    colors: schemeSet1,
  },
  {
    type: 'categorical',
    id: 'd3.set2',
    colors: schemeSet2,
  },
  {
    type: 'categorical',
    id: 'd3.set3',
    colors: schemeSet3,
  },
  {
    type: 'categorical',
    id: 'd3.tableau10',
    colors: schemeTableau10,
  },
];

const d3DivergingSchemes: DivergingScheme[] = [
  {
    type: 'diverging',
    id: 'd3.BrBg',
    interpolator: interpolateBrBG,
    colors: schemeBrBG,
  },
  {
    type: 'diverging',
    id: 'd3.PRGn',
    interpolator: interpolatePRGn,
    colors: schemePRGn,
  },
  {
    type: 'diverging',
    id: 'd3.PiYG',
    interpolator: interpolatePiYG,
    colors: schemePiYG,
  },
  {
    type: 'diverging',
    id: 'd3.PuOr',
    interpolator: interpolatePuOr,
    colors: schemePuOr,
  },
  {
    type: 'diverging',
    id: 'd3.RdBu',
    interpolator: interpolateRdBu,
    colors: schemeRdBu,
  },
  {
    type: 'diverging',
    id: 'd3.RdGy',
    interpolator: interpolateRdGy,
    colors: schemeRdGy,
  },
  {
    type: 'diverging',
    id: 'd3.RdYlBu',
    interpolator: interpolateRdYlBu,
    colors: schemeRdYlBu,
  },
  {
    type: 'diverging',
    id: 'd3.RdYlGn',
    interpolator: interpolateRdYlGn,
    colors: schemeRdYlGn,
  },
  {
    type: 'diverging',
    id: 'd3.spectral',
    interpolator: interpolateSpectral,
    colors: schemeSpectral,
  },
];

const d3SingleHueSchemes: SequentialScheme[] = [
  {
    type: 'sequential',
    id: 'd3.blues',
    interpolator: interpolateBlues,
    colors: schemeBlues,
  },
  {
    type: 'sequential',
    id: 'd3.greens',
    interpolator: interpolateGreens,
    colors: schemeGreens,
  },
  {
    type: 'sequential',
    id: 'd3.greys',
    interpolator: interpolateGreys,
    colors: schemeGreys,
  },
  {
    type: 'sequential',
    id: 'd3.oranges',
    interpolator: interpolateOranges,
    colors: schemeOranges,
  },
  {
    type: 'sequential',
    id: 'd3.purples',
    interpolator: interpolatePurples,
    colors: schemePurples,
  },
  {
    type: 'sequential',
    id: 'd3.reds',
    interpolator: interpolateReds,
    colors: schemeReds,
  },
];

const d3MultiHueSchemes: SequentialScheme[] = [
  {
    type: 'sequential',
    id: 'd3.turbo',
    interpolator: interpolateTurbo,
  },
  {
    type: 'sequential',
    id: 'd3.viridis',
    interpolator: interpolateViridis,
  },
  {
    type: 'sequential',
    id: 'd3.inferno',
    interpolator: interpolateInferno,
  },
  {
    type: 'sequential',
    id: 'd3.magma',
    interpolator: interpolateMagma,
  },
  {
    type: 'sequential',
    id: 'd3.plasma',
    interpolator: interpolatePlasma,
  },
  {
    type: 'sequential',
    id: 'd3.cividis',
    interpolator: interpolateCividis,
  },
  {
    type: 'sequential',
    id: 'd3.warm',
    interpolator: interpolateWarm,
  },
  {
    type: 'sequential',
    id: 'd3.cool',
    interpolator: interpolateCool,
  },
  {
    type: 'sequential',
    id: 'd3.cubehelixDefault',
    interpolator: interpolateCubehelixDefault,
  },
  {
    type: 'sequential',
    id: 'd3.cubehelixDefault',
    interpolator: interpolateCubehelixDefault,
  },
  {
    type: 'sequential',
    id: 'd3.BuGn',
    interpolator: interpolateBuGn,
    colors: schemeBuGn,
  },
  {
    type: 'sequential',
    id: 'd3.BuPu',
    interpolator: interpolateBuPu,
    colors: schemeBuPu,
  },
  {
    type: 'sequential',
    id: 'd3.GnBu',
    interpolator: interpolateGnBu,
    colors: schemeGnBu,
  },
  {
    type: 'sequential',
    id: 'd3.OrRd',
    interpolator: interpolateOrRd,
    colors: schemeOrRd,
  },
  {
    type: 'sequential',
    id: 'd3.PuBuGn',
    interpolator: interpolatePuBuGn,
    colors: schemePuBuGn,
  },
  {
    type: 'sequential',
    id: 'd3.PuBu',
    interpolator: interpolatePuBu,
    colors: schemePuBu,
  },
  {
    type: 'sequential',
    id: 'd3.PuRd',
    interpolator: interpolatePuRd,
    colors: schemePuRd,
  },
  {
    type: 'sequential',
    id: 'd3.RdPu',
    interpolator: interpolateRdPu,
    colors: schemeRdPu,
  },
  {
    type: 'sequential',
    id: 'd3.YlGnBu',
    interpolator: interpolateYlGnBu,
    colors: schemeYlGnBu,
  },
  {
    type: 'sequential',
    id: 'd3.YlGn',
    interpolator: interpolateYlGn,
    colors: schemeYlGn,
  },
  {
    type: 'sequential',
    id: 'd3.YlOrBr',
    interpolator: interpolateYlOrBr,
    colors: schemeYlOrBr,
  },
  {
    type: 'sequential',
    id: 'd3.YlOrRd',
    interpolator: interpolateYlOrRd,
    colors: schemeYlOrRd,
  },
];

const d3CyclicalSchemes: SequentialScheme[] = [
  {
    type: 'sequential',
    id: 'd3.rainbow',
    interpolator: interpolateRainbow,
  },
  {
    type: 'sequential',
    id: 'd3.sinebow',
    interpolator: interpolateSinebow,
  },
];

const d3SequentialSchemes = d3SingleHueSchemes.concat(d3MultiHueSchemes).concat(d3CyclicalSchemes);

const d3Schemes = (d3CategoricalSchemes as ColorScheme[])
  .concat(d3DivergingSchemes)
  .concat(d3SequentialSchemes);

export {
  d3Schemes,
  d3CategoricalSchemes,
  d3DivergingSchemes,
  d3SequentialSchemes,
  d3SingleHueSchemes,
  d3MultiHueSchemes,
  d3CyclicalSchemes,
};
