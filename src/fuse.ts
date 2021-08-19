import Fuse from 'fuse.js'

const fuse = <T>(list: T[], opts: Fuse.IFuseOptions<T>): Fuse<T> =>
    new Fuse(list, opts)

export default fuse
