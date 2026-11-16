import { CategoryId } from '../types';

export interface CategoryMeta {
  id: CategoryId;
  name: string;
  tagline: string;
  count: number;
  iconName: string;
}

export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'all',
    name: 'Semua Kategori',
    tagline: 'Jelajahi seluruh spektrum rasa penasaranmu',
    count: 24,
    iconName: 'Compass'
  },
  {
    id: 'hidden-places',
    name: 'Hidden Places',
    tagline: 'Tempat tersembunyi di balik gang, ruko lama, dan lantai dua',
    count: 8,
    iconName: 'MapPin'
  },
  {
    id: 'workshops',
    name: 'Creative Workshops',
    tagline: 'Asah kreativitas tangan: pottery, tufting, kintsugi, analog photo',
    count: 5,
    iconName: 'Sparkles'
  },
  {
    id: 'communities',
    name: 'Local Communities',
    tagline: 'Teman baru dengan hobi unik: zine makers, book clubs, running chill',
    count: 4,
    iconName: 'Users'
  },
  {
    id: 'weekend-plans',
    name: 'Weekend Plans',
    tagline: 'Rute santai pelarian akhir pekan yang gak bikin dompet menangis',
    count: 6,
    iconName: 'Calendar'
  },
  {
    id: 'food-coffee',
    name: 'Food & Coffee',
    tagline: 'Kedai kopi artisanal, bakery rumahan, dan comfort food berkarakter',
    count: 7,
    iconName: 'Coffee'
  },
  {
    id: 'art-culture',
    name: 'Art & Culture',
    tagline: 'Galeri independen, bioskop alternatif, dan ruang arsip visual',
    count: 5,
    iconName: 'Palette'
  },
  {
    id: 'popup-markets',
    name: 'Pop-up Markets',
    tagline: 'Pasar kaget akhir pekan, flea market vintage, dan pameran lokal',
    count: 4,
    iconName: 'ShoppingBag'
  },
  {
    id: 'budget-friendly',
    name: 'Budget-friendly Activities',
    tagline: 'Pengalaman seru di bawah Rp50.000 atau bahkan 100% gratis',
    count: 6,
    iconName: 'BadgePercent'
  }
];

export const CITIES = [
  'Semua Kota',
  'Jakarta',
  'Bandung',
  'Yogyakarta',
  'Surabaya',
  'Bali',
  'Bekasi',
  'Semarang'
] as const;
