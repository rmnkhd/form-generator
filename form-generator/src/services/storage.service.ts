class StorageService {
    /**
     * Set an item
     *
     * @param {string} name - The name of the item
     * @param {unknown} value - The value to store (can be any type)
     * @returns {void}
     */
    static set(name: string, value: unknown): void {
        const stringifyValue = JSON.stringify(value);
        localStorage.setItem(name, stringifyValue);
    }

    /**
     * Get an item
     *
     * @param {string} name - The name of the item
     * @returns {unknown} - The value stored (or `undefined` if not found)
     */
    static get(name: string): unknown | undefined {
        const value = localStorage.getItem(name);
        return value ? JSON.parse(value) : undefined;
    }

    /**
     * Delete an item
     *
     * @param {string} name - The name of the item
     * @returns {void}
     */
    static delete(name: string): void {
        localStorage.removeItem(name);
    }

    /**
     * Determine if an item exists
     *
     * @param {string} name - The name of the item
     * @returns {boolean} - Returns `true` if the item exists, otherwise `false`
     */
    static has(name: string): boolean {
        return Boolean(this.get(name));
    }
}

export default StorageService;
