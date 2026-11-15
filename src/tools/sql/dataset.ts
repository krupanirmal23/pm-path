/**
 * Synthetic Indian food-delivery dataset, generated deterministically from a fixed seed.
 * Dates span 2025-01-01 to 2025-06-30. ~6,000 rows across 6 tables.
 */

export const SEED = 20250101;

export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const CITIES = ['Bengaluru', 'Mumbai', 'Delhi', 'Hyderabad', 'Pune', 'Chennai'];
const CITY_W = [0.28, 0.2, 0.18, 0.14, 0.11, 0.09];
const PLATFORMS = ['android', 'ios', 'web'];
const PLATFORM_W = [0.68, 0.22, 0.1];
const CHANNELS = ['organic', 'referral', 'paid_social', 'search_ads', 'partner'];
const CHANNEL_W = [0.38, 0.17, 0.22, 0.15, 0.08];
const FIRST = ['Aarav', 'Diya', 'Rohan', 'Priya', 'Arjun', 'Ananya', 'Vikram', 'Sneha', 'Karan', 'Meera', 'Rahul', 'Isha', 'Aditya', 'Kavya', 'Nikhil', 'Pooja', 'Siddharth', 'Neha', 'Varun', 'Riya', 'Manoj', 'Lakshmi', 'Farhan', 'Ayesha', 'Harpreet', 'Gaurav', 'Divya', 'Suresh', 'Anjali', 'Tanvi'];
const LAST = ['Sharma', 'Iyer', 'Reddy', 'Nair', 'Gupta', 'Khan', 'Patel', 'Rao', 'Singh', 'Menon', 'Das', 'Joshi', 'Kulkarni', 'Pillai', 'Banerjee', 'Shetty', 'Mehta', 'Verma'];
const CUISINES = ['North Indian', 'South Indian', 'Biryani', 'Chinese', 'Pizza', 'Desserts', 'Healthy', 'Street Food', 'Burgers', 'Cafe'];
const NAME_PARTS: Record<string, string[]> = {
  'North Indian': ['Punjabi Dhaba', 'Delhi Rasoi', 'Tandoor House', 'Amritsari Kitchen'],
  'South Indian': ['Udupi Upahar', 'Dosa Corner', 'Idli Factory', 'Chettinad Spice'],
  Biryani: ['Biryani Blues', 'Hyderabadi Biryani Point', 'Dum Biryani Co', 'Paradise Biryani Hub'],
  Chinese: ['Wok Express', 'Dragon Bowl', 'Chowmein Junction'],
  Pizza: ['Pizza Planet', 'Slice of Italy', 'Cheesy Crust'],
  Desserts: ['Sweet Truth', 'Kulfi Kingdom', 'Cake Studio'],
  Healthy: ['Green Bowl', 'Salad Days', 'Protein Kitchen'],
  'Street Food': ['Chaat Street', 'Vada Pav Express', 'Pani Puri Point'],
  Burgers: ['Burger Barn', 'Patty Shack'],
  Cafe: ['Filter Coffee Co', 'Chai Point Cafe', 'Brew Room'],
};
const ITEMS: Record<string, [string, string, number][]> = {
  'North Indian': [['Paneer Butter Masala', 'Mains', 240], ['Dal Makhani', 'Mains', 190], ['Butter Naan', 'Breads', 45], ['Jeera Rice', 'Rice', 120], ['Gulab Jamun', 'Desserts', 70], ['Sweet Lassi', 'Beverages', 80]],
  'South Indian': [['Masala Dosa', 'Mains', 90], ['Idli Vada', 'Mains', 70], ['Filter Coffee', 'Beverages', 40], ['Rava Kesari', 'Desserts', 60], ['Curd Rice', 'Rice', 90]],
  Biryani: [['Chicken Biryani', 'Rice', 280], ['Veg Biryani', 'Rice', 210], ['Mutton Biryani', 'Rice', 360], ['Double Ka Meetha', 'Desserts', 90], ['Raita', 'Sides', 40], ['Thums Up', 'Beverages', 40]],
  Chinese: [['Veg Hakka Noodles', 'Mains', 170], ['Chilli Paneer', 'Starters', 210], ['Fried Rice', 'Rice', 160], ['Manchurian', 'Starters', 180], ['Iced Tea', 'Beverages', 70]],
  Pizza: [['Margherita Pizza', 'Mains', 249], ['Farmhouse Pizza', 'Mains', 349], ['Garlic Bread', 'Sides', 129], ['Choco Lava Cake', 'Desserts', 99], ['Coke', 'Beverages', 60]],
  Desserts: [['Chocolate Truffle Cake', 'Desserts', 450], ['Kulfi', 'Desserts', 80], ['Brownie', 'Desserts', 120], ['Cold Coffee', 'Beverages', 140]],
  Healthy: [['Quinoa Salad', 'Mains', 260], ['Grilled Chicken Bowl', 'Mains', 320], ['Fruit Bowl', 'Desserts', 150], ['Green Smoothie', 'Beverages', 160]],
  'Street Food': [['Pani Puri', 'Starters', 60], ['Pav Bhaji', 'Mains', 130], ['Vada Pav', 'Mains', 40], ['Masala Chai', 'Beverages', 30], ['Jalebi', 'Desserts', 70]],
  Burgers: [['Veg Burger', 'Mains', 140], ['Chicken Burger', 'Mains', 190], ['French Fries', 'Sides', 99], ['Chocolate Shake', 'Beverages', 150]],
  Cafe: [['Cappuccino', 'Beverages', 160], ['Sandwich', 'Mains', 170], ['Muffin', 'Desserts', 110], ['Cold Brew', 'Beverages', 190]],
};
const COUPONS = ['WELCOME50', 'FLAT100', 'TRYNEW', 'WEEKEND20', 'IPL25'];

function pick<T>(rnd: () => number, arr: T[], w?: number[]): T {
  if (!w) return arr[Math.floor(rnd() * arr.length)];
  let r = rnd();
  for (let i = 0; i < arr.length; i++) {
    r -= w[i];
    if (r <= 0) return arr[i];
  }
  return arr[arr.length - 1];
}
const pad = (n: number) => String(n).padStart(2, '0');
function dateAdd(base: string, days: number): string {
  const d = new Date(base + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + days);
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
}
const START = '2025-01-01';
const DAYS = 181; // through 2025-06-30

export interface Dataset {
  schemaSql: string;
  inserts: { table: string; columns: string[]; rows: (string | number | null)[][] }[];
}

export function generateDataset(seed = SEED): Dataset {
  const rnd = mulberry32(seed);
  const users: (string | number | null)[][] = [];
  const restaurants: (string | number | null)[][] = [];
  const orders: (string | number | null)[][] = [];
  const items: (string | number | null)[][] = [];
  const sessions: (string | number | null)[][] = [];
  const events: (string | number | null)[][] = [];

  // restaurants
  let rid = 1;
  for (const city of CITIES) {
    const count = city === 'Bengaluru' ? 14 : city === 'Mumbai' ? 11 : 8;
    for (let i = 0; i < count; i++) {
      const cuisine = pick(rnd, CUISINES);
      const base = pick(rnd, NAME_PARTS[cuisine]);
      const rating = Math.round((3.4 + rnd() * 1.5) * 10) / 10;
      const cost = Math.round((150 + rnd() * 750) / 50) * 50;
      const veg = ['South Indian', 'Desserts', 'Cafe'].includes(cuisine) || rnd() < 0.15 ? 1 : 0;
      const onboarded = dateAdd('2023-01-01', Math.floor(rnd() * 700));
      restaurants.push([rid++, `${base}${rnd() < 0.5 ? '' : ' ' + pick(rnd, ['Express', 'Kitchen', 'Co', 'House'])}`, city, cuisine, Math.min(4.9, rating), cost, veg, onboarded]);
    }
  }
  const restByCity: Record<string, (string | number | null)[][]> = {};
  for (const r of restaurants) (restByCity[r[2] as string] ||= []).push(r);

  // users
  const N_USERS = 420;
  for (let u = 1; u <= N_USERS; u++) {
    const city = pick(rnd, CITIES, CITY_W);
    const signup = dateAdd(START, Math.floor(rnd() * 165));
    const channel = pick(rnd, CHANNELS, CHANNEL_W);
    users.push([u, `${pick(rnd, FIRST)} ${pick(rnd, LAST)}`, city, signup, pick(rnd, PLATFORMS, PLATFORM_W), channel, rnd() < 0.12 ? 1 : 0]);
  }

  // orders + items
  let oid = 1;
  let iid = 1;
  for (const u of users) {
    const [userId, , city, signup, , channel, premium] = u as [number, string, string, string, string, string, number];
    const signupIdx = Math.round((new Date(signup + 'T00:00:00Z').getTime() - new Date(START + 'T00:00:00Z').getTime()) / 86400000);
    // propensity: premium and organic/referral order more; paid_social less loyal
    let lambda = 0.035 + (premium ? 0.05 : 0) + (channel === 'organic' ? 0.015 : channel === 'referral' ? 0.02 : channel === 'paid_social' ? -0.015 : 0);
    if (rnd() < 0.22) lambda = 0; // never orders
    const restList = restByCity[city];
    for (let d = signupIdx; d < DAYS; d++) {
      const age = d - signupIdx;
      const decay = channel === 'paid_social' ? Math.exp(-age / 30) : Math.exp(-age / 120);
      const weekday = new Date(dateAdd(START, d) + 'T00:00:00Z').getUTCDay();
      const weekendBoost = weekday === 0 || weekday === 6 ? 1.4 : 1;
      const firstWeekBoost = age < 7 ? 2.2 : 1;
      if (rnd() < lambda * decay * weekendBoost * firstWeekBoost) {
        const r = pick(rnd, restList);
        const hour = pick(rnd, [12, 13, 14, 19, 20, 21, 22, 23, 9, 16], [0.12, 0.14, 0.06, 0.12, 0.18, 0.16, 0.1, 0.04, 0.04, 0.04]);
        const ts = `${dateAdd(START, d)} ${pad(hour)}:${pad(Math.floor(rnd() * 60))}:${pad(Math.floor(rnd() * 60))}`;
        const menu = ITEMS[r[3] as string];
        const nItems = 1 + Math.floor(rnd() * 3);
        let subtotal = 0;
        const its: (string | number | null)[][] = [];
        for (let k = 0; k < nItems; k++) {
          const [name, cat, price] = pick(rnd, menu);
          const qty = rnd() < 0.8 ? 1 : 2;
          subtotal += price * qty;
          its.push([iid++, oid, name, cat, qty, price]);
        }
        const payment = pick(rnd, ['upi', 'card', 'cod', 'wallet'], [0.58, 0.18, 0.16, 0.08]);
        const cancelP = payment === 'cod' ? 0.14 : 0.05;
        const roll = rnd();
        const status = roll < cancelP ? 'cancelled' : roll < cancelP + 0.03 ? 'refunded' : 'delivered';
        const coupon = rnd() < (age < 7 ? 0.5 : 0.15) ? pick(rnd, COUPONS) : null;
        const discount = coupon ? Math.min(Math.round(subtotal * 0.2), coupon === 'FLAT100' ? 100 : 150) : 0;
        const fee = subtotal >= 499 ? 0 : 30;
        const total = subtotal - discount + fee;
        const lateNight = hour >= 22 ? 8 : 0;
        const deliveryMinutes = status === 'cancelled' ? null : Math.round(22 + rnd() * 25 + lateNight + (city === 'Bengaluru' && hour >= 19 && hour <= 21 ? 6 : 0));
        orders.push([oid, userId, r[0] as number, ts, status, payment, subtotal, fee, discount, total, deliveryMinutes, coupon]);
        items.push(...its);
        oid++;
      }
    }
  }

  // sessions + events (sampled subset of users and days for size)
  let sid = 1;
  let eid = 1;
  const usersById = new Map(users.map((u) => [u[0] as number, u]));
  const ordersByUser = new Map<number, string[]>();
  for (const o of orders) {
    const arr = ordersByUser.get(o[1] as number) ?? [];
    arr.push(o[3] as string);
    ordersByUser.set(o[1] as number, arr);
  }
  for (const u of users) {
    if (sid > 950) break;
    const userId = u[0] as number;
    const platform = u[4] as string;
    const nSess = 1 + Math.floor(rnd() * 3);
    const signup = u[3] as string;
    const userOrders = ordersByUser.get(userId) ?? [];
    for (let s = 0; s < nSess && sid <= 950; s++) {
      const day = dateAdd(signup, Math.floor(rnd() * 20));
      if (day > '2025-06-30') continue;
      const hour = pick(rnd, [12, 13, 19, 20, 21, 22]);
      const start = `${day} ${pad(hour)}:${pad(Math.floor(rnd() * 60))}:00`;
      const duration = Math.round(40 + rnd() * 600);
      sessions.push([sid, userId, start, platform, duration]);
      // funnel events with drop-offs
      const steps = ['app_open', 'search', 'view_restaurant', 'add_to_cart', 'checkout_start'];
      const keep = [1, 0.7, 0.75, 0.55, 0.7];
      let t = 0;
      let reached = 0;
      for (let k = 0; k < steps.length; k++) {
        if (k > 0 && rnd() > keep[k]) break;
        if (steps[k] === 'search' && rnd() < 0.3) continue;
        t += 5 + Math.floor(rnd() * 60);
        const mins = Math.floor(t / 60);
        const secs = t % 60;
        events.push([eid++, userId, sid, steps[k], `${day} ${pad(hour)}:${pad(Math.min(59, Number(start.slice(14, 16)) + mins))}:${pad(secs)}`]);
        reached = k;
      }
      if (reached === 4) {
        const ok = platform === 'web' ? rnd() < 0.78 : rnd() < 0.9;
        events.push([eid++, userId, sid, ok ? 'payment_success' : 'payment_failed', `${day} ${pad(hour)}:59:00`]);
      }
      sid++;
    }
    void usersById;
    void userOrders;
  }

  const schemaSql = `
CREATE TABLE users (user_id INTEGER PRIMARY KEY, name TEXT, city TEXT, signup_date TEXT, platform TEXT, acquisition_channel TEXT, is_premium INTEGER);
CREATE TABLE restaurants (restaurant_id INTEGER PRIMARY KEY, name TEXT, city TEXT, cuisine TEXT, rating REAL, avg_cost_for_two INTEGER, is_veg_only INTEGER, onboarded_date TEXT);
CREATE TABLE orders (order_id INTEGER PRIMARY KEY, user_id INTEGER REFERENCES users(user_id), restaurant_id INTEGER REFERENCES restaurants(restaurant_id), order_ts TEXT, status TEXT, payment_method TEXT, subtotal INTEGER, delivery_fee INTEGER, discount INTEGER, total INTEGER, delivery_minutes INTEGER, coupon_code TEXT);
CREATE TABLE order_items (order_item_id INTEGER PRIMARY KEY, order_id INTEGER REFERENCES orders(order_id), item_name TEXT, category TEXT, quantity INTEGER, price INTEGER);
CREATE TABLE sessions (session_id INTEGER PRIMARY KEY, user_id INTEGER REFERENCES users(user_id), session_start TEXT, platform TEXT, duration_seconds INTEGER);
CREATE TABLE events (event_id INTEGER PRIMARY KEY, user_id INTEGER REFERENCES users(user_id), session_id INTEGER REFERENCES sessions(session_id), event_name TEXT, event_ts TEXT);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_items_order ON order_items(order_id);
CREATE INDEX idx_events_user ON events(user_id);
`;
  return {
    schemaSql,
    inserts: [
      { table: 'users', columns: ['user_id', 'name', 'city', 'signup_date', 'platform', 'acquisition_channel', 'is_premium'], rows: users },
      { table: 'restaurants', columns: ['restaurant_id', 'name', 'city', 'cuisine', 'rating', 'avg_cost_for_two', 'is_veg_only', 'onboarded_date'], rows: restaurants },
      { table: 'orders', columns: ['order_id', 'user_id', 'restaurant_id', 'order_ts', 'status', 'payment_method', 'subtotal', 'delivery_fee', 'discount', 'total', 'delivery_minutes', 'coupon_code'], rows: orders },
      { table: 'order_items', columns: ['order_item_id', 'order_id', 'item_name', 'category', 'quantity', 'price'], rows: items },
      { table: 'sessions', columns: ['session_id', 'user_id', 'session_start', 'platform', 'duration_seconds'], rows: sessions },
      { table: 'events', columns: ['event_id', 'user_id', 'session_id', 'event_name', 'event_ts'], rows: events },
    ],
  };
}

export const SCHEMA_DOC = [
  { table: 'users', desc: 'One row per customer', cols: 'user_id, name, city, signup_date, platform (android/ios/web), acquisition_channel (organic/referral/paid_social/search_ads/partner), is_premium (0/1)' },
  { table: 'restaurants', desc: 'One row per restaurant', cols: 'restaurant_id, name, city, cuisine, rating, avg_cost_for_two, is_veg_only (0/1), onboarded_date' },
  { table: 'orders', desc: 'One row per order (Jan–Jun 2025)', cols: 'order_id, user_id, restaurant_id, order_ts, status (delivered/cancelled/refunded), payment_method (upi/card/cod/wallet), subtotal, delivery_fee, discount, total, delivery_minutes (NULL if cancelled), coupon_code' },
  { table: 'order_items', desc: 'One row per item line in an order', cols: 'order_item_id, order_id, item_name, category, quantity, price' },
  { table: 'sessions', desc: 'One row per app session (sample)', cols: 'session_id, user_id, session_start, platform, duration_seconds' },
  { table: 'events', desc: 'Tracked actions within sessions', cols: 'event_id, user_id, session_id, event_name (app_open/search/view_restaurant/add_to_cart/checkout_start/payment_success/payment_failed), event_ts' },
];
