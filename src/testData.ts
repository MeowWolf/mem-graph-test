export default {
  nodes: [
    // One
    {
      id: 'Hero 01 A',
      //memory: 'memory01',
      name: 'Hero 01 A',
      color: '#2BACE2 ',
      visible: true,
      image: 'images/mem_hero_01a.png',
    },
    {
      id: 'Hero 01 B',
      //memory: 'memory01',
      name: 'Hero 01 B',
      color: '#2BACE2 ',
      visible: true,
      image: 'images/mem_hero_01b.png',
    },
    {
      id: 'Hero 01 C',
      //memory: 'memory01',
      name: 'Hero 01 C',
      color: '#2BACE2 ',
      visible: true,
      image: 'images/mem_hero_01c.png',
    },
    // Two
    {
      id: 'Hero 02 A',
      //memory: 'memory01',
      name: 'Hero 02 A',
      color: '#45B763 ',
      visible: true,
      image: 'images/mem_hero_02a.png',
    },
    {
      id: 'Hero 02 B',
      //memory: 'memory01',
      name: 'Hero 02 B',
      color: '#45B763 ',
      visible: true,
      image: 'images/mem_hero_02b.png',
    },
    {
      id: 'Hero 02 C',
      //memory: 'memory01',
      name: 'Hero 02 C',
      color: '#45B763 ',
      visible: true,
      image: 'images/mem_hero_02c.png',
    },
    // Three
    {
      id: 'Hero 03 A',
      //memory: 'memory01',
      name: 'Hero 03 A',
      color: '#7989FF ',
      visible: true,
      image: 'images/mem_hero_03a.png',
    },
    {
      id: 'Hero 03 B',
      //memory: 'memory01',
      name: 'Hero 03 B',
      color: '#7989FF ',
      visible: true,
      image: 'images/mem_hero_03b.png',
    },
    {
      id: 'Hero 03 C',
      //memory: 'memory01',
      name: 'Hero 03 C',
      color: '#7989FF ',
      visible: true,
      image: 'images/mem_hero_03c.png',
    },
    // Four
    {
      id: 'Hero 04 A',
      //memory: 'memory01',
      name: 'Hero 04 A',
      color: '#EA797E ',
      visible: true,
      image: 'images/mem_hero_04a.png',
    },
    {
      id: 'Hero 04 B',
      //memory: 'memory01',
      name: 'Hero 04 B',
      color: '#EA797E ',
      visible: true,
      image: 'images/mem_hero_04b.png',
    },
    {
      id: 'Hero 04 C',
      //memory: 'memory01',
      name: 'Hero 04 C',
      color: '#EA797E ',
      visible: true,
      image: 'images/mem_hero_04c.png',
    },
    // Five
    {
      id: 'Hero 05 A',
      //memory: 'memory01',
      name: 'Hero 05 A',
      color: '#FAC915 ',
      visible: true,
      image: 'images/mem_hero_05a.png',
    },
    {
      id: 'Hero 05 B',
      //memory: 'memory01',
      name: 'Hero 05 B',
      color: '#FAC915',
      visible: true,
      image: 'images/mem_hero_05b.png',
    },
    {
      id: 'Hero 05 C',
      //memory: 'memory01',
      name: 'Hero 05 C',
      color: '#FAC915 ',
      visible: true,
      image: 'images/mem_hero_05c.png',
    },
  ],

  links: [
    {
      source: 'Hero 01 A',
      target: 'Hero 01 B',
      //length
      value: 1,
      color: '#2BACE2 ',
      curve: 0,
      rotation: -Math.PI * (10 / 6),
    },
    {
      source: 'Hero 01 A',
      target: 'Hero 01 C',
      //length
      value: 1,
      color: '#2BACE2 ',
      curve: 0,
      rotation: -Math.PI * (10 / 6),
    },
    {
      source: 'Hero 01 B',
      target: 'Hero 01 C',
      //length
      value: 1,
      color: '#2BACE2 ',
      curve: 0,
      rotation: -Math.PI * (10 / 6),
    },
    {
      source: 'Hero 01 A',
      target: 'Hero 01 B',
      //length
      value: 1,
      color: '#2BACE2 ',
      curve: 0,
      rotation: -Math.PI * (10 / 6),
    },
    {
      source: 'Hero 01 A',
      target: 'Hero 01 C',
      //length
      value: 1,
      color: '#2BACE2 ',
      curve: 0,
      rotation: -Math.PI * (10 / 6),
    },
    {
      source: 'Hero 01 B',
      target: 'Hero 01 C',
      //length
      value: 1,
      color: '#2BACE2 ',
      curve: 0,
      rotation: -Math.PI * (10 / 6),
    },
    {
      source: 'Hero 02 A',
      target: 'Hero 02 B',
      //length
      value: 1,
      color: '#45B763 ',
      curve: 0,
      rotation: -Math.PI * (10 / 6),
    },
    {
      source: 'Hero 02 A',
      target: 'Hero 02 C',
      //length
      value: 1,
      color: '#45B763 ',
      curve: 0,
      rotation: -Math.PI * (10 / 6),
    },
    {
      source: 'Hero 02 B',
      target: 'Hero 02 C',
      //length
      value: 1,
      color: '#45B763 ',
      curve: 0,
      rotation: -Math.PI * (10 / 6),
    },
    {
      source: 'Hero 03 A',
      target: 'Hero 03 B',
      //length
      value: 1,
      color: '#7989FF ',
      curve: 0,
      rotation: -Math.PI * (10 / 6),
    },
    {
      source: 'Hero 03 A',
      target: 'Hero 03 C',
      //length
      value: 1,
      color: '#7989FF ',
      curve: 0,
      rotation: -Math.PI * (10 / 6),
    },
    {
      source: 'Hero 03 B',
      target: 'Hero 03 C',
      //length
      value: 1,
      color: '#7989FF ',
      curve: 0,
      rotation: -Math.PI * (10 / 6),
    },
    {
      source: 'Hero 04 A',
      target: 'Hero 04 B',
      //length
      value: 1,
      color: '#EA797E ',
      curve: 0,
      rotation: -Math.PI * (10 / 6),
    },
    {
      source: 'Hero 04 A',
      target: 'Hero 04 C',
      //length
      value: 1,
      color: '#EA797E ',
      curve: 0,
      rotation: -Math.PI * (10 / 6),
    },
    {
      source: 'Hero 04 B',
      target: 'Hero 04 C',
      //length
      value: 1,
      color: '#EA797E ',
      curve: 0,
      rotation: -Math.PI * (10 / 6),
    },
    {
      source: 'Hero 05 A',
      target: 'Hero 05 B',
      //length
      value: 1,
      color: '#FAC915 ',
      curve: 0,
      rotation: -Math.PI * (10 / 6),
    },
    {
      source: 'Hero 05 A',
      target: 'Hero 05 C',
      //length
      value: 1,
      color: '#FAC915 ',
      curve: 0,
      rotation: -Math.PI * (10 / 6),
    },
    {
      source: 'Hero 05 B',
      target: 'Hero 05 C',
      //length
      value: 1,
      color: '#FAC915 ',
      curve: 0,
      rotation: -Math.PI * (10 / 6),
    },
  ],
}
