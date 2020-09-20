import React from 'react';
import { Link } from 'gatsby';

import Frame from '../components/Frame';
import BalloonPlot from '../components/BalloonPlot';
import CoffeeChart from '../components/CoffeeChart';

import WordCloud from '../components/WordCloud';
import namesData from '../data/namesData';

import GridMap from '../components/GridMap';
import alcoholByState from '../data/alcoholByState';

import ScatterPlot from '../components/ScatterPlot';
import cars from '../data/cars';

import SketchBarChart from '../components/SketchBarChart';

const width = 360;
const height = 270;

const items = [
  {
    key: 'coffee-chart',
    component: (
      <Frame width={width} height={height} background="#FFF4F1">
        <CoffeeChart
          width={width}
          height={height}
          encoding={{
            label: { field: 'day' },
            drinkLevel: { field: 'numCoffee', type: 'quantitative' },
            drinkColor: {
              field: 'productivity',
              type: 'quantitative',
              scale: {
                type: 'ordinal',
                domain: [1, 2, 3, 4],
                range: ['#EAC8C1', '#DFAB6D', '#B26C4D', '#623D2B'],
              },
            },
            useToGoCup: { field: 'goToOffice', type: 'nominal' },
          }}
          data={[
            { day: 'MON', numCoffee: 2, productivity: 4, goToOffice: true },
            { day: 'TUE', numCoffee: 3, productivity: 4, goToOffice: true },
            { day: 'WED', numCoffee: 2, productivity: 4, goToOffice: false },
            { day: 'THU', numCoffee: 4, productivity: 3, goToOffice: true },
            { day: 'FRI', numCoffee: 3, productivity: 2, goToOffice: true },
            { day: 'SAT', numCoffee: 1, productivity: 1, goToOffice: false },
            { day: 'SUN', numCoffee: 1, productivity: 1, goToOffice: false },
          ]}
        />
      </Frame>
    ),
  },
  {
    key: 'balloon-plot',
    component: (
      <Frame width={width} height={height} background="#D3EEEF">
        <BalloonPlot
          width={width}
          height={height}
          encoding={{
            x: { field: 'category', type: 'nominal', scale: { type: 'point' } },
            y: {
              field: 'profit',
              type: 'quantitative',
            },
            size: {
              field: 'marketingCost',
              type: 'quantitative',
              scale: { zero: true, range: [0, 2500] },
            },
            color: { field: 'category', type: 'nominal' },
            text: { field: 'category' },
            text2: { field: 'profit', format: ',d' },
          }}
          data={[
            {
              category: 'Toys',
              marketingCost: 100,
              profit: 4000,
            },
            {
              category: 'Office supplies',
              marketingCost: 200,
              profit: 3000,
            },
            {
              category: 'Grocery',
              marketingCost: 400,
              profit: 2000,
            },
            {
              category: 'Electronics',
              marketingCost: 300,
              profit: 6000,
            },
            {
              category: 'Clothing',
              marketingCost: 400,
              profit: 1500,
            },
          ]}
        />
      </Frame>
    ),
  },

  {
    key: 'word-cloud',
    component: (
      <Frame width={width} height={height} background="#6393C0">
        <WordCloud
          className="word-cloud"
          width={width}
          height={height}
          data={namesData}
          encoding={{
            color: {
              field: 'count',
              scale: {
                range: ['#6393C0', '#fff'],
                zero: true,
              },
              type: 'quantitative',
            },
            emoji: {
              field: 'count',
              scale: {
                type: 'threshold',
                domain: [1000000, 2000000],
                range: ['', '☃️', '️❄️'],
              },
              type: 'quantitative',
            },
            fontFamily: {
              value: 'Raleway, Helvetica, sans-serif',
            },
            fontSize: {
              field: 'count',
              scale: {
                range: [0, 40],
              },
              type: 'quantitative',
            },
            fontWeight: {
              value: 'normal',
            },
            text: { field: 'name' },
          }}
        />
      </Frame>
    ),
  },

  {
    key: 'grid-map',
    component: (
      <Frame width={width} height={height} background="#FFF897">
        <GridMap
          width={width}
          height={height}
          data={alcoholByState}
          encoding={{
            key: { field: 'State' },
            fill: {
              type: 'quantitative',
              field: 'alcoholConsumptionGallons',
              scale: {
                zero: false,
                interpolate: 'hsl',
                range: ['#FAE96F', '#C96E12'],
              },
            },
          }}
        />
      </Frame>
    ),
  },

  {
    key: 'scatter-plot',
    component: (
      <Frame width={width} height={height} background="#FFE6B4">
        <ScatterPlot
          width={width}
          height={height}
          data={cars}
          encoding={{
            x: {
              type: 'quantitative',
              field: 'x',
              scale: { type: 'linear', nice: true },
              axis: { title: 'Miles per gallon →' },
            },
            y: {
              type: 'quantitative',
              field: 'y',
              axis: { title: '↑ Horsepower' },
            },
            stroke: { value: '#FB664B' },
            fill: { value: 'none' },
          }}
        />
      </Frame>
    ),
  },

  {
    key: 'sketch-bar-chart',
    component: (
      <Frame width={360} height={270} background="#C1121E">
        <SketchBarChart
          width={360}
          height={270}
          padding={{ top: 30, left: 162, right: 60, bottom: 30 }}
          encoding={{
            x: {
              field: 'calories',
              type: 'quantitative',
            },
            y: {
              field: 'menu',
              type: 'nominal',
              scale: { type: 'band' },
            },
            color: { value: '#EDEF2B' },
            label: { field: 'menu' },
          }}
          data={[
            {
              menu: 'Egg McMuffin',
              calories: 300,
            },
            {
              menu: 'Hotcakes',
              calories: 350,
            },
            {
              menu: 'Big Mac',
              calories: 530,
            },
            {
              menu: 'Hamburger',
              calories: 240,
            },
            {
              menu: 'Cheeseburger',
              calories: 290,
            },
            {
              menu: 'McChicken',
              calories: 360,
            },
            {
              menu: 'French Fries',
              calories: 230,
            },
          ]}
        />
      </Frame>
    ),
  },
];

export default function Gallery({ count }: { count?: number }) {
  return (
    <>
      {(count ? items.slice(0, count) : items).map(({ key, component }) => (
        <Link key={key} to={`/src-gallery-${key}`}>
          <div style={{ display: 'inline-block', marginBottom: 8, marginRight: 8 }}>
            {component}
          </div>
        </Link>
      ))}
    </>
  );
}
