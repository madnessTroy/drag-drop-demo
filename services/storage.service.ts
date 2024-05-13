export const saveLocalItem = (key: string, item: any) => {
	try {
		if (typeof window === 'undefined') return
		localStorage.setItem(key, JSON.stringify(item))
	} catch (_) {}
}

export const getLocalItem = <R extends any>(key: string): R => {
	if (typeof window === 'undefined') return null as any
	try {
		return JSON.parse(localStorage.getItem(key) as string)
	} catch {
		try {
			return localStorage.getItem(key) as any
		} catch {
			return null as any
		}
	}
}

export const destroyLocalItem = (key: string) => {
	if (typeof window === 'undefined') return
	try {
		localStorage.removeItem(key)
	} catch {}
}

export const clearLocal = () => {
	if (typeof window === 'undefined') return
	try {
		localStorage.clear()
	} catch {}
}
