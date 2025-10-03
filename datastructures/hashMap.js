class HashMap {

    constructor(capacity = 16, loadFactor = 0.75) { 
        this.baseCap = capacity;
        this.capacity = capacity;
        this.loadFactor = loadFactor;
        this.buckets = new Array(this.capacity).fill(null);
        this.size = 0;
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode;
    }

    set(key, value) {
        const hashCode = this.hash(key);
        const node = new Node(key, value);

        if (this.buckets[hashCode] === null) {
            this.buckets[hashCode] = node;
            this.size++;
        } else {
            let cur = this.buckets[hashCode];
            let prev = null;
            while (cur) {
                if (cur.key === key) {
                    cur.value = value;
                    return;
                }
                prev = cur;
                cur = cur.next;
            }
            prev.next = node;
            this.size++;
        }

        if (this.size / this.capacity > this.loadFactor) 
            this._resize(this.capacity * 2); 
        
    }

    get(key) {
        const hashCode = this.hash(key);
        let cur = this.buckets[hashCode];

        while (cur) {
            if (cur.key === key) 
                return cur.value;
        
            cur = cur.next;
        }
        
        return null;
    }

    has(key) {
        return this.get(key) !== null;
    }

    remove(key) {
        const hashCode = this.hash(key);
        
        let cur = this.buckets[hashCode];
        if(!cur) return false;

        if(cur.key === key) {
            this.buckets[hashCode] = cur.next;
            cur.next = null;
            this.size--;
            return true;
        }

        let prev = cur;
        cur = cur.next;

        while (cur) {
            if (cur.key === key) {
                prev.next = cur.next;
                cur.next = null;
                this.size--;
                return true;
            }
            prev = cur;
            cur = cur.next;
        }
        return false;
    }

    length() {
        return this.size;
    }

    clear() {
        this.capacity = this.baseCap;
        this.buckets = new Array(this.capacity).fill(null);
        this.size = 0;
    }

    keys() {
        const retArray = [];

        for (let head of this.buckets) {
            let cur = head;
            while (cur) {
                retArray.push(cur.key);
                cur = cur.next;
            }
        }

        return retArray;
    }

    values() {
        const retArray = [];
        for (let head of this.buckets) {
            let cur = head;
            while (cur) {
                retArray.push(cur.value);
                cur = cur.next;
            }
        }

        return retArray;
    }

    entries() {
        const retArray = [];
        for (let head of this.buckets) {
            let cur = head;
            while (cur) {
                retArray.push([cur.key, cur.value]);
                cur = cur.next;
            }
        }

        return retArray;
    }

    _resize(newCap) {
        const oldBuckets = this.buckets;
        this.capacity = newCap;
        this.buckets = new Array(this.capacity).fill(null);

        for (let head of oldBuckets) {
            let node = head;
            while(node) {
                const next = node.next;
                const hashCode = this.hash(node.key);
                node.next = this.buckets[hashCode];
                this.buckets[hashCode] = node;
                node = next;
            }
        }
    }
}

class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
    }
}