import { sub } from 'date-fns';
//
import { role } from './role';
import { email } from './email';
import { boolean } from './boolean';
import { company } from './company';
import { phoneNumber } from './phoneNumber';
import { fullAddress, country } from './address';
import { firstName, lastName, fullName } from './name';
import { price, rating, age, percent } from './number';

// ----------------------------------------------------------------------

const title = [
  'New FreeWire charging station installed in Alaska',
  'EV Charging Startup FreeWire Raises $50 Million, Will Help Improve Infrastructure',
  'BP Pulse to use FreeWire’s Battery-Powered Ultra-Fast Chargers'
];

const description = [
  'Fast-charging station for electric vehicles installed at AJ’s OldTown Steakhouse',
  'FreeWire secured $50 million in its last funding round, which was spearheaded by energy-focused private equity firm Riverstone Holdings.',
  'FreeWire Technologies and bp pulse (a British charging provider formerly known as bp Chargemaster) announced a memorandum of understanding (MOU) to deploy FreeWire’s Boost Chargers across the UK.'
];

const mockData = {
  id: (index: number) => `e99f09a7-dd88-49d5-b1c8-1daf80c2d7b${index + 1}`,
  email: (index: number) => email[index],
  phoneNumber: (index: number) => phoneNumber[index],
  time: (index: number) => sub(new Date(), { days: index, hours: index }),
  boolean: (index: number) => boolean[index],
  role: (index: number) => role[index],
  company: (index: number) => company[index],
  address: {
    fullAddress: (index: number) => fullAddress[index],
    country: (index: number) => country[index]
  },
  name: {
    firstName: (index: number) => firstName[index],
    lastName: (index: number) => lastName[index],
    fullName: (index: number) => fullName[index]
  },
  text: {
    title: (index: number) => title[index],
    description: (index: number) => description[index]
  },
  number: {
    percent: (index: number) => percent[index],
    rating: (index: number) => rating[index],
    age: (index: number) => age[index],
    price: (index: number) => price[index]
  },
  image: {
    feed: (index: number) => `/static/mock-images/feeds/feed_${index + 1}.jpg`,
    product: (index: number) => `/static/mock-images/products/product_${index + 1}.jpg`
  }
};

export default mockData;
