import idb from 'idb'
import uuid from 'uuid/v4'

const DATABASE_NAME = 'address-book-app';
const ADDRESS_STORE_NAME = 'addresses';

//based on https://github.com/mjleehh/mi136-examples/blob/master/address-book/src/storage.js

export default class AddressStore {
    constructor() {
        this.db = idb.open(DATABASE_NAME, 1, db => {
            if (!db.objectStoreNames.contains(ADDRESS_STORE_NAME)) {
                db.createObjectStore(ADDRESS_STORE_NAME, {keyPath: 'id'})
            }
        })
    }

    async list() {
        const db = await this.db;
        const tx = db.transaction(ADDRESS_STORE_NAME, 'readonly');
        const store = tx.objectStore(ADDRESS_STORE_NAME);
        return store.getAll();
    }

    async get(id) {
        const db = await this.db;
        const tx = db.transaction(ADDRESS_STORE_NAME, 'readonly');
        const store = tx.objectStore(ADDRESS_STORE_NAME);
        console.log(id);
        return store.get(id);
    }

    async add(key, item) {
        const db = await this.db;
        const tx = db.transaction(ADDRESS_STORE_NAME, 'readwrite');
        const store = tx.objectStore(ADDRESS_STORE_NAME);
        const storedItem = {...item, id: key};
        store.add(storedItem);
        await tx.complete;
        return storedItem;
    }

    async update(id, item) {
        console.log(item);
        const db = await this.db;
        const tx = db.transaction(ADDRESS_STORE_NAME, 'readwrite');
        const store = tx.objectStore(ADDRESS_STORE_NAME);
        const storedItem = {...item, id};
        store.put(storedItem);
        await tx.complete;
        return storedItem;
    }

    async remove(id) {
        const db = await this.db;
        const tx = db.transaction(ADDRESS_STORE_NAME, 'readwrite');
        const store = tx.objectStore(ADDRESS_STORE_NAME);
        store.delete(id);
        return tx.complete;
    }
}