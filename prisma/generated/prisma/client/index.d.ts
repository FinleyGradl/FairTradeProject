
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Store
 * 
 */
export type Store = $Result.DefaultSelection<Prisma.$StorePayload>
/**
 * Model StoreHours
 * 
 */
export type StoreHours = $Result.DefaultSelection<Prisma.$StoreHoursPayload>
/**
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model Review
 * 
 */
export type Review = $Result.DefaultSelection<Prisma.$ReviewPayload>
/**
 * Model SavedStore
 * 
 */
export type SavedStore = $Result.DefaultSelection<Prisma.$SavedStorePayload>
/**
 * Model SavedProduct
 * 
 */
export type SavedProduct = $Result.DefaultSelection<Prisma.$SavedProductPayload>
/**
 * Model StoreClaim
 * 
 */
export type StoreClaim = $Result.DefaultSelection<Prisma.$StoreClaimPayload>
/**
 * Model StorePhoto
 * 
 */
export type StorePhoto = $Result.DefaultSelection<Prisma.$StorePhotoPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  user: 'user',
  owner: 'owner',
  moderator: 'moderator',
  admin: 'admin'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const StoreStatus: {
  pending: 'pending',
  active: 'active',
  rejected: 'rejected',
  closed: 'closed'
};

export type StoreStatus = (typeof StoreStatus)[keyof typeof StoreStatus]


export const ReviewStatus: {
  published: 'published',
  hidden: 'hidden',
  flagged: 'flagged'
};

export type ReviewStatus = (typeof ReviewStatus)[keyof typeof ReviewStatus]


export const ClaimStatus: {
  pending: 'pending',
  approved: 'approved',
  rejected: 'rejected'
};

export type ClaimStatus = (typeof ClaimStatus)[keyof typeof ClaimStatus]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type StoreStatus = $Enums.StoreStatus

export const StoreStatus: typeof $Enums.StoreStatus

export type ReviewStatus = $Enums.ReviewStatus

export const ReviewStatus: typeof $Enums.ReviewStatus

export type ClaimStatus = $Enums.ClaimStatus

export const ClaimStatus: typeof $Enums.ClaimStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.PrismaClientConstructorArgs<ClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.store`: Exposes CRUD operations for the **Store** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Stores
    * const stores = await prisma.store.findMany()
    * ```
    */
  get store(): Prisma.StoreDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.storeHours`: Exposes CRUD operations for the **StoreHours** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StoreHours
    * const storeHours = await prisma.storeHours.findMany()
    * ```
    */
  get storeHours(): Prisma.StoreHoursDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.review`: Exposes CRUD operations for the **Review** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reviews
    * const reviews = await prisma.review.findMany()
    * ```
    */
  get review(): Prisma.ReviewDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.savedStore`: Exposes CRUD operations for the **SavedStore** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SavedStores
    * const savedStores = await prisma.savedStore.findMany()
    * ```
    */
  get savedStore(): Prisma.SavedStoreDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.savedProduct`: Exposes CRUD operations for the **SavedProduct** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SavedProducts
    * const savedProducts = await prisma.savedProduct.findMany()
    * ```
    */
  get savedProduct(): Prisma.SavedProductDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.storeClaim`: Exposes CRUD operations for the **StoreClaim** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StoreClaims
    * const storeClaims = await prisma.storeClaim.findMany()
    * ```
    */
  get storeClaim(): Prisma.StoreClaimDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.storePhoto`: Exposes CRUD operations for the **StorePhoto** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StorePhotos
    * const storePhotos = await prisma.storePhoto.findMany()
    * ```
    */
  get storePhoto(): Prisma.StorePhotoDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.9.1
   * Query Engine version: e922089b7d7502aff4249d5da3420f6fa55fc6ad
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * Resolved type of the argument passed to the `PrismaClient` constructor.
   *
   * When called without a narrower options type (the common case), this resolves
   * to `PrismaClientOptions` directly, which produces a clear TypeScript error
   * message (`not assignable to parameter of type 'PrismaClientOptions'`) when
   * the argument is missing or incomplete. When the user supplies a narrower
   * options type (e.g. via a literal), it falls back to `Subset` to keep
   * filtering out unknown properties.
   */
  export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> =
    [PrismaClientOptions] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      ((Without<T, U> & U) | (Without<U, T> & T)) & object
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Store: 'Store',
    StoreHours: 'StoreHours',
    Product: 'Product',
    Review: 'Review',
    SavedStore: 'SavedStore',
    SavedProduct: 'SavedProduct',
    StoreClaim: 'StoreClaim',
    StorePhoto: 'StorePhoto'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "store" | "storeHours" | "product" | "review" | "savedStore" | "savedProduct" | "storeClaim" | "storePhoto"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Store: {
        payload: Prisma.$StorePayload<ExtArgs>
        fields: Prisma.StoreFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StoreFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StoreFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload>
          }
          findFirst: {
            args: Prisma.StoreFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StoreFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload>
          }
          findMany: {
            args: Prisma.StoreFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload>[]
          }
          create: {
            args: Prisma.StoreCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload>
          }
          createMany: {
            args: Prisma.StoreCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StoreCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload>[]
          }
          delete: {
            args: Prisma.StoreDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload>
          }
          update: {
            args: Prisma.StoreUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload>
          }
          deleteMany: {
            args: Prisma.StoreDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StoreUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StoreUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload>[]
          }
          upsert: {
            args: Prisma.StoreUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload>
          }
          aggregate: {
            args: Prisma.StoreAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStore>
          }
          groupBy: {
            args: Prisma.StoreGroupByArgs<ExtArgs>
            result: $Utils.Optional<StoreGroupByOutputType>[]
          }
          count: {
            args: Prisma.StoreCountArgs<ExtArgs>
            result: $Utils.Optional<StoreCountAggregateOutputType> | number
          }
        }
      }
      StoreHours: {
        payload: Prisma.$StoreHoursPayload<ExtArgs>
        fields: Prisma.StoreHoursFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StoreHoursFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreHoursPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StoreHoursFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreHoursPayload>
          }
          findFirst: {
            args: Prisma.StoreHoursFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreHoursPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StoreHoursFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreHoursPayload>
          }
          findMany: {
            args: Prisma.StoreHoursFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreHoursPayload>[]
          }
          create: {
            args: Prisma.StoreHoursCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreHoursPayload>
          }
          createMany: {
            args: Prisma.StoreHoursCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StoreHoursCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreHoursPayload>[]
          }
          delete: {
            args: Prisma.StoreHoursDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreHoursPayload>
          }
          update: {
            args: Prisma.StoreHoursUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreHoursPayload>
          }
          deleteMany: {
            args: Prisma.StoreHoursDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StoreHoursUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StoreHoursUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreHoursPayload>[]
          }
          upsert: {
            args: Prisma.StoreHoursUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreHoursPayload>
          }
          aggregate: {
            args: Prisma.StoreHoursAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStoreHours>
          }
          groupBy: {
            args: Prisma.StoreHoursGroupByArgs<ExtArgs>
            result: $Utils.Optional<StoreHoursGroupByOutputType>[]
          }
          count: {
            args: Prisma.StoreHoursCountArgs<ExtArgs>
            result: $Utils.Optional<StoreHoursCountAggregateOutputType> | number
          }
        }
      }
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      Review: {
        payload: Prisma.$ReviewPayload<ExtArgs>
        fields: Prisma.ReviewFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReviewFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReviewFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          findFirst: {
            args: Prisma.ReviewFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReviewFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          findMany: {
            args: Prisma.ReviewFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          create: {
            args: Prisma.ReviewCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          createMany: {
            args: Prisma.ReviewCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReviewCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          delete: {
            args: Prisma.ReviewDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          update: {
            args: Prisma.ReviewUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          deleteMany: {
            args: Prisma.ReviewDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReviewUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReviewUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          upsert: {
            args: Prisma.ReviewUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          aggregate: {
            args: Prisma.ReviewAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReview>
          }
          groupBy: {
            args: Prisma.ReviewGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReviewGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReviewCountArgs<ExtArgs>
            result: $Utils.Optional<ReviewCountAggregateOutputType> | number
          }
        }
      }
      SavedStore: {
        payload: Prisma.$SavedStorePayload<ExtArgs>
        fields: Prisma.SavedStoreFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SavedStoreFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedStorePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SavedStoreFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedStorePayload>
          }
          findFirst: {
            args: Prisma.SavedStoreFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedStorePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SavedStoreFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedStorePayload>
          }
          findMany: {
            args: Prisma.SavedStoreFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedStorePayload>[]
          }
          create: {
            args: Prisma.SavedStoreCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedStorePayload>
          }
          createMany: {
            args: Prisma.SavedStoreCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SavedStoreCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedStorePayload>[]
          }
          delete: {
            args: Prisma.SavedStoreDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedStorePayload>
          }
          update: {
            args: Prisma.SavedStoreUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedStorePayload>
          }
          deleteMany: {
            args: Prisma.SavedStoreDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SavedStoreUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SavedStoreUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedStorePayload>[]
          }
          upsert: {
            args: Prisma.SavedStoreUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedStorePayload>
          }
          aggregate: {
            args: Prisma.SavedStoreAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSavedStore>
          }
          groupBy: {
            args: Prisma.SavedStoreGroupByArgs<ExtArgs>
            result: $Utils.Optional<SavedStoreGroupByOutputType>[]
          }
          count: {
            args: Prisma.SavedStoreCountArgs<ExtArgs>
            result: $Utils.Optional<SavedStoreCountAggregateOutputType> | number
          }
        }
      }
      SavedProduct: {
        payload: Prisma.$SavedProductPayload<ExtArgs>
        fields: Prisma.SavedProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SavedProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SavedProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedProductPayload>
          }
          findFirst: {
            args: Prisma.SavedProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SavedProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedProductPayload>
          }
          findMany: {
            args: Prisma.SavedProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedProductPayload>[]
          }
          create: {
            args: Prisma.SavedProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedProductPayload>
          }
          createMany: {
            args: Prisma.SavedProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SavedProductCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedProductPayload>[]
          }
          delete: {
            args: Prisma.SavedProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedProductPayload>
          }
          update: {
            args: Prisma.SavedProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedProductPayload>
          }
          deleteMany: {
            args: Prisma.SavedProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SavedProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SavedProductUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedProductPayload>[]
          }
          upsert: {
            args: Prisma.SavedProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SavedProductPayload>
          }
          aggregate: {
            args: Prisma.SavedProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSavedProduct>
          }
          groupBy: {
            args: Prisma.SavedProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<SavedProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.SavedProductCountArgs<ExtArgs>
            result: $Utils.Optional<SavedProductCountAggregateOutputType> | number
          }
        }
      }
      StoreClaim: {
        payload: Prisma.$StoreClaimPayload<ExtArgs>
        fields: Prisma.StoreClaimFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StoreClaimFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreClaimPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StoreClaimFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreClaimPayload>
          }
          findFirst: {
            args: Prisma.StoreClaimFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreClaimPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StoreClaimFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreClaimPayload>
          }
          findMany: {
            args: Prisma.StoreClaimFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreClaimPayload>[]
          }
          create: {
            args: Prisma.StoreClaimCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreClaimPayload>
          }
          createMany: {
            args: Prisma.StoreClaimCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StoreClaimCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreClaimPayload>[]
          }
          delete: {
            args: Prisma.StoreClaimDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreClaimPayload>
          }
          update: {
            args: Prisma.StoreClaimUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreClaimPayload>
          }
          deleteMany: {
            args: Prisma.StoreClaimDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StoreClaimUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StoreClaimUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreClaimPayload>[]
          }
          upsert: {
            args: Prisma.StoreClaimUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StoreClaimPayload>
          }
          aggregate: {
            args: Prisma.StoreClaimAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStoreClaim>
          }
          groupBy: {
            args: Prisma.StoreClaimGroupByArgs<ExtArgs>
            result: $Utils.Optional<StoreClaimGroupByOutputType>[]
          }
          count: {
            args: Prisma.StoreClaimCountArgs<ExtArgs>
            result: $Utils.Optional<StoreClaimCountAggregateOutputType> | number
          }
        }
      }
      StorePhoto: {
        payload: Prisma.$StorePhotoPayload<ExtArgs>
        fields: Prisma.StorePhotoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StorePhotoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePhotoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StorePhotoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePhotoPayload>
          }
          findFirst: {
            args: Prisma.StorePhotoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePhotoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StorePhotoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePhotoPayload>
          }
          findMany: {
            args: Prisma.StorePhotoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePhotoPayload>[]
          }
          create: {
            args: Prisma.StorePhotoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePhotoPayload>
          }
          createMany: {
            args: Prisma.StorePhotoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StorePhotoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePhotoPayload>[]
          }
          delete: {
            args: Prisma.StorePhotoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePhotoPayload>
          }
          update: {
            args: Prisma.StorePhotoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePhotoPayload>
          }
          deleteMany: {
            args: Prisma.StorePhotoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StorePhotoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StorePhotoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePhotoPayload>[]
          }
          upsert: {
            args: Prisma.StorePhotoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePhotoPayload>
          }
          aggregate: {
            args: Prisma.StorePhotoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStorePhoto>
          }
          groupBy: {
            args: Prisma.StorePhotoGroupByArgs<ExtArgs>
            result: $Utils.Optional<StorePhotoGroupByOutputType>[]
          }
          count: {
            args: Prisma.StorePhotoCountArgs<ExtArgs>
            result: $Utils.Optional<StorePhotoCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * A driver adapter that PrismaClient uses to connect to your database, such as the ones provided by `@prisma/adapter-pg`, `@prisma/adapter-libsql`, `@prisma/adapter-planetscale`, etc.
     * 
     * A driver adapter is **required** unless you connect to your database through Prisma Accelerate (in which case use `accelerateUrl` instead).
     * 
     * Learn more: https://pris.ly/d/driver-adapters
     * 
     * @example
     * ```ts
     * import { PrismaPg } from '@prisma/adapter-pg'
     * import { PrismaClient } from './generated/prisma/client'
     * 
     * const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
     * const prisma = new PrismaClient({ adapter })
     * ```
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * The Prisma Accelerate connection URL. Use this option to connect to your database through Prisma Accelerate instead of using a driver adapter to connect directly.
     * 
     * Learn more: https://pris.ly/d/accelerate
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    store?: StoreOmit
    storeHours?: StoreHoursOmit
    product?: ProductOmit
    review?: ReviewOmit
    savedStore?: SavedStoreOmit
    savedProduct?: SavedProductOmit
    storeClaim?: StoreClaimOmit
    storePhoto?: StorePhotoOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    storesCreated: number
    storesOwned: number
    reviews: number
    savedStores: number
    savedProducts: number
    claims: number
    claimsReviewed: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    storesCreated?: boolean | UserCountOutputTypeCountStoresCreatedArgs
    storesOwned?: boolean | UserCountOutputTypeCountStoresOwnedArgs
    reviews?: boolean | UserCountOutputTypeCountReviewsArgs
    savedStores?: boolean | UserCountOutputTypeCountSavedStoresArgs
    savedProducts?: boolean | UserCountOutputTypeCountSavedProductsArgs
    claims?: boolean | UserCountOutputTypeCountClaimsArgs
    claimsReviewed?: boolean | UserCountOutputTypeCountClaimsReviewedArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountStoresCreatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StoreWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountStoresOwnedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StoreWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSavedStoresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SavedStoreWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSavedProductsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SavedProductWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountClaimsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StoreClaimWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountClaimsReviewedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StoreClaimWhereInput
  }


  /**
   * Count Type StoreCountOutputType
   */

  export type StoreCountOutputType = {
    hours: number
    products: number
    reviews: number
    savedBy: number
    claims: number
    photos: number
  }

  export type StoreCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    hours?: boolean | StoreCountOutputTypeCountHoursArgs
    products?: boolean | StoreCountOutputTypeCountProductsArgs
    reviews?: boolean | StoreCountOutputTypeCountReviewsArgs
    savedBy?: boolean | StoreCountOutputTypeCountSavedByArgs
    claims?: boolean | StoreCountOutputTypeCountClaimsArgs
    photos?: boolean | StoreCountOutputTypeCountPhotosArgs
  }

  // Custom InputTypes
  /**
   * StoreCountOutputType without action
   */
  export type StoreCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreCountOutputType
     */
    select?: StoreCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StoreCountOutputType without action
   */
  export type StoreCountOutputTypeCountHoursArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StoreHoursWhereInput
  }

  /**
   * StoreCountOutputType without action
   */
  export type StoreCountOutputTypeCountProductsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
  }

  /**
   * StoreCountOutputType without action
   */
  export type StoreCountOutputTypeCountReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
  }

  /**
   * StoreCountOutputType without action
   */
  export type StoreCountOutputTypeCountSavedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SavedStoreWhereInput
  }

  /**
   * StoreCountOutputType without action
   */
  export type StoreCountOutputTypeCountClaimsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StoreClaimWhereInput
  }

  /**
   * StoreCountOutputType without action
   */
  export type StoreCountOutputTypeCountPhotosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StorePhotoWhereInput
  }


  /**
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    savedBy: number
  }

  export type ProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    savedBy?: boolean | ProductCountOutputTypeCountSavedByArgs
  }

  // Custom InputTypes
  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountSavedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SavedProductWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    avatarUrl: string | null
    role: $Enums.UserRole | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    avatarUrl: string | null
    role: $Enums.UserRole | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    avatarUrl: number
    role: number
    createdAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    avatarUrl?: true
    role?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    avatarUrl?: true
    role?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    avatarUrl?: true
    role?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string | null
    avatarUrl: string | null
    role: $Enums.UserRole
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    avatarUrl?: boolean
    role?: boolean
    createdAt?: boolean
    storesCreated?: boolean | User$storesCreatedArgs<ExtArgs>
    storesOwned?: boolean | User$storesOwnedArgs<ExtArgs>
    reviews?: boolean | User$reviewsArgs<ExtArgs>
    savedStores?: boolean | User$savedStoresArgs<ExtArgs>
    savedProducts?: boolean | User$savedProductsArgs<ExtArgs>
    claims?: boolean | User$claimsArgs<ExtArgs>
    claimsReviewed?: boolean | User$claimsReviewedArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    avatarUrl?: boolean
    role?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    avatarUrl?: boolean
    role?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    avatarUrl?: boolean
    role?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "avatarUrl" | "role" | "createdAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    storesCreated?: boolean | User$storesCreatedArgs<ExtArgs>
    storesOwned?: boolean | User$storesOwnedArgs<ExtArgs>
    reviews?: boolean | User$reviewsArgs<ExtArgs>
    savedStores?: boolean | User$savedStoresArgs<ExtArgs>
    savedProducts?: boolean | User$savedProductsArgs<ExtArgs>
    claims?: boolean | User$claimsArgs<ExtArgs>
    claimsReviewed?: boolean | User$claimsReviewedArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      storesCreated: Prisma.$StorePayload<ExtArgs>[]
      storesOwned: Prisma.$StorePayload<ExtArgs>[]
      reviews: Prisma.$ReviewPayload<ExtArgs>[]
      savedStores: Prisma.$SavedStorePayload<ExtArgs>[]
      savedProducts: Prisma.$SavedProductPayload<ExtArgs>[]
      claims: Prisma.$StoreClaimPayload<ExtArgs>[]
      claimsReviewed: Prisma.$StoreClaimPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string | null
      avatarUrl: string | null
      role: $Enums.UserRole
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    storesCreated<T extends User$storesCreatedArgs<ExtArgs> = {}>(args?: Subset<T, User$storesCreatedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    storesOwned<T extends User$storesOwnedArgs<ExtArgs> = {}>(args?: Subset<T, User$storesOwnedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reviews<T extends User$reviewsArgs<ExtArgs> = {}>(args?: Subset<T, User$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    savedStores<T extends User$savedStoresArgs<ExtArgs> = {}>(args?: Subset<T, User$savedStoresArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SavedStorePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    savedProducts<T extends User$savedProductsArgs<ExtArgs> = {}>(args?: Subset<T, User$savedProductsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SavedProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    claims<T extends User$claimsArgs<ExtArgs> = {}>(args?: Subset<T, User$claimsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StoreClaimPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    claimsReviewed<T extends User$claimsReviewedArgs<ExtArgs> = {}>(args?: Subset<T, User$claimsReviewedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StoreClaimPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly avatarUrl: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.storesCreated
   */
  export type User$storesCreatedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
    where?: StoreWhereInput
    orderBy?: StoreOrderByWithRelationInput | StoreOrderByWithRelationInput[]
    cursor?: StoreWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StoreScalarFieldEnum | StoreScalarFieldEnum[]
  }

  /**
   * User.storesOwned
   */
  export type User$storesOwnedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
    where?: StoreWhereInput
    orderBy?: StoreOrderByWithRelationInput | StoreOrderByWithRelationInput[]
    cursor?: StoreWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StoreScalarFieldEnum | StoreScalarFieldEnum[]
  }

  /**
   * User.reviews
   */
  export type User$reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    cursor?: ReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * User.savedStores
   */
  export type User$savedStoresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedStore
     */
    select?: SavedStoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedStore
     */
    omit?: SavedStoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedStoreInclude<ExtArgs> | null
    where?: SavedStoreWhereInput
    orderBy?: SavedStoreOrderByWithRelationInput | SavedStoreOrderByWithRelationInput[]
    cursor?: SavedStoreWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SavedStoreScalarFieldEnum | SavedStoreScalarFieldEnum[]
  }

  /**
   * User.savedProducts
   */
  export type User$savedProductsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedProduct
     */
    select?: SavedProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedProduct
     */
    omit?: SavedProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedProductInclude<ExtArgs> | null
    where?: SavedProductWhereInput
    orderBy?: SavedProductOrderByWithRelationInput | SavedProductOrderByWithRelationInput[]
    cursor?: SavedProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SavedProductScalarFieldEnum | SavedProductScalarFieldEnum[]
  }

  /**
   * User.claims
   */
  export type User$claimsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreClaim
     */
    select?: StoreClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoreClaim
     */
    omit?: StoreClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreClaimInclude<ExtArgs> | null
    where?: StoreClaimWhereInput
    orderBy?: StoreClaimOrderByWithRelationInput | StoreClaimOrderByWithRelationInput[]
    cursor?: StoreClaimWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StoreClaimScalarFieldEnum | StoreClaimScalarFieldEnum[]
  }

  /**
   * User.claimsReviewed
   */
  export type User$claimsReviewedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreClaim
     */
    select?: StoreClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoreClaim
     */
    omit?: StoreClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreClaimInclude<ExtArgs> | null
    where?: StoreClaimWhereInput
    orderBy?: StoreClaimOrderByWithRelationInput | StoreClaimOrderByWithRelationInput[]
    cursor?: StoreClaimWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StoreClaimScalarFieldEnum | StoreClaimScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Store
   */

  export type AggregateStore = {
    _count: StoreCountAggregateOutputType | null
    _avg: StoreAvgAggregateOutputType | null
    _sum: StoreSumAggregateOutputType | null
    _min: StoreMinAggregateOutputType | null
    _max: StoreMaxAggregateOutputType | null
  }

  export type StoreAvgAggregateOutputType = {
    latitude: number | null
    longitude: number | null
  }

  export type StoreSumAggregateOutputType = {
    latitude: number | null
    longitude: number | null
  }

  export type StoreMinAggregateOutputType = {
    id: string | null
    slug: string | null
    name: string | null
    description: string | null
    addressLine: string | null
    city: string | null
    postalCode: string | null
    country: string | null
    latitude: number | null
    longitude: number | null
    phone: string | null
    website: string | null
    email: string | null
    ownerUserId: string | null
    status: $Enums.StoreStatus | null
    fairBadges: string | null
    categories: string | null
    coverImage: string | null
    createdById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StoreMaxAggregateOutputType = {
    id: string | null
    slug: string | null
    name: string | null
    description: string | null
    addressLine: string | null
    city: string | null
    postalCode: string | null
    country: string | null
    latitude: number | null
    longitude: number | null
    phone: string | null
    website: string | null
    email: string | null
    ownerUserId: string | null
    status: $Enums.StoreStatus | null
    fairBadges: string | null
    categories: string | null
    coverImage: string | null
    createdById: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StoreCountAggregateOutputType = {
    id: number
    slug: number
    name: number
    description: number
    addressLine: number
    city: number
    postalCode: number
    country: number
    latitude: number
    longitude: number
    phone: number
    website: number
    email: number
    ownerUserId: number
    status: number
    fairBadges: number
    categories: number
    coverImage: number
    createdById: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StoreAvgAggregateInputType = {
    latitude?: true
    longitude?: true
  }

  export type StoreSumAggregateInputType = {
    latitude?: true
    longitude?: true
  }

  export type StoreMinAggregateInputType = {
    id?: true
    slug?: true
    name?: true
    description?: true
    addressLine?: true
    city?: true
    postalCode?: true
    country?: true
    latitude?: true
    longitude?: true
    phone?: true
    website?: true
    email?: true
    ownerUserId?: true
    status?: true
    fairBadges?: true
    categories?: true
    coverImage?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StoreMaxAggregateInputType = {
    id?: true
    slug?: true
    name?: true
    description?: true
    addressLine?: true
    city?: true
    postalCode?: true
    country?: true
    latitude?: true
    longitude?: true
    phone?: true
    website?: true
    email?: true
    ownerUserId?: true
    status?: true
    fairBadges?: true
    categories?: true
    coverImage?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StoreCountAggregateInputType = {
    id?: true
    slug?: true
    name?: true
    description?: true
    addressLine?: true
    city?: true
    postalCode?: true
    country?: true
    latitude?: true
    longitude?: true
    phone?: true
    website?: true
    email?: true
    ownerUserId?: true
    status?: true
    fairBadges?: true
    categories?: true
    coverImage?: true
    createdById?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StoreAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Store to aggregate.
     */
    where?: StoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stores to fetch.
     */
    orderBy?: StoreOrderByWithRelationInput | StoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Stores
    **/
    _count?: true | StoreCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StoreAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StoreSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StoreMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StoreMaxAggregateInputType
  }

  export type GetStoreAggregateType<T extends StoreAggregateArgs> = {
        [P in keyof T & keyof AggregateStore]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStore[P]>
      : GetScalarType<T[P], AggregateStore[P]>
  }




  export type StoreGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StoreWhereInput
    orderBy?: StoreOrderByWithAggregationInput | StoreOrderByWithAggregationInput[]
    by: StoreScalarFieldEnum[] | StoreScalarFieldEnum
    having?: StoreScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StoreCountAggregateInputType | true
    _avg?: StoreAvgAggregateInputType
    _sum?: StoreSumAggregateInputType
    _min?: StoreMinAggregateInputType
    _max?: StoreMaxAggregateInputType
  }

  export type StoreGroupByOutputType = {
    id: string
    slug: string
    name: string
    description: string
    addressLine: string
    city: string
    postalCode: string
    country: string
    latitude: number
    longitude: number
    phone: string | null
    website: string | null
    email: string | null
    ownerUserId: string | null
    status: $Enums.StoreStatus
    fairBadges: string
    categories: string
    coverImage: string | null
    createdById: string
    createdAt: Date
    updatedAt: Date
    _count: StoreCountAggregateOutputType | null
    _avg: StoreAvgAggregateOutputType | null
    _sum: StoreSumAggregateOutputType | null
    _min: StoreMinAggregateOutputType | null
    _max: StoreMaxAggregateOutputType | null
  }

  type GetStoreGroupByPayload<T extends StoreGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StoreGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StoreGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StoreGroupByOutputType[P]>
            : GetScalarType<T[P], StoreGroupByOutputType[P]>
        }
      >
    >


  export type StoreSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    name?: boolean
    description?: boolean
    addressLine?: boolean
    city?: boolean
    postalCode?: boolean
    country?: boolean
    latitude?: boolean
    longitude?: boolean
    phone?: boolean
    website?: boolean
    email?: boolean
    ownerUserId?: boolean
    status?: boolean
    fairBadges?: boolean
    categories?: boolean
    coverImage?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | Store$ownerArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    hours?: boolean | Store$hoursArgs<ExtArgs>
    products?: boolean | Store$productsArgs<ExtArgs>
    reviews?: boolean | Store$reviewsArgs<ExtArgs>
    savedBy?: boolean | Store$savedByArgs<ExtArgs>
    claims?: boolean | Store$claimsArgs<ExtArgs>
    photos?: boolean | Store$photosArgs<ExtArgs>
    _count?: boolean | StoreCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["store"]>

  export type StoreSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    name?: boolean
    description?: boolean
    addressLine?: boolean
    city?: boolean
    postalCode?: boolean
    country?: boolean
    latitude?: boolean
    longitude?: boolean
    phone?: boolean
    website?: boolean
    email?: boolean
    ownerUserId?: boolean
    status?: boolean
    fairBadges?: boolean
    categories?: boolean
    coverImage?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | Store$ownerArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["store"]>

  export type StoreSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    name?: boolean
    description?: boolean
    addressLine?: boolean
    city?: boolean
    postalCode?: boolean
    country?: boolean
    latitude?: boolean
    longitude?: boolean
    phone?: boolean
    website?: boolean
    email?: boolean
    ownerUserId?: boolean
    status?: boolean
    fairBadges?: boolean
    categories?: boolean
    coverImage?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | Store$ownerArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["store"]>

  export type StoreSelectScalar = {
    id?: boolean
    slug?: boolean
    name?: boolean
    description?: boolean
    addressLine?: boolean
    city?: boolean
    postalCode?: boolean
    country?: boolean
    latitude?: boolean
    longitude?: boolean
    phone?: boolean
    website?: boolean
    email?: boolean
    ownerUserId?: boolean
    status?: boolean
    fairBadges?: boolean
    categories?: boolean
    coverImage?: boolean
    createdById?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StoreOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "slug" | "name" | "description" | "addressLine" | "city" | "postalCode" | "country" | "latitude" | "longitude" | "phone" | "website" | "email" | "ownerUserId" | "status" | "fairBadges" | "categories" | "coverImage" | "createdById" | "createdAt" | "updatedAt", ExtArgs["result"]["store"]>
  export type StoreInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | Store$ownerArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    hours?: boolean | Store$hoursArgs<ExtArgs>
    products?: boolean | Store$productsArgs<ExtArgs>
    reviews?: boolean | Store$reviewsArgs<ExtArgs>
    savedBy?: boolean | Store$savedByArgs<ExtArgs>
    claims?: boolean | Store$claimsArgs<ExtArgs>
    photos?: boolean | Store$photosArgs<ExtArgs>
    _count?: boolean | StoreCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StoreIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | Store$ownerArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type StoreIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | Store$ownerArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $StorePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Store"
    objects: {
      owner: Prisma.$UserPayload<ExtArgs> | null
      createdBy: Prisma.$UserPayload<ExtArgs>
      hours: Prisma.$StoreHoursPayload<ExtArgs>[]
      products: Prisma.$ProductPayload<ExtArgs>[]
      reviews: Prisma.$ReviewPayload<ExtArgs>[]
      savedBy: Prisma.$SavedStorePayload<ExtArgs>[]
      claims: Prisma.$StoreClaimPayload<ExtArgs>[]
      photos: Prisma.$StorePhotoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      slug: string
      name: string
      description: string
      addressLine: string
      city: string
      postalCode: string
      country: string
      latitude: number
      longitude: number
      phone: string | null
      website: string | null
      email: string | null
      ownerUserId: string | null
      status: $Enums.StoreStatus
      fairBadges: string
      categories: string
      coverImage: string | null
      createdById: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["store"]>
    composites: {}
  }

  type StoreGetPayload<S extends boolean | null | undefined | StoreDefaultArgs> = $Result.GetResult<Prisma.$StorePayload, S>

  type StoreCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StoreFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StoreCountAggregateInputType | true
    }

  export interface StoreDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Store'], meta: { name: 'Store' } }
    /**
     * Find zero or one Store that matches the filter.
     * @param {StoreFindUniqueArgs} args - Arguments to find a Store
     * @example
     * // Get one Store
     * const store = await prisma.store.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StoreFindUniqueArgs>(args: SelectSubset<T, StoreFindUniqueArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Store that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StoreFindUniqueOrThrowArgs} args - Arguments to find a Store
     * @example
     * // Get one Store
     * const store = await prisma.store.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StoreFindUniqueOrThrowArgs>(args: SelectSubset<T, StoreFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Store that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreFindFirstArgs} args - Arguments to find a Store
     * @example
     * // Get one Store
     * const store = await prisma.store.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StoreFindFirstArgs>(args?: SelectSubset<T, StoreFindFirstArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Store that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreFindFirstOrThrowArgs} args - Arguments to find a Store
     * @example
     * // Get one Store
     * const store = await prisma.store.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StoreFindFirstOrThrowArgs>(args?: SelectSubset<T, StoreFindFirstOrThrowArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Stores that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Stores
     * const stores = await prisma.store.findMany()
     * 
     * // Get first 10 Stores
     * const stores = await prisma.store.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const storeWithIdOnly = await prisma.store.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StoreFindManyArgs>(args?: SelectSubset<T, StoreFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Store.
     * @param {StoreCreateArgs} args - Arguments to create a Store.
     * @example
     * // Create one Store
     * const Store = await prisma.store.create({
     *   data: {
     *     // ... data to create a Store
     *   }
     * })
     * 
     */
    create<T extends StoreCreateArgs>(args: SelectSubset<T, StoreCreateArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Stores.
     * @param {StoreCreateManyArgs} args - Arguments to create many Stores.
     * @example
     * // Create many Stores
     * const store = await prisma.store.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StoreCreateManyArgs>(args?: SelectSubset<T, StoreCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Stores and returns the data saved in the database.
     * @param {StoreCreateManyAndReturnArgs} args - Arguments to create many Stores.
     * @example
     * // Create many Stores
     * const store = await prisma.store.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Stores and only return the `id`
     * const storeWithIdOnly = await prisma.store.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StoreCreateManyAndReturnArgs>(args?: SelectSubset<T, StoreCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Store.
     * @param {StoreDeleteArgs} args - Arguments to delete one Store.
     * @example
     * // Delete one Store
     * const Store = await prisma.store.delete({
     *   where: {
     *     // ... filter to delete one Store
     *   }
     * })
     * 
     */
    delete<T extends StoreDeleteArgs>(args: SelectSubset<T, StoreDeleteArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Store.
     * @param {StoreUpdateArgs} args - Arguments to update one Store.
     * @example
     * // Update one Store
     * const store = await prisma.store.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StoreUpdateArgs>(args: SelectSubset<T, StoreUpdateArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Stores.
     * @param {StoreDeleteManyArgs} args - Arguments to filter Stores to delete.
     * @example
     * // Delete a few Stores
     * const { count } = await prisma.store.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StoreDeleteManyArgs>(args?: SelectSubset<T, StoreDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Stores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Stores
     * const store = await prisma.store.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StoreUpdateManyArgs>(args: SelectSubset<T, StoreUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Stores and returns the data updated in the database.
     * @param {StoreUpdateManyAndReturnArgs} args - Arguments to update many Stores.
     * @example
     * // Update many Stores
     * const store = await prisma.store.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Stores and only return the `id`
     * const storeWithIdOnly = await prisma.store.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StoreUpdateManyAndReturnArgs>(args: SelectSubset<T, StoreUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Store.
     * @param {StoreUpsertArgs} args - Arguments to update or create a Store.
     * @example
     * // Update or create a Store
     * const store = await prisma.store.upsert({
     *   create: {
     *     // ... data to create a Store
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Store we want to update
     *   }
     * })
     */
    upsert<T extends StoreUpsertArgs>(args: SelectSubset<T, StoreUpsertArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Stores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreCountArgs} args - Arguments to filter Stores to count.
     * @example
     * // Count the number of Stores
     * const count = await prisma.store.count({
     *   where: {
     *     // ... the filter for the Stores we want to count
     *   }
     * })
    **/
    count<T extends StoreCountArgs>(
      args?: Subset<T, StoreCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StoreCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Store.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StoreAggregateArgs>(args: Subset<T, StoreAggregateArgs>): Prisma.PrismaPromise<GetStoreAggregateType<T>>

    /**
     * Group by Store.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StoreGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StoreGroupByArgs['orderBy'] }
        : { orderBy?: StoreGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StoreGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStoreGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Store model
   */
  readonly fields: StoreFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Store.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StoreClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    owner<T extends Store$ownerArgs<ExtArgs> = {}>(args?: Subset<T, Store$ownerArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    hours<T extends Store$hoursArgs<ExtArgs> = {}>(args?: Subset<T, Store$hoursArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StoreHoursPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    products<T extends Store$productsArgs<ExtArgs> = {}>(args?: Subset<T, Store$productsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reviews<T extends Store$reviewsArgs<ExtArgs> = {}>(args?: Subset<T, Store$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    savedBy<T extends Store$savedByArgs<ExtArgs> = {}>(args?: Subset<T, Store$savedByArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SavedStorePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    claims<T extends Store$claimsArgs<ExtArgs> = {}>(args?: Subset<T, Store$claimsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StoreClaimPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    photos<T extends Store$photosArgs<ExtArgs> = {}>(args?: Subset<T, Store$photosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StorePhotoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Store model
   */
  interface StoreFieldRefs {
    readonly id: FieldRef<"Store", 'String'>
    readonly slug: FieldRef<"Store", 'String'>
    readonly name: FieldRef<"Store", 'String'>
    readonly description: FieldRef<"Store", 'String'>
    readonly addressLine: FieldRef<"Store", 'String'>
    readonly city: FieldRef<"Store", 'String'>
    readonly postalCode: FieldRef<"Store", 'String'>
    readonly country: FieldRef<"Store", 'String'>
    readonly latitude: FieldRef<"Store", 'Float'>
    readonly longitude: FieldRef<"Store", 'Float'>
    readonly phone: FieldRef<"Store", 'String'>
    readonly website: FieldRef<"Store", 'String'>
    readonly email: FieldRef<"Store", 'String'>
    readonly ownerUserId: FieldRef<"Store", 'String'>
    readonly status: FieldRef<"Store", 'StoreStatus'>
    readonly fairBadges: FieldRef<"Store", 'String'>
    readonly categories: FieldRef<"Store", 'String'>
    readonly coverImage: FieldRef<"Store", 'String'>
    readonly createdById: FieldRef<"Store", 'String'>
    readonly createdAt: FieldRef<"Store", 'DateTime'>
    readonly updatedAt: FieldRef<"Store", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Store findUnique
   */
  export type StoreFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
    /**
     * Filter, which Store to fetch.
     */
    where: StoreWhereUniqueInput
  }

  /**
   * Store findUniqueOrThrow
   */
  export type StoreFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
    /**
     * Filter, which Store to fetch.
     */
    where: StoreWhereUniqueInput
  }

  /**
   * Store findFirst
   */
  export type StoreFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
    /**
     * Filter, which Store to fetch.
     */
    where?: StoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stores to fetch.
     */
    orderBy?: StoreOrderByWithRelationInput | StoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Stores.
     */
    cursor?: StoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Stores.
     */
    distinct?: StoreScalarFieldEnum | StoreScalarFieldEnum[]
  }

  /**
   * Store findFirstOrThrow
   */
  export type StoreFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
    /**
     * Filter, which Store to fetch.
     */
    where?: StoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stores to fetch.
     */
    orderBy?: StoreOrderByWithRelationInput | StoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Stores.
     */
    cursor?: StoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Stores.
     */
    distinct?: StoreScalarFieldEnum | StoreScalarFieldEnum[]
  }

  /**
   * Store findMany
   */
  export type StoreFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
    /**
     * Filter, which Stores to fetch.
     */
    where?: StoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stores to fetch.
     */
    orderBy?: StoreOrderByWithRelationInput | StoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Stores.
     */
    cursor?: StoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Stores.
     */
    distinct?: StoreScalarFieldEnum | StoreScalarFieldEnum[]
  }

  /**
   * Store create
   */
  export type StoreCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
    /**
     * The data needed to create a Store.
     */
    data: XOR<StoreCreateInput, StoreUncheckedCreateInput>
  }

  /**
   * Store createMany
   */
  export type StoreCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Stores.
     */
    data: StoreCreateManyInput | StoreCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Store createManyAndReturn
   */
  export type StoreCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * The data used to create many Stores.
     */
    data: StoreCreateManyInput | StoreCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Store update
   */
  export type StoreUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
    /**
     * The data needed to update a Store.
     */
    data: XOR<StoreUpdateInput, StoreUncheckedUpdateInput>
    /**
     * Choose, which Store to update.
     */
    where: StoreWhereUniqueInput
  }

  /**
   * Store updateMany
   */
  export type StoreUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Stores.
     */
    data: XOR<StoreUpdateManyMutationInput, StoreUncheckedUpdateManyInput>
    /**
     * Filter which Stores to update
     */
    where?: StoreWhereInput
    /**
     * Limit how many Stores to update.
     */
    limit?: number
  }

  /**
   * Store updateManyAndReturn
   */
  export type StoreUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * The data used to update Stores.
     */
    data: XOR<StoreUpdateManyMutationInput, StoreUncheckedUpdateManyInput>
    /**
     * Filter which Stores to update
     */
    where?: StoreWhereInput
    /**
     * Limit how many Stores to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Store upsert
   */
  export type StoreUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
    /**
     * The filter to search for the Store to update in case it exists.
     */
    where: StoreWhereUniqueInput
    /**
     * In case the Store found by the `where` argument doesn't exist, create a new Store with this data.
     */
    create: XOR<StoreCreateInput, StoreUncheckedCreateInput>
    /**
     * In case the Store was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StoreUpdateInput, StoreUncheckedUpdateInput>
  }

  /**
   * Store delete
   */
  export type StoreDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
    /**
     * Filter which Store to delete.
     */
    where: StoreWhereUniqueInput
  }

  /**
   * Store deleteMany
   */
  export type StoreDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Stores to delete
     */
    where?: StoreWhereInput
    /**
     * Limit how many Stores to delete.
     */
    limit?: number
  }

  /**
   * Store.owner
   */
  export type Store$ownerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Store.hours
   */
  export type Store$hoursArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreHours
     */
    select?: StoreHoursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoreHours
     */
    omit?: StoreHoursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreHoursInclude<ExtArgs> | null
    where?: StoreHoursWhereInput
    orderBy?: StoreHoursOrderByWithRelationInput | StoreHoursOrderByWithRelationInput[]
    cursor?: StoreHoursWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StoreHoursScalarFieldEnum | StoreHoursScalarFieldEnum[]
  }

  /**
   * Store.products
   */
  export type Store$productsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    cursor?: ProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Store.reviews
   */
  export type Store$reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    cursor?: ReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Store.savedBy
   */
  export type Store$savedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedStore
     */
    select?: SavedStoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedStore
     */
    omit?: SavedStoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedStoreInclude<ExtArgs> | null
    where?: SavedStoreWhereInput
    orderBy?: SavedStoreOrderByWithRelationInput | SavedStoreOrderByWithRelationInput[]
    cursor?: SavedStoreWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SavedStoreScalarFieldEnum | SavedStoreScalarFieldEnum[]
  }

  /**
   * Store.claims
   */
  export type Store$claimsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreClaim
     */
    select?: StoreClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoreClaim
     */
    omit?: StoreClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreClaimInclude<ExtArgs> | null
    where?: StoreClaimWhereInput
    orderBy?: StoreClaimOrderByWithRelationInput | StoreClaimOrderByWithRelationInput[]
    cursor?: StoreClaimWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StoreClaimScalarFieldEnum | StoreClaimScalarFieldEnum[]
  }

  /**
   * Store.photos
   */
  export type Store$photosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorePhoto
     */
    select?: StorePhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorePhoto
     */
    omit?: StorePhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorePhotoInclude<ExtArgs> | null
    where?: StorePhotoWhereInput
    orderBy?: StorePhotoOrderByWithRelationInput | StorePhotoOrderByWithRelationInput[]
    cursor?: StorePhotoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StorePhotoScalarFieldEnum | StorePhotoScalarFieldEnum[]
  }

  /**
   * Store without action
   */
  export type StoreDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
  }


  /**
   * Model StoreHours
   */

  export type AggregateStoreHours = {
    _count: StoreHoursCountAggregateOutputType | null
    _avg: StoreHoursAvgAggregateOutputType | null
    _sum: StoreHoursSumAggregateOutputType | null
    _min: StoreHoursMinAggregateOutputType | null
    _max: StoreHoursMaxAggregateOutputType | null
  }

  export type StoreHoursAvgAggregateOutputType = {
    dayOfWeek: number | null
  }

  export type StoreHoursSumAggregateOutputType = {
    dayOfWeek: number | null
  }

  export type StoreHoursMinAggregateOutputType = {
    id: string | null
    storeId: string | null
    dayOfWeek: number | null
    openTime: string | null
    closeTime: string | null
    isClosed: boolean | null
  }

  export type StoreHoursMaxAggregateOutputType = {
    id: string | null
    storeId: string | null
    dayOfWeek: number | null
    openTime: string | null
    closeTime: string | null
    isClosed: boolean | null
  }

  export type StoreHoursCountAggregateOutputType = {
    id: number
    storeId: number
    dayOfWeek: number
    openTime: number
    closeTime: number
    isClosed: number
    _all: number
  }


  export type StoreHoursAvgAggregateInputType = {
    dayOfWeek?: true
  }

  export type StoreHoursSumAggregateInputType = {
    dayOfWeek?: true
  }

  export type StoreHoursMinAggregateInputType = {
    id?: true
    storeId?: true
    dayOfWeek?: true
    openTime?: true
    closeTime?: true
    isClosed?: true
  }

  export type StoreHoursMaxAggregateInputType = {
    id?: true
    storeId?: true
    dayOfWeek?: true
    openTime?: true
    closeTime?: true
    isClosed?: true
  }

  export type StoreHoursCountAggregateInputType = {
    id?: true
    storeId?: true
    dayOfWeek?: true
    openTime?: true
    closeTime?: true
    isClosed?: true
    _all?: true
  }

  export type StoreHoursAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StoreHours to aggregate.
     */
    where?: StoreHoursWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StoreHours to fetch.
     */
    orderBy?: StoreHoursOrderByWithRelationInput | StoreHoursOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StoreHoursWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StoreHours from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StoreHours.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StoreHours
    **/
    _count?: true | StoreHoursCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StoreHoursAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StoreHoursSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StoreHoursMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StoreHoursMaxAggregateInputType
  }

  export type GetStoreHoursAggregateType<T extends StoreHoursAggregateArgs> = {
        [P in keyof T & keyof AggregateStoreHours]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStoreHours[P]>
      : GetScalarType<T[P], AggregateStoreHours[P]>
  }




  export type StoreHoursGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StoreHoursWhereInput
    orderBy?: StoreHoursOrderByWithAggregationInput | StoreHoursOrderByWithAggregationInput[]
    by: StoreHoursScalarFieldEnum[] | StoreHoursScalarFieldEnum
    having?: StoreHoursScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StoreHoursCountAggregateInputType | true
    _avg?: StoreHoursAvgAggregateInputType
    _sum?: StoreHoursSumAggregateInputType
    _min?: StoreHoursMinAggregateInputType
    _max?: StoreHoursMaxAggregateInputType
  }

  export type StoreHoursGroupByOutputType = {
    id: string
    storeId: string
    dayOfWeek: number
    openTime: string
    closeTime: string
    isClosed: boolean
    _count: StoreHoursCountAggregateOutputType | null
    _avg: StoreHoursAvgAggregateOutputType | null
    _sum: StoreHoursSumAggregateOutputType | null
    _min: StoreHoursMinAggregateOutputType | null
    _max: StoreHoursMaxAggregateOutputType | null
  }

  type GetStoreHoursGroupByPayload<T extends StoreHoursGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StoreHoursGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StoreHoursGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StoreHoursGroupByOutputType[P]>
            : GetScalarType<T[P], StoreHoursGroupByOutputType[P]>
        }
      >
    >


  export type StoreHoursSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    storeId?: boolean
    dayOfWeek?: boolean
    openTime?: boolean
    closeTime?: boolean
    isClosed?: boolean
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["storeHours"]>

  export type StoreHoursSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    storeId?: boolean
    dayOfWeek?: boolean
    openTime?: boolean
    closeTime?: boolean
    isClosed?: boolean
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["storeHours"]>

  export type StoreHoursSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    storeId?: boolean
    dayOfWeek?: boolean
    openTime?: boolean
    closeTime?: boolean
    isClosed?: boolean
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["storeHours"]>

  export type StoreHoursSelectScalar = {
    id?: boolean
    storeId?: boolean
    dayOfWeek?: boolean
    openTime?: boolean
    closeTime?: boolean
    isClosed?: boolean
  }

  export type StoreHoursOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "storeId" | "dayOfWeek" | "openTime" | "closeTime" | "isClosed", ExtArgs["result"]["storeHours"]>
  export type StoreHoursInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }
  export type StoreHoursIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }
  export type StoreHoursIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }

  export type $StoreHoursPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StoreHours"
    objects: {
      store: Prisma.$StorePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      storeId: string
      dayOfWeek: number
      openTime: string
      closeTime: string
      isClosed: boolean
    }, ExtArgs["result"]["storeHours"]>
    composites: {}
  }

  type StoreHoursGetPayload<S extends boolean | null | undefined | StoreHoursDefaultArgs> = $Result.GetResult<Prisma.$StoreHoursPayload, S>

  type StoreHoursCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StoreHoursFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StoreHoursCountAggregateInputType | true
    }

  export interface StoreHoursDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StoreHours'], meta: { name: 'StoreHours' } }
    /**
     * Find zero or one StoreHours that matches the filter.
     * @param {StoreHoursFindUniqueArgs} args - Arguments to find a StoreHours
     * @example
     * // Get one StoreHours
     * const storeHours = await prisma.storeHours.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StoreHoursFindUniqueArgs>(args: SelectSubset<T, StoreHoursFindUniqueArgs<ExtArgs>>): Prisma__StoreHoursClient<$Result.GetResult<Prisma.$StoreHoursPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StoreHours that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StoreHoursFindUniqueOrThrowArgs} args - Arguments to find a StoreHours
     * @example
     * // Get one StoreHours
     * const storeHours = await prisma.storeHours.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StoreHoursFindUniqueOrThrowArgs>(args: SelectSubset<T, StoreHoursFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StoreHoursClient<$Result.GetResult<Prisma.$StoreHoursPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StoreHours that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreHoursFindFirstArgs} args - Arguments to find a StoreHours
     * @example
     * // Get one StoreHours
     * const storeHours = await prisma.storeHours.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StoreHoursFindFirstArgs>(args?: SelectSubset<T, StoreHoursFindFirstArgs<ExtArgs>>): Prisma__StoreHoursClient<$Result.GetResult<Prisma.$StoreHoursPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StoreHours that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreHoursFindFirstOrThrowArgs} args - Arguments to find a StoreHours
     * @example
     * // Get one StoreHours
     * const storeHours = await prisma.storeHours.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StoreHoursFindFirstOrThrowArgs>(args?: SelectSubset<T, StoreHoursFindFirstOrThrowArgs<ExtArgs>>): Prisma__StoreHoursClient<$Result.GetResult<Prisma.$StoreHoursPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StoreHours that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreHoursFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StoreHours
     * const storeHours = await prisma.storeHours.findMany()
     * 
     * // Get first 10 StoreHours
     * const storeHours = await prisma.storeHours.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const storeHoursWithIdOnly = await prisma.storeHours.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StoreHoursFindManyArgs>(args?: SelectSubset<T, StoreHoursFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StoreHoursPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StoreHours.
     * @param {StoreHoursCreateArgs} args - Arguments to create a StoreHours.
     * @example
     * // Create one StoreHours
     * const StoreHours = await prisma.storeHours.create({
     *   data: {
     *     // ... data to create a StoreHours
     *   }
     * })
     * 
     */
    create<T extends StoreHoursCreateArgs>(args: SelectSubset<T, StoreHoursCreateArgs<ExtArgs>>): Prisma__StoreHoursClient<$Result.GetResult<Prisma.$StoreHoursPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StoreHours.
     * @param {StoreHoursCreateManyArgs} args - Arguments to create many StoreHours.
     * @example
     * // Create many StoreHours
     * const storeHours = await prisma.storeHours.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StoreHoursCreateManyArgs>(args?: SelectSubset<T, StoreHoursCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StoreHours and returns the data saved in the database.
     * @param {StoreHoursCreateManyAndReturnArgs} args - Arguments to create many StoreHours.
     * @example
     * // Create many StoreHours
     * const storeHours = await prisma.storeHours.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StoreHours and only return the `id`
     * const storeHoursWithIdOnly = await prisma.storeHours.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StoreHoursCreateManyAndReturnArgs>(args?: SelectSubset<T, StoreHoursCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StoreHoursPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StoreHours.
     * @param {StoreHoursDeleteArgs} args - Arguments to delete one StoreHours.
     * @example
     * // Delete one StoreHours
     * const StoreHours = await prisma.storeHours.delete({
     *   where: {
     *     // ... filter to delete one StoreHours
     *   }
     * })
     * 
     */
    delete<T extends StoreHoursDeleteArgs>(args: SelectSubset<T, StoreHoursDeleteArgs<ExtArgs>>): Prisma__StoreHoursClient<$Result.GetResult<Prisma.$StoreHoursPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StoreHours.
     * @param {StoreHoursUpdateArgs} args - Arguments to update one StoreHours.
     * @example
     * // Update one StoreHours
     * const storeHours = await prisma.storeHours.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StoreHoursUpdateArgs>(args: SelectSubset<T, StoreHoursUpdateArgs<ExtArgs>>): Prisma__StoreHoursClient<$Result.GetResult<Prisma.$StoreHoursPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StoreHours.
     * @param {StoreHoursDeleteManyArgs} args - Arguments to filter StoreHours to delete.
     * @example
     * // Delete a few StoreHours
     * const { count } = await prisma.storeHours.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StoreHoursDeleteManyArgs>(args?: SelectSubset<T, StoreHoursDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StoreHours.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreHoursUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StoreHours
     * const storeHours = await prisma.storeHours.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StoreHoursUpdateManyArgs>(args: SelectSubset<T, StoreHoursUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StoreHours and returns the data updated in the database.
     * @param {StoreHoursUpdateManyAndReturnArgs} args - Arguments to update many StoreHours.
     * @example
     * // Update many StoreHours
     * const storeHours = await prisma.storeHours.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StoreHours and only return the `id`
     * const storeHoursWithIdOnly = await prisma.storeHours.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StoreHoursUpdateManyAndReturnArgs>(args: SelectSubset<T, StoreHoursUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StoreHoursPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StoreHours.
     * @param {StoreHoursUpsertArgs} args - Arguments to update or create a StoreHours.
     * @example
     * // Update or create a StoreHours
     * const storeHours = await prisma.storeHours.upsert({
     *   create: {
     *     // ... data to create a StoreHours
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StoreHours we want to update
     *   }
     * })
     */
    upsert<T extends StoreHoursUpsertArgs>(args: SelectSubset<T, StoreHoursUpsertArgs<ExtArgs>>): Prisma__StoreHoursClient<$Result.GetResult<Prisma.$StoreHoursPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StoreHours.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreHoursCountArgs} args - Arguments to filter StoreHours to count.
     * @example
     * // Count the number of StoreHours
     * const count = await prisma.storeHours.count({
     *   where: {
     *     // ... the filter for the StoreHours we want to count
     *   }
     * })
    **/
    count<T extends StoreHoursCountArgs>(
      args?: Subset<T, StoreHoursCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StoreHoursCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StoreHours.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreHoursAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StoreHoursAggregateArgs>(args: Subset<T, StoreHoursAggregateArgs>): Prisma.PrismaPromise<GetStoreHoursAggregateType<T>>

    /**
     * Group by StoreHours.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreHoursGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StoreHoursGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StoreHoursGroupByArgs['orderBy'] }
        : { orderBy?: StoreHoursGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StoreHoursGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStoreHoursGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StoreHours model
   */
  readonly fields: StoreHoursFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StoreHours.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StoreHoursClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    store<T extends StoreDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StoreDefaultArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StoreHours model
   */
  interface StoreHoursFieldRefs {
    readonly id: FieldRef<"StoreHours", 'String'>
    readonly storeId: FieldRef<"StoreHours", 'String'>
    readonly dayOfWeek: FieldRef<"StoreHours", 'Int'>
    readonly openTime: FieldRef<"StoreHours", 'String'>
    readonly closeTime: FieldRef<"StoreHours", 'String'>
    readonly isClosed: FieldRef<"StoreHours", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * StoreHours findUnique
   */
  export type StoreHoursFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreHours
     */
    select?: StoreHoursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoreHours
     */
    omit?: StoreHoursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreHoursInclude<ExtArgs> | null
    /**
     * Filter, which StoreHours to fetch.
     */
    where: StoreHoursWhereUniqueInput
  }

  /**
   * StoreHours findUniqueOrThrow
   */
  export type StoreHoursFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreHours
     */
    select?: StoreHoursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoreHours
     */
    omit?: StoreHoursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreHoursInclude<ExtArgs> | null
    /**
     * Filter, which StoreHours to fetch.
     */
    where: StoreHoursWhereUniqueInput
  }

  /**
   * StoreHours findFirst
   */
  export type StoreHoursFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreHours
     */
    select?: StoreHoursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoreHours
     */
    omit?: StoreHoursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreHoursInclude<ExtArgs> | null
    /**
     * Filter, which StoreHours to fetch.
     */
    where?: StoreHoursWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StoreHours to fetch.
     */
    orderBy?: StoreHoursOrderByWithRelationInput | StoreHoursOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StoreHours.
     */
    cursor?: StoreHoursWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StoreHours from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StoreHours.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StoreHours.
     */
    distinct?: StoreHoursScalarFieldEnum | StoreHoursScalarFieldEnum[]
  }

  /**
   * StoreHours findFirstOrThrow
   */
  export type StoreHoursFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreHours
     */
    select?: StoreHoursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoreHours
     */
    omit?: StoreHoursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreHoursInclude<ExtArgs> | null
    /**
     * Filter, which StoreHours to fetch.
     */
    where?: StoreHoursWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StoreHours to fetch.
     */
    orderBy?: StoreHoursOrderByWithRelationInput | StoreHoursOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StoreHours.
     */
    cursor?: StoreHoursWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StoreHours from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StoreHours.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StoreHours.
     */
    distinct?: StoreHoursScalarFieldEnum | StoreHoursScalarFieldEnum[]
  }

  /**
   * StoreHours findMany
   */
  export type StoreHoursFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreHours
     */
    select?: StoreHoursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoreHours
     */
    omit?: StoreHoursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreHoursInclude<ExtArgs> | null
    /**
     * Filter, which StoreHours to fetch.
     */
    where?: StoreHoursWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StoreHours to fetch.
     */
    orderBy?: StoreHoursOrderByWithRelationInput | StoreHoursOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StoreHours.
     */
    cursor?: StoreHoursWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StoreHours from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StoreHours.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StoreHours.
     */
    distinct?: StoreHoursScalarFieldEnum | StoreHoursScalarFieldEnum[]
  }

  /**
   * StoreHours create
   */
  export type StoreHoursCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreHours
     */
    select?: StoreHoursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoreHours
     */
    omit?: StoreHoursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreHoursInclude<ExtArgs> | null
    /**
     * The data needed to create a StoreHours.
     */
    data: XOR<StoreHoursCreateInput, StoreHoursUncheckedCreateInput>
  }

  /**
   * StoreHours createMany
   */
  export type StoreHoursCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StoreHours.
     */
    data: StoreHoursCreateManyInput | StoreHoursCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StoreHours createManyAndReturn
   */
  export type StoreHoursCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreHours
     */
    select?: StoreHoursSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StoreHours
     */
    omit?: StoreHoursOmit<ExtArgs> | null
    /**
     * The data used to create many StoreHours.
     */
    data: StoreHoursCreateManyInput | StoreHoursCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreHoursIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * StoreHours update
   */
  export type StoreHoursUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreHours
     */
    select?: StoreHoursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoreHours
     */
    omit?: StoreHoursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreHoursInclude<ExtArgs> | null
    /**
     * The data needed to update a StoreHours.
     */
    data: XOR<StoreHoursUpdateInput, StoreHoursUncheckedUpdateInput>
    /**
     * Choose, which StoreHours to update.
     */
    where: StoreHoursWhereUniqueInput
  }

  /**
   * StoreHours updateMany
   */
  export type StoreHoursUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StoreHours.
     */
    data: XOR<StoreHoursUpdateManyMutationInput, StoreHoursUncheckedUpdateManyInput>
    /**
     * Filter which StoreHours to update
     */
    where?: StoreHoursWhereInput
    /**
     * Limit how many StoreHours to update.
     */
    limit?: number
  }

  /**
   * StoreHours updateManyAndReturn
   */
  export type StoreHoursUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreHours
     */
    select?: StoreHoursSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StoreHours
     */
    omit?: StoreHoursOmit<ExtArgs> | null
    /**
     * The data used to update StoreHours.
     */
    data: XOR<StoreHoursUpdateManyMutationInput, StoreHoursUncheckedUpdateManyInput>
    /**
     * Filter which StoreHours to update
     */
    where?: StoreHoursWhereInput
    /**
     * Limit how many StoreHours to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreHoursIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * StoreHours upsert
   */
  export type StoreHoursUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreHours
     */
    select?: StoreHoursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoreHours
     */
    omit?: StoreHoursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreHoursInclude<ExtArgs> | null
    /**
     * The filter to search for the StoreHours to update in case it exists.
     */
    where: StoreHoursWhereUniqueInput
    /**
     * In case the StoreHours found by the `where` argument doesn't exist, create a new StoreHours with this data.
     */
    create: XOR<StoreHoursCreateInput, StoreHoursUncheckedCreateInput>
    /**
     * In case the StoreHours was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StoreHoursUpdateInput, StoreHoursUncheckedUpdateInput>
  }

  /**
   * StoreHours delete
   */
  export type StoreHoursDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreHours
     */
    select?: StoreHoursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoreHours
     */
    omit?: StoreHoursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreHoursInclude<ExtArgs> | null
    /**
     * Filter which StoreHours to delete.
     */
    where: StoreHoursWhereUniqueInput
  }

  /**
   * StoreHours deleteMany
   */
  export type StoreHoursDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StoreHours to delete
     */
    where?: StoreHoursWhereInput
    /**
     * Limit how many StoreHours to delete.
     */
    limit?: number
  }

  /**
   * StoreHours without action
   */
  export type StoreHoursDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreHours
     */
    select?: StoreHoursSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoreHours
     */
    omit?: StoreHoursOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreHoursInclude<ExtArgs> | null
  }


  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductAvgAggregateOutputType = {
    price: number | null
  }

  export type ProductSumAggregateOutputType = {
    price: number | null
  }

  export type ProductMinAggregateOutputType = {
    id: string | null
    storeId: string | null
    name: string | null
    slug: string | null
    description: string | null
    price: number | null
    currency: string | null
    category: string | null
    imageUrl: string | null
    inStock: boolean | null
    createdAt: Date | null
  }

  export type ProductMaxAggregateOutputType = {
    id: string | null
    storeId: string | null
    name: string | null
    slug: string | null
    description: string | null
    price: number | null
    currency: string | null
    category: string | null
    imageUrl: string | null
    inStock: boolean | null
    createdAt: Date | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    storeId: number
    name: number
    slug: number
    description: number
    price: number
    currency: number
    category: number
    imageUrl: number
    inStock: number
    createdAt: number
    _all: number
  }


  export type ProductAvgAggregateInputType = {
    price?: true
  }

  export type ProductSumAggregateInputType = {
    price?: true
  }

  export type ProductMinAggregateInputType = {
    id?: true
    storeId?: true
    name?: true
    slug?: true
    description?: true
    price?: true
    currency?: true
    category?: true
    imageUrl?: true
    inStock?: true
    createdAt?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    storeId?: true
    name?: true
    slug?: true
    description?: true
    price?: true
    currency?: true
    category?: true
    imageUrl?: true
    inStock?: true
    createdAt?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    storeId?: true
    name?: true
    slug?: true
    description?: true
    price?: true
    currency?: true
    category?: true
    imageUrl?: true
    inStock?: true
    createdAt?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _avg?: ProductAvgAggregateInputType
    _sum?: ProductSumAggregateInputType
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    id: string
    storeId: string
    name: string
    slug: string
    description: string | null
    price: number | null
    currency: string
    category: string | null
    imageUrl: string | null
    inStock: boolean
    createdAt: Date
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    storeId?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    price?: boolean
    currency?: boolean
    category?: boolean
    imageUrl?: boolean
    inStock?: boolean
    createdAt?: boolean
    store?: boolean | StoreDefaultArgs<ExtArgs>
    savedBy?: boolean | Product$savedByArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    storeId?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    price?: boolean
    currency?: boolean
    category?: boolean
    imageUrl?: boolean
    inStock?: boolean
    createdAt?: boolean
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    storeId?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    price?: boolean
    currency?: boolean
    category?: boolean
    imageUrl?: boolean
    inStock?: boolean
    createdAt?: boolean
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectScalar = {
    id?: boolean
    storeId?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    price?: boolean
    currency?: boolean
    category?: boolean
    imageUrl?: boolean
    inStock?: boolean
    createdAt?: boolean
  }

  export type ProductOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "storeId" | "name" | "slug" | "description" | "price" | "currency" | "category" | "imageUrl" | "inStock" | "createdAt", ExtArgs["result"]["product"]>
  export type ProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    store?: boolean | StoreDefaultArgs<ExtArgs>
    savedBy?: boolean | Product$savedByArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }
  export type ProductIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {
      store: Prisma.$StorePayload<ExtArgs>
      savedBy: Prisma.$SavedProductPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      storeId: string
      name: string
      slug: string
      description: string | null
      price: number | null
      currency: string
      category: string | null
      imageUrl: string | null
      inStock: boolean
      createdAt: Date
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Products and returns the data saved in the database.
     * @param {ProductCreateManyAndReturnArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Products and only return the `id`
     * const productWithIdOnly = await prisma.product.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products and returns the data updated in the database.
     * @param {ProductUpdateManyAndReturnArgs} args - Arguments to update many Products.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Products and only return the `id`
     * const productWithIdOnly = await prisma.product.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    store<T extends StoreDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StoreDefaultArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    savedBy<T extends Product$savedByArgs<ExtArgs> = {}>(args?: Subset<T, Product$savedByArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SavedProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Product model
   */
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", 'String'>
    readonly storeId: FieldRef<"Product", 'String'>
    readonly name: FieldRef<"Product", 'String'>
    readonly slug: FieldRef<"Product", 'String'>
    readonly description: FieldRef<"Product", 'String'>
    readonly price: FieldRef<"Product", 'Float'>
    readonly currency: FieldRef<"Product", 'String'>
    readonly category: FieldRef<"Product", 'String'>
    readonly imageUrl: FieldRef<"Product", 'String'>
    readonly inStock: FieldRef<"Product", 'Boolean'>
    readonly createdAt: FieldRef<"Product", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product createManyAndReturn
   */
  export type ProductCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product updateManyAndReturn
   */
  export type ProductUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to delete.
     */
    limit?: number
  }

  /**
   * Product.savedBy
   */
  export type Product$savedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedProduct
     */
    select?: SavedProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedProduct
     */
    omit?: SavedProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedProductInclude<ExtArgs> | null
    where?: SavedProductWhereInput
    orderBy?: SavedProductOrderByWithRelationInput | SavedProductOrderByWithRelationInput[]
    cursor?: SavedProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SavedProductScalarFieldEnum | SavedProductScalarFieldEnum[]
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
  }


  /**
   * Model Review
   */

  export type AggregateReview = {
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  export type ReviewAvgAggregateOutputType = {
    rating: number | null
  }

  export type ReviewSumAggregateOutputType = {
    rating: number | null
  }

  export type ReviewMinAggregateOutputType = {
    id: string | null
    storeId: string | null
    userId: string | null
    rating: number | null
    title: string | null
    body: string | null
    ownerReply: string | null
    ownerReplyAt: Date | null
    status: $Enums.ReviewStatus | null
    createdAt: Date | null
  }

  export type ReviewMaxAggregateOutputType = {
    id: string | null
    storeId: string | null
    userId: string | null
    rating: number | null
    title: string | null
    body: string | null
    ownerReply: string | null
    ownerReplyAt: Date | null
    status: $Enums.ReviewStatus | null
    createdAt: Date | null
  }

  export type ReviewCountAggregateOutputType = {
    id: number
    storeId: number
    userId: number
    rating: number
    title: number
    body: number
    ownerReply: number
    ownerReplyAt: number
    status: number
    createdAt: number
    _all: number
  }


  export type ReviewAvgAggregateInputType = {
    rating?: true
  }

  export type ReviewSumAggregateInputType = {
    rating?: true
  }

  export type ReviewMinAggregateInputType = {
    id?: true
    storeId?: true
    userId?: true
    rating?: true
    title?: true
    body?: true
    ownerReply?: true
    ownerReplyAt?: true
    status?: true
    createdAt?: true
  }

  export type ReviewMaxAggregateInputType = {
    id?: true
    storeId?: true
    userId?: true
    rating?: true
    title?: true
    body?: true
    ownerReply?: true
    ownerReplyAt?: true
    status?: true
    createdAt?: true
  }

  export type ReviewCountAggregateInputType = {
    id?: true
    storeId?: true
    userId?: true
    rating?: true
    title?: true
    body?: true
    ownerReply?: true
    ownerReplyAt?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type ReviewAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Review to aggregate.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reviews
    **/
    _count?: true | ReviewCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReviewAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReviewSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReviewMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReviewMaxAggregateInputType
  }

  export type GetReviewAggregateType<T extends ReviewAggregateArgs> = {
        [P in keyof T & keyof AggregateReview]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReview[P]>
      : GetScalarType<T[P], AggregateReview[P]>
  }




  export type ReviewGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithAggregationInput | ReviewOrderByWithAggregationInput[]
    by: ReviewScalarFieldEnum[] | ReviewScalarFieldEnum
    having?: ReviewScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReviewCountAggregateInputType | true
    _avg?: ReviewAvgAggregateInputType
    _sum?: ReviewSumAggregateInputType
    _min?: ReviewMinAggregateInputType
    _max?: ReviewMaxAggregateInputType
  }

  export type ReviewGroupByOutputType = {
    id: string
    storeId: string
    userId: string
    rating: number
    title: string | null
    body: string
    ownerReply: string | null
    ownerReplyAt: Date | null
    status: $Enums.ReviewStatus
    createdAt: Date
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  type GetReviewGroupByPayload<T extends ReviewGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReviewGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReviewGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReviewGroupByOutputType[P]>
            : GetScalarType<T[P], ReviewGroupByOutputType[P]>
        }
      >
    >


  export type ReviewSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    storeId?: boolean
    userId?: boolean
    rating?: boolean
    title?: boolean
    body?: boolean
    ownerReply?: boolean
    ownerReplyAt?: boolean
    status?: boolean
    createdAt?: boolean
    store?: boolean | StoreDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type ReviewSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    storeId?: boolean
    userId?: boolean
    rating?: boolean
    title?: boolean
    body?: boolean
    ownerReply?: boolean
    ownerReplyAt?: boolean
    status?: boolean
    createdAt?: boolean
    store?: boolean | StoreDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type ReviewSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    storeId?: boolean
    userId?: boolean
    rating?: boolean
    title?: boolean
    body?: boolean
    ownerReply?: boolean
    ownerReplyAt?: boolean
    status?: boolean
    createdAt?: boolean
    store?: boolean | StoreDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type ReviewSelectScalar = {
    id?: boolean
    storeId?: boolean
    userId?: boolean
    rating?: boolean
    title?: boolean
    body?: boolean
    ownerReply?: boolean
    ownerReplyAt?: boolean
    status?: boolean
    createdAt?: boolean
  }

  export type ReviewOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "storeId" | "userId" | "rating" | "title" | "body" | "ownerReply" | "ownerReplyAt" | "status" | "createdAt", ExtArgs["result"]["review"]>
  export type ReviewInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    store?: boolean | StoreDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ReviewIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    store?: boolean | StoreDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ReviewIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    store?: boolean | StoreDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ReviewPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Review"
    objects: {
      store: Prisma.$StorePayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      storeId: string
      userId: string
      rating: number
      title: string | null
      body: string
      ownerReply: string | null
      ownerReplyAt: Date | null
      status: $Enums.ReviewStatus
      createdAt: Date
    }, ExtArgs["result"]["review"]>
    composites: {}
  }

  type ReviewGetPayload<S extends boolean | null | undefined | ReviewDefaultArgs> = $Result.GetResult<Prisma.$ReviewPayload, S>

  type ReviewCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReviewFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReviewCountAggregateInputType | true
    }

  export interface ReviewDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Review'], meta: { name: 'Review' } }
    /**
     * Find zero or one Review that matches the filter.
     * @param {ReviewFindUniqueArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReviewFindUniqueArgs>(args: SelectSubset<T, ReviewFindUniqueArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Review that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReviewFindUniqueOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReviewFindUniqueOrThrowArgs>(args: SelectSubset<T, ReviewFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Review that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReviewFindFirstArgs>(args?: SelectSubset<T, ReviewFindFirstArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Review that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReviewFindFirstOrThrowArgs>(args?: SelectSubset<T, ReviewFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reviews
     * const reviews = await prisma.review.findMany()
     * 
     * // Get first 10 Reviews
     * const reviews = await prisma.review.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reviewWithIdOnly = await prisma.review.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReviewFindManyArgs>(args?: SelectSubset<T, ReviewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Review.
     * @param {ReviewCreateArgs} args - Arguments to create a Review.
     * @example
     * // Create one Review
     * const Review = await prisma.review.create({
     *   data: {
     *     // ... data to create a Review
     *   }
     * })
     * 
     */
    create<T extends ReviewCreateArgs>(args: SelectSubset<T, ReviewCreateArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Reviews.
     * @param {ReviewCreateManyArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const review = await prisma.review.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReviewCreateManyArgs>(args?: SelectSubset<T, ReviewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reviews and returns the data saved in the database.
     * @param {ReviewCreateManyAndReturnArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const review = await prisma.review.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reviews and only return the `id`
     * const reviewWithIdOnly = await prisma.review.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReviewCreateManyAndReturnArgs>(args?: SelectSubset<T, ReviewCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Review.
     * @param {ReviewDeleteArgs} args - Arguments to delete one Review.
     * @example
     * // Delete one Review
     * const Review = await prisma.review.delete({
     *   where: {
     *     // ... filter to delete one Review
     *   }
     * })
     * 
     */
    delete<T extends ReviewDeleteArgs>(args: SelectSubset<T, ReviewDeleteArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Review.
     * @param {ReviewUpdateArgs} args - Arguments to update one Review.
     * @example
     * // Update one Review
     * const review = await prisma.review.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReviewUpdateArgs>(args: SelectSubset<T, ReviewUpdateArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Reviews.
     * @param {ReviewDeleteManyArgs} args - Arguments to filter Reviews to delete.
     * @example
     * // Delete a few Reviews
     * const { count } = await prisma.review.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReviewDeleteManyArgs>(args?: SelectSubset<T, ReviewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reviews
     * const review = await prisma.review.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReviewUpdateManyArgs>(args: SelectSubset<T, ReviewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reviews and returns the data updated in the database.
     * @param {ReviewUpdateManyAndReturnArgs} args - Arguments to update many Reviews.
     * @example
     * // Update many Reviews
     * const review = await prisma.review.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Reviews and only return the `id`
     * const reviewWithIdOnly = await prisma.review.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReviewUpdateManyAndReturnArgs>(args: SelectSubset<T, ReviewUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Review.
     * @param {ReviewUpsertArgs} args - Arguments to update or create a Review.
     * @example
     * // Update or create a Review
     * const review = await prisma.review.upsert({
     *   create: {
     *     // ... data to create a Review
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Review we want to update
     *   }
     * })
     */
    upsert<T extends ReviewUpsertArgs>(args: SelectSubset<T, ReviewUpsertArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewCountArgs} args - Arguments to filter Reviews to count.
     * @example
     * // Count the number of Reviews
     * const count = await prisma.review.count({
     *   where: {
     *     // ... the filter for the Reviews we want to count
     *   }
     * })
    **/
    count<T extends ReviewCountArgs>(
      args?: Subset<T, ReviewCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReviewCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReviewAggregateArgs>(args: Subset<T, ReviewAggregateArgs>): Prisma.PrismaPromise<GetReviewAggregateType<T>>

    /**
     * Group by Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReviewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReviewGroupByArgs['orderBy'] }
        : { orderBy?: ReviewGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Review model
   */
  readonly fields: ReviewFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Review.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReviewClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    store<T extends StoreDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StoreDefaultArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Review model
   */
  interface ReviewFieldRefs {
    readonly id: FieldRef<"Review", 'String'>
    readonly storeId: FieldRef<"Review", 'String'>
    readonly userId: FieldRef<"Review", 'String'>
    readonly rating: FieldRef<"Review", 'Int'>
    readonly title: FieldRef<"Review", 'String'>
    readonly body: FieldRef<"Review", 'String'>
    readonly ownerReply: FieldRef<"Review", 'String'>
    readonly ownerReplyAt: FieldRef<"Review", 'DateTime'>
    readonly status: FieldRef<"Review", 'ReviewStatus'>
    readonly createdAt: FieldRef<"Review", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Review findUnique
   */
  export type ReviewFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review findUniqueOrThrow
   */
  export type ReviewFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review findFirst
   */
  export type ReviewFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review findFirstOrThrow
   */
  export type ReviewFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review findMany
   */
  export type ReviewFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Reviews to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review create
   */
  export type ReviewCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The data needed to create a Review.
     */
    data: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
  }

  /**
   * Review createMany
   */
  export type ReviewCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reviews.
     */
    data: ReviewCreateManyInput | ReviewCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Review createManyAndReturn
   */
  export type ReviewCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * The data used to create many Reviews.
     */
    data: ReviewCreateManyInput | ReviewCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Review update
   */
  export type ReviewUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The data needed to update a Review.
     */
    data: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
    /**
     * Choose, which Review to update.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review updateMany
   */
  export type ReviewUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reviews.
     */
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyInput>
    /**
     * Filter which Reviews to update
     */
    where?: ReviewWhereInput
    /**
     * Limit how many Reviews to update.
     */
    limit?: number
  }

  /**
   * Review updateManyAndReturn
   */
  export type ReviewUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * The data used to update Reviews.
     */
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyInput>
    /**
     * Filter which Reviews to update
     */
    where?: ReviewWhereInput
    /**
     * Limit how many Reviews to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Review upsert
   */
  export type ReviewUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The filter to search for the Review to update in case it exists.
     */
    where: ReviewWhereUniqueInput
    /**
     * In case the Review found by the `where` argument doesn't exist, create a new Review with this data.
     */
    create: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
    /**
     * In case the Review was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
  }

  /**
   * Review delete
   */
  export type ReviewDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter which Review to delete.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review deleteMany
   */
  export type ReviewDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reviews to delete
     */
    where?: ReviewWhereInput
    /**
     * Limit how many Reviews to delete.
     */
    limit?: number
  }

  /**
   * Review without action
   */
  export type ReviewDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
  }


  /**
   * Model SavedStore
   */

  export type AggregateSavedStore = {
    _count: SavedStoreCountAggregateOutputType | null
    _min: SavedStoreMinAggregateOutputType | null
    _max: SavedStoreMaxAggregateOutputType | null
  }

  export type SavedStoreMinAggregateOutputType = {
    userId: string | null
    storeId: string | null
    createdAt: Date | null
  }

  export type SavedStoreMaxAggregateOutputType = {
    userId: string | null
    storeId: string | null
    createdAt: Date | null
  }

  export type SavedStoreCountAggregateOutputType = {
    userId: number
    storeId: number
    createdAt: number
    _all: number
  }


  export type SavedStoreMinAggregateInputType = {
    userId?: true
    storeId?: true
    createdAt?: true
  }

  export type SavedStoreMaxAggregateInputType = {
    userId?: true
    storeId?: true
    createdAt?: true
  }

  export type SavedStoreCountAggregateInputType = {
    userId?: true
    storeId?: true
    createdAt?: true
    _all?: true
  }

  export type SavedStoreAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SavedStore to aggregate.
     */
    where?: SavedStoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedStores to fetch.
     */
    orderBy?: SavedStoreOrderByWithRelationInput | SavedStoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SavedStoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedStores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedStores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SavedStores
    **/
    _count?: true | SavedStoreCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SavedStoreMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SavedStoreMaxAggregateInputType
  }

  export type GetSavedStoreAggregateType<T extends SavedStoreAggregateArgs> = {
        [P in keyof T & keyof AggregateSavedStore]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSavedStore[P]>
      : GetScalarType<T[P], AggregateSavedStore[P]>
  }




  export type SavedStoreGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SavedStoreWhereInput
    orderBy?: SavedStoreOrderByWithAggregationInput | SavedStoreOrderByWithAggregationInput[]
    by: SavedStoreScalarFieldEnum[] | SavedStoreScalarFieldEnum
    having?: SavedStoreScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SavedStoreCountAggregateInputType | true
    _min?: SavedStoreMinAggregateInputType
    _max?: SavedStoreMaxAggregateInputType
  }

  export type SavedStoreGroupByOutputType = {
    userId: string
    storeId: string
    createdAt: Date
    _count: SavedStoreCountAggregateOutputType | null
    _min: SavedStoreMinAggregateOutputType | null
    _max: SavedStoreMaxAggregateOutputType | null
  }

  type GetSavedStoreGroupByPayload<T extends SavedStoreGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SavedStoreGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SavedStoreGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SavedStoreGroupByOutputType[P]>
            : GetScalarType<T[P], SavedStoreGroupByOutputType[P]>
        }
      >
    >


  export type SavedStoreSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    storeId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["savedStore"]>

  export type SavedStoreSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    storeId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["savedStore"]>

  export type SavedStoreSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    storeId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["savedStore"]>

  export type SavedStoreSelectScalar = {
    userId?: boolean
    storeId?: boolean
    createdAt?: boolean
  }

  export type SavedStoreOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userId" | "storeId" | "createdAt", ExtArgs["result"]["savedStore"]>
  export type SavedStoreInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }
  export type SavedStoreIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }
  export type SavedStoreIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }

  export type $SavedStorePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SavedStore"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      store: Prisma.$StorePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: string
      storeId: string
      createdAt: Date
    }, ExtArgs["result"]["savedStore"]>
    composites: {}
  }

  type SavedStoreGetPayload<S extends boolean | null | undefined | SavedStoreDefaultArgs> = $Result.GetResult<Prisma.$SavedStorePayload, S>

  type SavedStoreCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SavedStoreFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SavedStoreCountAggregateInputType | true
    }

  export interface SavedStoreDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SavedStore'], meta: { name: 'SavedStore' } }
    /**
     * Find zero or one SavedStore that matches the filter.
     * @param {SavedStoreFindUniqueArgs} args - Arguments to find a SavedStore
     * @example
     * // Get one SavedStore
     * const savedStore = await prisma.savedStore.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SavedStoreFindUniqueArgs>(args: SelectSubset<T, SavedStoreFindUniqueArgs<ExtArgs>>): Prisma__SavedStoreClient<$Result.GetResult<Prisma.$SavedStorePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SavedStore that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SavedStoreFindUniqueOrThrowArgs} args - Arguments to find a SavedStore
     * @example
     * // Get one SavedStore
     * const savedStore = await prisma.savedStore.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SavedStoreFindUniqueOrThrowArgs>(args: SelectSubset<T, SavedStoreFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SavedStoreClient<$Result.GetResult<Prisma.$SavedStorePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SavedStore that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedStoreFindFirstArgs} args - Arguments to find a SavedStore
     * @example
     * // Get one SavedStore
     * const savedStore = await prisma.savedStore.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SavedStoreFindFirstArgs>(args?: SelectSubset<T, SavedStoreFindFirstArgs<ExtArgs>>): Prisma__SavedStoreClient<$Result.GetResult<Prisma.$SavedStorePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SavedStore that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedStoreFindFirstOrThrowArgs} args - Arguments to find a SavedStore
     * @example
     * // Get one SavedStore
     * const savedStore = await prisma.savedStore.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SavedStoreFindFirstOrThrowArgs>(args?: SelectSubset<T, SavedStoreFindFirstOrThrowArgs<ExtArgs>>): Prisma__SavedStoreClient<$Result.GetResult<Prisma.$SavedStorePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SavedStores that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedStoreFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SavedStores
     * const savedStores = await prisma.savedStore.findMany()
     * 
     * // Get first 10 SavedStores
     * const savedStores = await prisma.savedStore.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const savedStoreWithUserIdOnly = await prisma.savedStore.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends SavedStoreFindManyArgs>(args?: SelectSubset<T, SavedStoreFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SavedStorePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SavedStore.
     * @param {SavedStoreCreateArgs} args - Arguments to create a SavedStore.
     * @example
     * // Create one SavedStore
     * const SavedStore = await prisma.savedStore.create({
     *   data: {
     *     // ... data to create a SavedStore
     *   }
     * })
     * 
     */
    create<T extends SavedStoreCreateArgs>(args: SelectSubset<T, SavedStoreCreateArgs<ExtArgs>>): Prisma__SavedStoreClient<$Result.GetResult<Prisma.$SavedStorePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SavedStores.
     * @param {SavedStoreCreateManyArgs} args - Arguments to create many SavedStores.
     * @example
     * // Create many SavedStores
     * const savedStore = await prisma.savedStore.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SavedStoreCreateManyArgs>(args?: SelectSubset<T, SavedStoreCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SavedStores and returns the data saved in the database.
     * @param {SavedStoreCreateManyAndReturnArgs} args - Arguments to create many SavedStores.
     * @example
     * // Create many SavedStores
     * const savedStore = await prisma.savedStore.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SavedStores and only return the `userId`
     * const savedStoreWithUserIdOnly = await prisma.savedStore.createManyAndReturn({
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SavedStoreCreateManyAndReturnArgs>(args?: SelectSubset<T, SavedStoreCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SavedStorePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SavedStore.
     * @param {SavedStoreDeleteArgs} args - Arguments to delete one SavedStore.
     * @example
     * // Delete one SavedStore
     * const SavedStore = await prisma.savedStore.delete({
     *   where: {
     *     // ... filter to delete one SavedStore
     *   }
     * })
     * 
     */
    delete<T extends SavedStoreDeleteArgs>(args: SelectSubset<T, SavedStoreDeleteArgs<ExtArgs>>): Prisma__SavedStoreClient<$Result.GetResult<Prisma.$SavedStorePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SavedStore.
     * @param {SavedStoreUpdateArgs} args - Arguments to update one SavedStore.
     * @example
     * // Update one SavedStore
     * const savedStore = await prisma.savedStore.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SavedStoreUpdateArgs>(args: SelectSubset<T, SavedStoreUpdateArgs<ExtArgs>>): Prisma__SavedStoreClient<$Result.GetResult<Prisma.$SavedStorePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SavedStores.
     * @param {SavedStoreDeleteManyArgs} args - Arguments to filter SavedStores to delete.
     * @example
     * // Delete a few SavedStores
     * const { count } = await prisma.savedStore.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SavedStoreDeleteManyArgs>(args?: SelectSubset<T, SavedStoreDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SavedStores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedStoreUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SavedStores
     * const savedStore = await prisma.savedStore.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SavedStoreUpdateManyArgs>(args: SelectSubset<T, SavedStoreUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SavedStores and returns the data updated in the database.
     * @param {SavedStoreUpdateManyAndReturnArgs} args - Arguments to update many SavedStores.
     * @example
     * // Update many SavedStores
     * const savedStore = await prisma.savedStore.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SavedStores and only return the `userId`
     * const savedStoreWithUserIdOnly = await prisma.savedStore.updateManyAndReturn({
     *   select: { userId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SavedStoreUpdateManyAndReturnArgs>(args: SelectSubset<T, SavedStoreUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SavedStorePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SavedStore.
     * @param {SavedStoreUpsertArgs} args - Arguments to update or create a SavedStore.
     * @example
     * // Update or create a SavedStore
     * const savedStore = await prisma.savedStore.upsert({
     *   create: {
     *     // ... data to create a SavedStore
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SavedStore we want to update
     *   }
     * })
     */
    upsert<T extends SavedStoreUpsertArgs>(args: SelectSubset<T, SavedStoreUpsertArgs<ExtArgs>>): Prisma__SavedStoreClient<$Result.GetResult<Prisma.$SavedStorePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SavedStores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedStoreCountArgs} args - Arguments to filter SavedStores to count.
     * @example
     * // Count the number of SavedStores
     * const count = await prisma.savedStore.count({
     *   where: {
     *     // ... the filter for the SavedStores we want to count
     *   }
     * })
    **/
    count<T extends SavedStoreCountArgs>(
      args?: Subset<T, SavedStoreCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SavedStoreCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SavedStore.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedStoreAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SavedStoreAggregateArgs>(args: Subset<T, SavedStoreAggregateArgs>): Prisma.PrismaPromise<GetSavedStoreAggregateType<T>>

    /**
     * Group by SavedStore.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedStoreGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SavedStoreGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SavedStoreGroupByArgs['orderBy'] }
        : { orderBy?: SavedStoreGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SavedStoreGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSavedStoreGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SavedStore model
   */
  readonly fields: SavedStoreFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SavedStore.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SavedStoreClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    store<T extends StoreDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StoreDefaultArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SavedStore model
   */
  interface SavedStoreFieldRefs {
    readonly userId: FieldRef<"SavedStore", 'String'>
    readonly storeId: FieldRef<"SavedStore", 'String'>
    readonly createdAt: FieldRef<"SavedStore", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SavedStore findUnique
   */
  export type SavedStoreFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedStore
     */
    select?: SavedStoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedStore
     */
    omit?: SavedStoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedStoreInclude<ExtArgs> | null
    /**
     * Filter, which SavedStore to fetch.
     */
    where: SavedStoreWhereUniqueInput
  }

  /**
   * SavedStore findUniqueOrThrow
   */
  export type SavedStoreFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedStore
     */
    select?: SavedStoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedStore
     */
    omit?: SavedStoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedStoreInclude<ExtArgs> | null
    /**
     * Filter, which SavedStore to fetch.
     */
    where: SavedStoreWhereUniqueInput
  }

  /**
   * SavedStore findFirst
   */
  export type SavedStoreFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedStore
     */
    select?: SavedStoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedStore
     */
    omit?: SavedStoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedStoreInclude<ExtArgs> | null
    /**
     * Filter, which SavedStore to fetch.
     */
    where?: SavedStoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedStores to fetch.
     */
    orderBy?: SavedStoreOrderByWithRelationInput | SavedStoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SavedStores.
     */
    cursor?: SavedStoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedStores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedStores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SavedStores.
     */
    distinct?: SavedStoreScalarFieldEnum | SavedStoreScalarFieldEnum[]
  }

  /**
   * SavedStore findFirstOrThrow
   */
  export type SavedStoreFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedStore
     */
    select?: SavedStoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedStore
     */
    omit?: SavedStoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedStoreInclude<ExtArgs> | null
    /**
     * Filter, which SavedStore to fetch.
     */
    where?: SavedStoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedStores to fetch.
     */
    orderBy?: SavedStoreOrderByWithRelationInput | SavedStoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SavedStores.
     */
    cursor?: SavedStoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedStores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedStores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SavedStores.
     */
    distinct?: SavedStoreScalarFieldEnum | SavedStoreScalarFieldEnum[]
  }

  /**
   * SavedStore findMany
   */
  export type SavedStoreFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedStore
     */
    select?: SavedStoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedStore
     */
    omit?: SavedStoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedStoreInclude<ExtArgs> | null
    /**
     * Filter, which SavedStores to fetch.
     */
    where?: SavedStoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedStores to fetch.
     */
    orderBy?: SavedStoreOrderByWithRelationInput | SavedStoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SavedStores.
     */
    cursor?: SavedStoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedStores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedStores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SavedStores.
     */
    distinct?: SavedStoreScalarFieldEnum | SavedStoreScalarFieldEnum[]
  }

  /**
   * SavedStore create
   */
  export type SavedStoreCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedStore
     */
    select?: SavedStoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedStore
     */
    omit?: SavedStoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedStoreInclude<ExtArgs> | null
    /**
     * The data needed to create a SavedStore.
     */
    data: XOR<SavedStoreCreateInput, SavedStoreUncheckedCreateInput>
  }

  /**
   * SavedStore createMany
   */
  export type SavedStoreCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SavedStores.
     */
    data: SavedStoreCreateManyInput | SavedStoreCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SavedStore createManyAndReturn
   */
  export type SavedStoreCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedStore
     */
    select?: SavedStoreSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SavedStore
     */
    omit?: SavedStoreOmit<ExtArgs> | null
    /**
     * The data used to create many SavedStores.
     */
    data: SavedStoreCreateManyInput | SavedStoreCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedStoreIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SavedStore update
   */
  export type SavedStoreUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedStore
     */
    select?: SavedStoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedStore
     */
    omit?: SavedStoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedStoreInclude<ExtArgs> | null
    /**
     * The data needed to update a SavedStore.
     */
    data: XOR<SavedStoreUpdateInput, SavedStoreUncheckedUpdateInput>
    /**
     * Choose, which SavedStore to update.
     */
    where: SavedStoreWhereUniqueInput
  }

  /**
   * SavedStore updateMany
   */
  export type SavedStoreUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SavedStores.
     */
    data: XOR<SavedStoreUpdateManyMutationInput, SavedStoreUncheckedUpdateManyInput>
    /**
     * Filter which SavedStores to update
     */
    where?: SavedStoreWhereInput
    /**
     * Limit how many SavedStores to update.
     */
    limit?: number
  }

  /**
   * SavedStore updateManyAndReturn
   */
  export type SavedStoreUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedStore
     */
    select?: SavedStoreSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SavedStore
     */
    omit?: SavedStoreOmit<ExtArgs> | null
    /**
     * The data used to update SavedStores.
     */
    data: XOR<SavedStoreUpdateManyMutationInput, SavedStoreUncheckedUpdateManyInput>
    /**
     * Filter which SavedStores to update
     */
    where?: SavedStoreWhereInput
    /**
     * Limit how many SavedStores to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedStoreIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SavedStore upsert
   */
  export type SavedStoreUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedStore
     */
    select?: SavedStoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedStore
     */
    omit?: SavedStoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedStoreInclude<ExtArgs> | null
    /**
     * The filter to search for the SavedStore to update in case it exists.
     */
    where: SavedStoreWhereUniqueInput
    /**
     * In case the SavedStore found by the `where` argument doesn't exist, create a new SavedStore with this data.
     */
    create: XOR<SavedStoreCreateInput, SavedStoreUncheckedCreateInput>
    /**
     * In case the SavedStore was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SavedStoreUpdateInput, SavedStoreUncheckedUpdateInput>
  }

  /**
   * SavedStore delete
   */
  export type SavedStoreDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedStore
     */
    select?: SavedStoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedStore
     */
    omit?: SavedStoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedStoreInclude<ExtArgs> | null
    /**
     * Filter which SavedStore to delete.
     */
    where: SavedStoreWhereUniqueInput
  }

  /**
   * SavedStore deleteMany
   */
  export type SavedStoreDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SavedStores to delete
     */
    where?: SavedStoreWhereInput
    /**
     * Limit how many SavedStores to delete.
     */
    limit?: number
  }

  /**
   * SavedStore without action
   */
  export type SavedStoreDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedStore
     */
    select?: SavedStoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedStore
     */
    omit?: SavedStoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedStoreInclude<ExtArgs> | null
  }


  /**
   * Model SavedProduct
   */

  export type AggregateSavedProduct = {
    _count: SavedProductCountAggregateOutputType | null
    _min: SavedProductMinAggregateOutputType | null
    _max: SavedProductMaxAggregateOutputType | null
  }

  export type SavedProductMinAggregateOutputType = {
    userId: string | null
    productId: string | null
    createdAt: Date | null
  }

  export type SavedProductMaxAggregateOutputType = {
    userId: string | null
    productId: string | null
    createdAt: Date | null
  }

  export type SavedProductCountAggregateOutputType = {
    userId: number
    productId: number
    createdAt: number
    _all: number
  }


  export type SavedProductMinAggregateInputType = {
    userId?: true
    productId?: true
    createdAt?: true
  }

  export type SavedProductMaxAggregateInputType = {
    userId?: true
    productId?: true
    createdAt?: true
  }

  export type SavedProductCountAggregateInputType = {
    userId?: true
    productId?: true
    createdAt?: true
    _all?: true
  }

  export type SavedProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SavedProduct to aggregate.
     */
    where?: SavedProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedProducts to fetch.
     */
    orderBy?: SavedProductOrderByWithRelationInput | SavedProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SavedProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SavedProducts
    **/
    _count?: true | SavedProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SavedProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SavedProductMaxAggregateInputType
  }

  export type GetSavedProductAggregateType<T extends SavedProductAggregateArgs> = {
        [P in keyof T & keyof AggregateSavedProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSavedProduct[P]>
      : GetScalarType<T[P], AggregateSavedProduct[P]>
  }




  export type SavedProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SavedProductWhereInput
    orderBy?: SavedProductOrderByWithAggregationInput | SavedProductOrderByWithAggregationInput[]
    by: SavedProductScalarFieldEnum[] | SavedProductScalarFieldEnum
    having?: SavedProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SavedProductCountAggregateInputType | true
    _min?: SavedProductMinAggregateInputType
    _max?: SavedProductMaxAggregateInputType
  }

  export type SavedProductGroupByOutputType = {
    userId: string
    productId: string
    createdAt: Date
    _count: SavedProductCountAggregateOutputType | null
    _min: SavedProductMinAggregateOutputType | null
    _max: SavedProductMaxAggregateOutputType | null
  }

  type GetSavedProductGroupByPayload<T extends SavedProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SavedProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SavedProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SavedProductGroupByOutputType[P]>
            : GetScalarType<T[P], SavedProductGroupByOutputType[P]>
        }
      >
    >


  export type SavedProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    productId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["savedProduct"]>

  export type SavedProductSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    productId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["savedProduct"]>

  export type SavedProductSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    productId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["savedProduct"]>

  export type SavedProductSelectScalar = {
    userId?: boolean
    productId?: boolean
    createdAt?: boolean
  }

  export type SavedProductOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userId" | "productId" | "createdAt", ExtArgs["result"]["savedProduct"]>
  export type SavedProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type SavedProductIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }
  export type SavedProductIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $SavedProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SavedProduct"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: string
      productId: string
      createdAt: Date
    }, ExtArgs["result"]["savedProduct"]>
    composites: {}
  }

  type SavedProductGetPayload<S extends boolean | null | undefined | SavedProductDefaultArgs> = $Result.GetResult<Prisma.$SavedProductPayload, S>

  type SavedProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SavedProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SavedProductCountAggregateInputType | true
    }

  export interface SavedProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SavedProduct'], meta: { name: 'SavedProduct' } }
    /**
     * Find zero or one SavedProduct that matches the filter.
     * @param {SavedProductFindUniqueArgs} args - Arguments to find a SavedProduct
     * @example
     * // Get one SavedProduct
     * const savedProduct = await prisma.savedProduct.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SavedProductFindUniqueArgs>(args: SelectSubset<T, SavedProductFindUniqueArgs<ExtArgs>>): Prisma__SavedProductClient<$Result.GetResult<Prisma.$SavedProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SavedProduct that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SavedProductFindUniqueOrThrowArgs} args - Arguments to find a SavedProduct
     * @example
     * // Get one SavedProduct
     * const savedProduct = await prisma.savedProduct.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SavedProductFindUniqueOrThrowArgs>(args: SelectSubset<T, SavedProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SavedProductClient<$Result.GetResult<Prisma.$SavedProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SavedProduct that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedProductFindFirstArgs} args - Arguments to find a SavedProduct
     * @example
     * // Get one SavedProduct
     * const savedProduct = await prisma.savedProduct.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SavedProductFindFirstArgs>(args?: SelectSubset<T, SavedProductFindFirstArgs<ExtArgs>>): Prisma__SavedProductClient<$Result.GetResult<Prisma.$SavedProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SavedProduct that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedProductFindFirstOrThrowArgs} args - Arguments to find a SavedProduct
     * @example
     * // Get one SavedProduct
     * const savedProduct = await prisma.savedProduct.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SavedProductFindFirstOrThrowArgs>(args?: SelectSubset<T, SavedProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__SavedProductClient<$Result.GetResult<Prisma.$SavedProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SavedProducts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SavedProducts
     * const savedProducts = await prisma.savedProduct.findMany()
     * 
     * // Get first 10 SavedProducts
     * const savedProducts = await prisma.savedProduct.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const savedProductWithUserIdOnly = await prisma.savedProduct.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends SavedProductFindManyArgs>(args?: SelectSubset<T, SavedProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SavedProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SavedProduct.
     * @param {SavedProductCreateArgs} args - Arguments to create a SavedProduct.
     * @example
     * // Create one SavedProduct
     * const SavedProduct = await prisma.savedProduct.create({
     *   data: {
     *     // ... data to create a SavedProduct
     *   }
     * })
     * 
     */
    create<T extends SavedProductCreateArgs>(args: SelectSubset<T, SavedProductCreateArgs<ExtArgs>>): Prisma__SavedProductClient<$Result.GetResult<Prisma.$SavedProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SavedProducts.
     * @param {SavedProductCreateManyArgs} args - Arguments to create many SavedProducts.
     * @example
     * // Create many SavedProducts
     * const savedProduct = await prisma.savedProduct.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SavedProductCreateManyArgs>(args?: SelectSubset<T, SavedProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SavedProducts and returns the data saved in the database.
     * @param {SavedProductCreateManyAndReturnArgs} args - Arguments to create many SavedProducts.
     * @example
     * // Create many SavedProducts
     * const savedProduct = await prisma.savedProduct.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SavedProducts and only return the `userId`
     * const savedProductWithUserIdOnly = await prisma.savedProduct.createManyAndReturn({
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SavedProductCreateManyAndReturnArgs>(args?: SelectSubset<T, SavedProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SavedProductPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SavedProduct.
     * @param {SavedProductDeleteArgs} args - Arguments to delete one SavedProduct.
     * @example
     * // Delete one SavedProduct
     * const SavedProduct = await prisma.savedProduct.delete({
     *   where: {
     *     // ... filter to delete one SavedProduct
     *   }
     * })
     * 
     */
    delete<T extends SavedProductDeleteArgs>(args: SelectSubset<T, SavedProductDeleteArgs<ExtArgs>>): Prisma__SavedProductClient<$Result.GetResult<Prisma.$SavedProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SavedProduct.
     * @param {SavedProductUpdateArgs} args - Arguments to update one SavedProduct.
     * @example
     * // Update one SavedProduct
     * const savedProduct = await prisma.savedProduct.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SavedProductUpdateArgs>(args: SelectSubset<T, SavedProductUpdateArgs<ExtArgs>>): Prisma__SavedProductClient<$Result.GetResult<Prisma.$SavedProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SavedProducts.
     * @param {SavedProductDeleteManyArgs} args - Arguments to filter SavedProducts to delete.
     * @example
     * // Delete a few SavedProducts
     * const { count } = await prisma.savedProduct.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SavedProductDeleteManyArgs>(args?: SelectSubset<T, SavedProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SavedProducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SavedProducts
     * const savedProduct = await prisma.savedProduct.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SavedProductUpdateManyArgs>(args: SelectSubset<T, SavedProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SavedProducts and returns the data updated in the database.
     * @param {SavedProductUpdateManyAndReturnArgs} args - Arguments to update many SavedProducts.
     * @example
     * // Update many SavedProducts
     * const savedProduct = await prisma.savedProduct.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SavedProducts and only return the `userId`
     * const savedProductWithUserIdOnly = await prisma.savedProduct.updateManyAndReturn({
     *   select: { userId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SavedProductUpdateManyAndReturnArgs>(args: SelectSubset<T, SavedProductUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SavedProductPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SavedProduct.
     * @param {SavedProductUpsertArgs} args - Arguments to update or create a SavedProduct.
     * @example
     * // Update or create a SavedProduct
     * const savedProduct = await prisma.savedProduct.upsert({
     *   create: {
     *     // ... data to create a SavedProduct
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SavedProduct we want to update
     *   }
     * })
     */
    upsert<T extends SavedProductUpsertArgs>(args: SelectSubset<T, SavedProductUpsertArgs<ExtArgs>>): Prisma__SavedProductClient<$Result.GetResult<Prisma.$SavedProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SavedProducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedProductCountArgs} args - Arguments to filter SavedProducts to count.
     * @example
     * // Count the number of SavedProducts
     * const count = await prisma.savedProduct.count({
     *   where: {
     *     // ... the filter for the SavedProducts we want to count
     *   }
     * })
    **/
    count<T extends SavedProductCountArgs>(
      args?: Subset<T, SavedProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SavedProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SavedProduct.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SavedProductAggregateArgs>(args: Subset<T, SavedProductAggregateArgs>): Prisma.PrismaPromise<GetSavedProductAggregateType<T>>

    /**
     * Group by SavedProduct.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SavedProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SavedProductGroupByArgs['orderBy'] }
        : { orderBy?: SavedProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SavedProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSavedProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SavedProduct model
   */
  readonly fields: SavedProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SavedProduct.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SavedProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SavedProduct model
   */
  interface SavedProductFieldRefs {
    readonly userId: FieldRef<"SavedProduct", 'String'>
    readonly productId: FieldRef<"SavedProduct", 'String'>
    readonly createdAt: FieldRef<"SavedProduct", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SavedProduct findUnique
   */
  export type SavedProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedProduct
     */
    select?: SavedProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedProduct
     */
    omit?: SavedProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedProductInclude<ExtArgs> | null
    /**
     * Filter, which SavedProduct to fetch.
     */
    where: SavedProductWhereUniqueInput
  }

  /**
   * SavedProduct findUniqueOrThrow
   */
  export type SavedProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedProduct
     */
    select?: SavedProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedProduct
     */
    omit?: SavedProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedProductInclude<ExtArgs> | null
    /**
     * Filter, which SavedProduct to fetch.
     */
    where: SavedProductWhereUniqueInput
  }

  /**
   * SavedProduct findFirst
   */
  export type SavedProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedProduct
     */
    select?: SavedProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedProduct
     */
    omit?: SavedProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedProductInclude<ExtArgs> | null
    /**
     * Filter, which SavedProduct to fetch.
     */
    where?: SavedProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedProducts to fetch.
     */
    orderBy?: SavedProductOrderByWithRelationInput | SavedProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SavedProducts.
     */
    cursor?: SavedProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SavedProducts.
     */
    distinct?: SavedProductScalarFieldEnum | SavedProductScalarFieldEnum[]
  }

  /**
   * SavedProduct findFirstOrThrow
   */
  export type SavedProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedProduct
     */
    select?: SavedProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedProduct
     */
    omit?: SavedProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedProductInclude<ExtArgs> | null
    /**
     * Filter, which SavedProduct to fetch.
     */
    where?: SavedProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedProducts to fetch.
     */
    orderBy?: SavedProductOrderByWithRelationInput | SavedProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SavedProducts.
     */
    cursor?: SavedProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SavedProducts.
     */
    distinct?: SavedProductScalarFieldEnum | SavedProductScalarFieldEnum[]
  }

  /**
   * SavedProduct findMany
   */
  export type SavedProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedProduct
     */
    select?: SavedProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedProduct
     */
    omit?: SavedProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedProductInclude<ExtArgs> | null
    /**
     * Filter, which SavedProducts to fetch.
     */
    where?: SavedProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SavedProducts to fetch.
     */
    orderBy?: SavedProductOrderByWithRelationInput | SavedProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SavedProducts.
     */
    cursor?: SavedProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SavedProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SavedProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SavedProducts.
     */
    distinct?: SavedProductScalarFieldEnum | SavedProductScalarFieldEnum[]
  }

  /**
   * SavedProduct create
   */
  export type SavedProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedProduct
     */
    select?: SavedProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedProduct
     */
    omit?: SavedProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedProductInclude<ExtArgs> | null
    /**
     * The data needed to create a SavedProduct.
     */
    data: XOR<SavedProductCreateInput, SavedProductUncheckedCreateInput>
  }

  /**
   * SavedProduct createMany
   */
  export type SavedProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SavedProducts.
     */
    data: SavedProductCreateManyInput | SavedProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SavedProduct createManyAndReturn
   */
  export type SavedProductCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedProduct
     */
    select?: SavedProductSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SavedProduct
     */
    omit?: SavedProductOmit<ExtArgs> | null
    /**
     * The data used to create many SavedProducts.
     */
    data: SavedProductCreateManyInput | SavedProductCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedProductIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SavedProduct update
   */
  export type SavedProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedProduct
     */
    select?: SavedProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedProduct
     */
    omit?: SavedProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedProductInclude<ExtArgs> | null
    /**
     * The data needed to update a SavedProduct.
     */
    data: XOR<SavedProductUpdateInput, SavedProductUncheckedUpdateInput>
    /**
     * Choose, which SavedProduct to update.
     */
    where: SavedProductWhereUniqueInput
  }

  /**
   * SavedProduct updateMany
   */
  export type SavedProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SavedProducts.
     */
    data: XOR<SavedProductUpdateManyMutationInput, SavedProductUncheckedUpdateManyInput>
    /**
     * Filter which SavedProducts to update
     */
    where?: SavedProductWhereInput
    /**
     * Limit how many SavedProducts to update.
     */
    limit?: number
  }

  /**
   * SavedProduct updateManyAndReturn
   */
  export type SavedProductUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedProduct
     */
    select?: SavedProductSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SavedProduct
     */
    omit?: SavedProductOmit<ExtArgs> | null
    /**
     * The data used to update SavedProducts.
     */
    data: XOR<SavedProductUpdateManyMutationInput, SavedProductUncheckedUpdateManyInput>
    /**
     * Filter which SavedProducts to update
     */
    where?: SavedProductWhereInput
    /**
     * Limit how many SavedProducts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedProductIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SavedProduct upsert
   */
  export type SavedProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedProduct
     */
    select?: SavedProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedProduct
     */
    omit?: SavedProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedProductInclude<ExtArgs> | null
    /**
     * The filter to search for the SavedProduct to update in case it exists.
     */
    where: SavedProductWhereUniqueInput
    /**
     * In case the SavedProduct found by the `where` argument doesn't exist, create a new SavedProduct with this data.
     */
    create: XOR<SavedProductCreateInput, SavedProductUncheckedCreateInput>
    /**
     * In case the SavedProduct was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SavedProductUpdateInput, SavedProductUncheckedUpdateInput>
  }

  /**
   * SavedProduct delete
   */
  export type SavedProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedProduct
     */
    select?: SavedProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedProduct
     */
    omit?: SavedProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedProductInclude<ExtArgs> | null
    /**
     * Filter which SavedProduct to delete.
     */
    where: SavedProductWhereUniqueInput
  }

  /**
   * SavedProduct deleteMany
   */
  export type SavedProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SavedProducts to delete
     */
    where?: SavedProductWhereInput
    /**
     * Limit how many SavedProducts to delete.
     */
    limit?: number
  }

  /**
   * SavedProduct without action
   */
  export type SavedProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedProduct
     */
    select?: SavedProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SavedProduct
     */
    omit?: SavedProductOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SavedProductInclude<ExtArgs> | null
  }


  /**
   * Model StoreClaim
   */

  export type AggregateStoreClaim = {
    _count: StoreClaimCountAggregateOutputType | null
    _min: StoreClaimMinAggregateOutputType | null
    _max: StoreClaimMaxAggregateOutputType | null
  }

  export type StoreClaimMinAggregateOutputType = {
    id: string | null
    storeId: string | null
    userId: string | null
    proofText: string | null
    proofDocs: string | null
    status: $Enums.ClaimStatus | null
    reviewedBy: string | null
    createdAt: Date | null
  }

  export type StoreClaimMaxAggregateOutputType = {
    id: string | null
    storeId: string | null
    userId: string | null
    proofText: string | null
    proofDocs: string | null
    status: $Enums.ClaimStatus | null
    reviewedBy: string | null
    createdAt: Date | null
  }

  export type StoreClaimCountAggregateOutputType = {
    id: number
    storeId: number
    userId: number
    proofText: number
    proofDocs: number
    status: number
    reviewedBy: number
    createdAt: number
    _all: number
  }


  export type StoreClaimMinAggregateInputType = {
    id?: true
    storeId?: true
    userId?: true
    proofText?: true
    proofDocs?: true
    status?: true
    reviewedBy?: true
    createdAt?: true
  }

  export type StoreClaimMaxAggregateInputType = {
    id?: true
    storeId?: true
    userId?: true
    proofText?: true
    proofDocs?: true
    status?: true
    reviewedBy?: true
    createdAt?: true
  }

  export type StoreClaimCountAggregateInputType = {
    id?: true
    storeId?: true
    userId?: true
    proofText?: true
    proofDocs?: true
    status?: true
    reviewedBy?: true
    createdAt?: true
    _all?: true
  }

  export type StoreClaimAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StoreClaim to aggregate.
     */
    where?: StoreClaimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StoreClaims to fetch.
     */
    orderBy?: StoreClaimOrderByWithRelationInput | StoreClaimOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StoreClaimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StoreClaims from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StoreClaims.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StoreClaims
    **/
    _count?: true | StoreClaimCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StoreClaimMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StoreClaimMaxAggregateInputType
  }

  export type GetStoreClaimAggregateType<T extends StoreClaimAggregateArgs> = {
        [P in keyof T & keyof AggregateStoreClaim]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStoreClaim[P]>
      : GetScalarType<T[P], AggregateStoreClaim[P]>
  }




  export type StoreClaimGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StoreClaimWhereInput
    orderBy?: StoreClaimOrderByWithAggregationInput | StoreClaimOrderByWithAggregationInput[]
    by: StoreClaimScalarFieldEnum[] | StoreClaimScalarFieldEnum
    having?: StoreClaimScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StoreClaimCountAggregateInputType | true
    _min?: StoreClaimMinAggregateInputType
    _max?: StoreClaimMaxAggregateInputType
  }

  export type StoreClaimGroupByOutputType = {
    id: string
    storeId: string
    userId: string
    proofText: string
    proofDocs: string | null
    status: $Enums.ClaimStatus
    reviewedBy: string | null
    createdAt: Date
    _count: StoreClaimCountAggregateOutputType | null
    _min: StoreClaimMinAggregateOutputType | null
    _max: StoreClaimMaxAggregateOutputType | null
  }

  type GetStoreClaimGroupByPayload<T extends StoreClaimGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StoreClaimGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StoreClaimGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StoreClaimGroupByOutputType[P]>
            : GetScalarType<T[P], StoreClaimGroupByOutputType[P]>
        }
      >
    >


  export type StoreClaimSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    storeId?: boolean
    userId?: boolean
    proofText?: boolean
    proofDocs?: boolean
    status?: boolean
    reviewedBy?: boolean
    createdAt?: boolean
    store?: boolean | StoreDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    reviewer?: boolean | StoreClaim$reviewerArgs<ExtArgs>
  }, ExtArgs["result"]["storeClaim"]>

  export type StoreClaimSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    storeId?: boolean
    userId?: boolean
    proofText?: boolean
    proofDocs?: boolean
    status?: boolean
    reviewedBy?: boolean
    createdAt?: boolean
    store?: boolean | StoreDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    reviewer?: boolean | StoreClaim$reviewerArgs<ExtArgs>
  }, ExtArgs["result"]["storeClaim"]>

  export type StoreClaimSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    storeId?: boolean
    userId?: boolean
    proofText?: boolean
    proofDocs?: boolean
    status?: boolean
    reviewedBy?: boolean
    createdAt?: boolean
    store?: boolean | StoreDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    reviewer?: boolean | StoreClaim$reviewerArgs<ExtArgs>
  }, ExtArgs["result"]["storeClaim"]>

  export type StoreClaimSelectScalar = {
    id?: boolean
    storeId?: boolean
    userId?: boolean
    proofText?: boolean
    proofDocs?: boolean
    status?: boolean
    reviewedBy?: boolean
    createdAt?: boolean
  }

  export type StoreClaimOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "storeId" | "userId" | "proofText" | "proofDocs" | "status" | "reviewedBy" | "createdAt", ExtArgs["result"]["storeClaim"]>
  export type StoreClaimInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    store?: boolean | StoreDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    reviewer?: boolean | StoreClaim$reviewerArgs<ExtArgs>
  }
  export type StoreClaimIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    store?: boolean | StoreDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    reviewer?: boolean | StoreClaim$reviewerArgs<ExtArgs>
  }
  export type StoreClaimIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    store?: boolean | StoreDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    reviewer?: boolean | StoreClaim$reviewerArgs<ExtArgs>
  }

  export type $StoreClaimPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StoreClaim"
    objects: {
      store: Prisma.$StorePayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
      reviewer: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      storeId: string
      userId: string
      proofText: string
      proofDocs: string | null
      status: $Enums.ClaimStatus
      reviewedBy: string | null
      createdAt: Date
    }, ExtArgs["result"]["storeClaim"]>
    composites: {}
  }

  type StoreClaimGetPayload<S extends boolean | null | undefined | StoreClaimDefaultArgs> = $Result.GetResult<Prisma.$StoreClaimPayload, S>

  type StoreClaimCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StoreClaimFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StoreClaimCountAggregateInputType | true
    }

  export interface StoreClaimDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StoreClaim'], meta: { name: 'StoreClaim' } }
    /**
     * Find zero or one StoreClaim that matches the filter.
     * @param {StoreClaimFindUniqueArgs} args - Arguments to find a StoreClaim
     * @example
     * // Get one StoreClaim
     * const storeClaim = await prisma.storeClaim.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StoreClaimFindUniqueArgs>(args: SelectSubset<T, StoreClaimFindUniqueArgs<ExtArgs>>): Prisma__StoreClaimClient<$Result.GetResult<Prisma.$StoreClaimPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StoreClaim that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StoreClaimFindUniqueOrThrowArgs} args - Arguments to find a StoreClaim
     * @example
     * // Get one StoreClaim
     * const storeClaim = await prisma.storeClaim.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StoreClaimFindUniqueOrThrowArgs>(args: SelectSubset<T, StoreClaimFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StoreClaimClient<$Result.GetResult<Prisma.$StoreClaimPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StoreClaim that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreClaimFindFirstArgs} args - Arguments to find a StoreClaim
     * @example
     * // Get one StoreClaim
     * const storeClaim = await prisma.storeClaim.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StoreClaimFindFirstArgs>(args?: SelectSubset<T, StoreClaimFindFirstArgs<ExtArgs>>): Prisma__StoreClaimClient<$Result.GetResult<Prisma.$StoreClaimPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StoreClaim that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreClaimFindFirstOrThrowArgs} args - Arguments to find a StoreClaim
     * @example
     * // Get one StoreClaim
     * const storeClaim = await prisma.storeClaim.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StoreClaimFindFirstOrThrowArgs>(args?: SelectSubset<T, StoreClaimFindFirstOrThrowArgs<ExtArgs>>): Prisma__StoreClaimClient<$Result.GetResult<Prisma.$StoreClaimPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StoreClaims that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreClaimFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StoreClaims
     * const storeClaims = await prisma.storeClaim.findMany()
     * 
     * // Get first 10 StoreClaims
     * const storeClaims = await prisma.storeClaim.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const storeClaimWithIdOnly = await prisma.storeClaim.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StoreClaimFindManyArgs>(args?: SelectSubset<T, StoreClaimFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StoreClaimPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StoreClaim.
     * @param {StoreClaimCreateArgs} args - Arguments to create a StoreClaim.
     * @example
     * // Create one StoreClaim
     * const StoreClaim = await prisma.storeClaim.create({
     *   data: {
     *     // ... data to create a StoreClaim
     *   }
     * })
     * 
     */
    create<T extends StoreClaimCreateArgs>(args: SelectSubset<T, StoreClaimCreateArgs<ExtArgs>>): Prisma__StoreClaimClient<$Result.GetResult<Prisma.$StoreClaimPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StoreClaims.
     * @param {StoreClaimCreateManyArgs} args - Arguments to create many StoreClaims.
     * @example
     * // Create many StoreClaims
     * const storeClaim = await prisma.storeClaim.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StoreClaimCreateManyArgs>(args?: SelectSubset<T, StoreClaimCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StoreClaims and returns the data saved in the database.
     * @param {StoreClaimCreateManyAndReturnArgs} args - Arguments to create many StoreClaims.
     * @example
     * // Create many StoreClaims
     * const storeClaim = await prisma.storeClaim.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StoreClaims and only return the `id`
     * const storeClaimWithIdOnly = await prisma.storeClaim.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StoreClaimCreateManyAndReturnArgs>(args?: SelectSubset<T, StoreClaimCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StoreClaimPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StoreClaim.
     * @param {StoreClaimDeleteArgs} args - Arguments to delete one StoreClaim.
     * @example
     * // Delete one StoreClaim
     * const StoreClaim = await prisma.storeClaim.delete({
     *   where: {
     *     // ... filter to delete one StoreClaim
     *   }
     * })
     * 
     */
    delete<T extends StoreClaimDeleteArgs>(args: SelectSubset<T, StoreClaimDeleteArgs<ExtArgs>>): Prisma__StoreClaimClient<$Result.GetResult<Prisma.$StoreClaimPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StoreClaim.
     * @param {StoreClaimUpdateArgs} args - Arguments to update one StoreClaim.
     * @example
     * // Update one StoreClaim
     * const storeClaim = await prisma.storeClaim.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StoreClaimUpdateArgs>(args: SelectSubset<T, StoreClaimUpdateArgs<ExtArgs>>): Prisma__StoreClaimClient<$Result.GetResult<Prisma.$StoreClaimPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StoreClaims.
     * @param {StoreClaimDeleteManyArgs} args - Arguments to filter StoreClaims to delete.
     * @example
     * // Delete a few StoreClaims
     * const { count } = await prisma.storeClaim.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StoreClaimDeleteManyArgs>(args?: SelectSubset<T, StoreClaimDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StoreClaims.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreClaimUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StoreClaims
     * const storeClaim = await prisma.storeClaim.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StoreClaimUpdateManyArgs>(args: SelectSubset<T, StoreClaimUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StoreClaims and returns the data updated in the database.
     * @param {StoreClaimUpdateManyAndReturnArgs} args - Arguments to update many StoreClaims.
     * @example
     * // Update many StoreClaims
     * const storeClaim = await prisma.storeClaim.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StoreClaims and only return the `id`
     * const storeClaimWithIdOnly = await prisma.storeClaim.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StoreClaimUpdateManyAndReturnArgs>(args: SelectSubset<T, StoreClaimUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StoreClaimPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StoreClaim.
     * @param {StoreClaimUpsertArgs} args - Arguments to update or create a StoreClaim.
     * @example
     * // Update or create a StoreClaim
     * const storeClaim = await prisma.storeClaim.upsert({
     *   create: {
     *     // ... data to create a StoreClaim
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StoreClaim we want to update
     *   }
     * })
     */
    upsert<T extends StoreClaimUpsertArgs>(args: SelectSubset<T, StoreClaimUpsertArgs<ExtArgs>>): Prisma__StoreClaimClient<$Result.GetResult<Prisma.$StoreClaimPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StoreClaims.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreClaimCountArgs} args - Arguments to filter StoreClaims to count.
     * @example
     * // Count the number of StoreClaims
     * const count = await prisma.storeClaim.count({
     *   where: {
     *     // ... the filter for the StoreClaims we want to count
     *   }
     * })
    **/
    count<T extends StoreClaimCountArgs>(
      args?: Subset<T, StoreClaimCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StoreClaimCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StoreClaim.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreClaimAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StoreClaimAggregateArgs>(args: Subset<T, StoreClaimAggregateArgs>): Prisma.PrismaPromise<GetStoreClaimAggregateType<T>>

    /**
     * Group by StoreClaim.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreClaimGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StoreClaimGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StoreClaimGroupByArgs['orderBy'] }
        : { orderBy?: StoreClaimGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StoreClaimGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStoreClaimGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StoreClaim model
   */
  readonly fields: StoreClaimFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StoreClaim.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StoreClaimClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    store<T extends StoreDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StoreDefaultArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    reviewer<T extends StoreClaim$reviewerArgs<ExtArgs> = {}>(args?: Subset<T, StoreClaim$reviewerArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StoreClaim model
   */
  interface StoreClaimFieldRefs {
    readonly id: FieldRef<"StoreClaim", 'String'>
    readonly storeId: FieldRef<"StoreClaim", 'String'>
    readonly userId: FieldRef<"StoreClaim", 'String'>
    readonly proofText: FieldRef<"StoreClaim", 'String'>
    readonly proofDocs: FieldRef<"StoreClaim", 'String'>
    readonly status: FieldRef<"StoreClaim", 'ClaimStatus'>
    readonly reviewedBy: FieldRef<"StoreClaim", 'String'>
    readonly createdAt: FieldRef<"StoreClaim", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StoreClaim findUnique
   */
  export type StoreClaimFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreClaim
     */
    select?: StoreClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoreClaim
     */
    omit?: StoreClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreClaimInclude<ExtArgs> | null
    /**
     * Filter, which StoreClaim to fetch.
     */
    where: StoreClaimWhereUniqueInput
  }

  /**
   * StoreClaim findUniqueOrThrow
   */
  export type StoreClaimFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreClaim
     */
    select?: StoreClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoreClaim
     */
    omit?: StoreClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreClaimInclude<ExtArgs> | null
    /**
     * Filter, which StoreClaim to fetch.
     */
    where: StoreClaimWhereUniqueInput
  }

  /**
   * StoreClaim findFirst
   */
  export type StoreClaimFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreClaim
     */
    select?: StoreClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoreClaim
     */
    omit?: StoreClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreClaimInclude<ExtArgs> | null
    /**
     * Filter, which StoreClaim to fetch.
     */
    where?: StoreClaimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StoreClaims to fetch.
     */
    orderBy?: StoreClaimOrderByWithRelationInput | StoreClaimOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StoreClaims.
     */
    cursor?: StoreClaimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StoreClaims from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StoreClaims.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StoreClaims.
     */
    distinct?: StoreClaimScalarFieldEnum | StoreClaimScalarFieldEnum[]
  }

  /**
   * StoreClaim findFirstOrThrow
   */
  export type StoreClaimFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreClaim
     */
    select?: StoreClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoreClaim
     */
    omit?: StoreClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreClaimInclude<ExtArgs> | null
    /**
     * Filter, which StoreClaim to fetch.
     */
    where?: StoreClaimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StoreClaims to fetch.
     */
    orderBy?: StoreClaimOrderByWithRelationInput | StoreClaimOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StoreClaims.
     */
    cursor?: StoreClaimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StoreClaims from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StoreClaims.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StoreClaims.
     */
    distinct?: StoreClaimScalarFieldEnum | StoreClaimScalarFieldEnum[]
  }

  /**
   * StoreClaim findMany
   */
  export type StoreClaimFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreClaim
     */
    select?: StoreClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoreClaim
     */
    omit?: StoreClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreClaimInclude<ExtArgs> | null
    /**
     * Filter, which StoreClaims to fetch.
     */
    where?: StoreClaimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StoreClaims to fetch.
     */
    orderBy?: StoreClaimOrderByWithRelationInput | StoreClaimOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StoreClaims.
     */
    cursor?: StoreClaimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StoreClaims from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StoreClaims.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StoreClaims.
     */
    distinct?: StoreClaimScalarFieldEnum | StoreClaimScalarFieldEnum[]
  }

  /**
   * StoreClaim create
   */
  export type StoreClaimCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreClaim
     */
    select?: StoreClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoreClaim
     */
    omit?: StoreClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreClaimInclude<ExtArgs> | null
    /**
     * The data needed to create a StoreClaim.
     */
    data: XOR<StoreClaimCreateInput, StoreClaimUncheckedCreateInput>
  }

  /**
   * StoreClaim createMany
   */
  export type StoreClaimCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StoreClaims.
     */
    data: StoreClaimCreateManyInput | StoreClaimCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StoreClaim createManyAndReturn
   */
  export type StoreClaimCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreClaim
     */
    select?: StoreClaimSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StoreClaim
     */
    omit?: StoreClaimOmit<ExtArgs> | null
    /**
     * The data used to create many StoreClaims.
     */
    data: StoreClaimCreateManyInput | StoreClaimCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreClaimIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * StoreClaim update
   */
  export type StoreClaimUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreClaim
     */
    select?: StoreClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoreClaim
     */
    omit?: StoreClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreClaimInclude<ExtArgs> | null
    /**
     * The data needed to update a StoreClaim.
     */
    data: XOR<StoreClaimUpdateInput, StoreClaimUncheckedUpdateInput>
    /**
     * Choose, which StoreClaim to update.
     */
    where: StoreClaimWhereUniqueInput
  }

  /**
   * StoreClaim updateMany
   */
  export type StoreClaimUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StoreClaims.
     */
    data: XOR<StoreClaimUpdateManyMutationInput, StoreClaimUncheckedUpdateManyInput>
    /**
     * Filter which StoreClaims to update
     */
    where?: StoreClaimWhereInput
    /**
     * Limit how many StoreClaims to update.
     */
    limit?: number
  }

  /**
   * StoreClaim updateManyAndReturn
   */
  export type StoreClaimUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreClaim
     */
    select?: StoreClaimSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StoreClaim
     */
    omit?: StoreClaimOmit<ExtArgs> | null
    /**
     * The data used to update StoreClaims.
     */
    data: XOR<StoreClaimUpdateManyMutationInput, StoreClaimUncheckedUpdateManyInput>
    /**
     * Filter which StoreClaims to update
     */
    where?: StoreClaimWhereInput
    /**
     * Limit how many StoreClaims to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreClaimIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * StoreClaim upsert
   */
  export type StoreClaimUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreClaim
     */
    select?: StoreClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoreClaim
     */
    omit?: StoreClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreClaimInclude<ExtArgs> | null
    /**
     * The filter to search for the StoreClaim to update in case it exists.
     */
    where: StoreClaimWhereUniqueInput
    /**
     * In case the StoreClaim found by the `where` argument doesn't exist, create a new StoreClaim with this data.
     */
    create: XOR<StoreClaimCreateInput, StoreClaimUncheckedCreateInput>
    /**
     * In case the StoreClaim was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StoreClaimUpdateInput, StoreClaimUncheckedUpdateInput>
  }

  /**
   * StoreClaim delete
   */
  export type StoreClaimDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreClaim
     */
    select?: StoreClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoreClaim
     */
    omit?: StoreClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreClaimInclude<ExtArgs> | null
    /**
     * Filter which StoreClaim to delete.
     */
    where: StoreClaimWhereUniqueInput
  }

  /**
   * StoreClaim deleteMany
   */
  export type StoreClaimDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StoreClaims to delete
     */
    where?: StoreClaimWhereInput
    /**
     * Limit how many StoreClaims to delete.
     */
    limit?: number
  }

  /**
   * StoreClaim.reviewer
   */
  export type StoreClaim$reviewerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * StoreClaim without action
   */
  export type StoreClaimDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreClaim
     */
    select?: StoreClaimSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StoreClaim
     */
    omit?: StoreClaimOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreClaimInclude<ExtArgs> | null
  }


  /**
   * Model StorePhoto
   */

  export type AggregateStorePhoto = {
    _count: StorePhotoCountAggregateOutputType | null
    _avg: StorePhotoAvgAggregateOutputType | null
    _sum: StorePhotoSumAggregateOutputType | null
    _min: StorePhotoMinAggregateOutputType | null
    _max: StorePhotoMaxAggregateOutputType | null
  }

  export type StorePhotoAvgAggregateOutputType = {
    sortOrder: number | null
  }

  export type StorePhotoSumAggregateOutputType = {
    sortOrder: number | null
  }

  export type StorePhotoMinAggregateOutputType = {
    id: string | null
    storeId: string | null
    url: string | null
    caption: string | null
    sortOrder: number | null
  }

  export type StorePhotoMaxAggregateOutputType = {
    id: string | null
    storeId: string | null
    url: string | null
    caption: string | null
    sortOrder: number | null
  }

  export type StorePhotoCountAggregateOutputType = {
    id: number
    storeId: number
    url: number
    caption: number
    sortOrder: number
    _all: number
  }


  export type StorePhotoAvgAggregateInputType = {
    sortOrder?: true
  }

  export type StorePhotoSumAggregateInputType = {
    sortOrder?: true
  }

  export type StorePhotoMinAggregateInputType = {
    id?: true
    storeId?: true
    url?: true
    caption?: true
    sortOrder?: true
  }

  export type StorePhotoMaxAggregateInputType = {
    id?: true
    storeId?: true
    url?: true
    caption?: true
    sortOrder?: true
  }

  export type StorePhotoCountAggregateInputType = {
    id?: true
    storeId?: true
    url?: true
    caption?: true
    sortOrder?: true
    _all?: true
  }

  export type StorePhotoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StorePhoto to aggregate.
     */
    where?: StorePhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StorePhotos to fetch.
     */
    orderBy?: StorePhotoOrderByWithRelationInput | StorePhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StorePhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StorePhotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StorePhotos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StorePhotos
    **/
    _count?: true | StorePhotoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StorePhotoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StorePhotoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StorePhotoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StorePhotoMaxAggregateInputType
  }

  export type GetStorePhotoAggregateType<T extends StorePhotoAggregateArgs> = {
        [P in keyof T & keyof AggregateStorePhoto]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStorePhoto[P]>
      : GetScalarType<T[P], AggregateStorePhoto[P]>
  }




  export type StorePhotoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StorePhotoWhereInput
    orderBy?: StorePhotoOrderByWithAggregationInput | StorePhotoOrderByWithAggregationInput[]
    by: StorePhotoScalarFieldEnum[] | StorePhotoScalarFieldEnum
    having?: StorePhotoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StorePhotoCountAggregateInputType | true
    _avg?: StorePhotoAvgAggregateInputType
    _sum?: StorePhotoSumAggregateInputType
    _min?: StorePhotoMinAggregateInputType
    _max?: StorePhotoMaxAggregateInputType
  }

  export type StorePhotoGroupByOutputType = {
    id: string
    storeId: string
    url: string
    caption: string | null
    sortOrder: number
    _count: StorePhotoCountAggregateOutputType | null
    _avg: StorePhotoAvgAggregateOutputType | null
    _sum: StorePhotoSumAggregateOutputType | null
    _min: StorePhotoMinAggregateOutputType | null
    _max: StorePhotoMaxAggregateOutputType | null
  }

  type GetStorePhotoGroupByPayload<T extends StorePhotoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StorePhotoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StorePhotoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StorePhotoGroupByOutputType[P]>
            : GetScalarType<T[P], StorePhotoGroupByOutputType[P]>
        }
      >
    >


  export type StorePhotoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    storeId?: boolean
    url?: boolean
    caption?: boolean
    sortOrder?: boolean
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["storePhoto"]>

  export type StorePhotoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    storeId?: boolean
    url?: boolean
    caption?: boolean
    sortOrder?: boolean
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["storePhoto"]>

  export type StorePhotoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    storeId?: boolean
    url?: boolean
    caption?: boolean
    sortOrder?: boolean
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["storePhoto"]>

  export type StorePhotoSelectScalar = {
    id?: boolean
    storeId?: boolean
    url?: boolean
    caption?: boolean
    sortOrder?: boolean
  }

  export type StorePhotoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "storeId" | "url" | "caption" | "sortOrder", ExtArgs["result"]["storePhoto"]>
  export type StorePhotoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }
  export type StorePhotoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }
  export type StorePhotoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }

  export type $StorePhotoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StorePhoto"
    objects: {
      store: Prisma.$StorePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      storeId: string
      url: string
      caption: string | null
      sortOrder: number
    }, ExtArgs["result"]["storePhoto"]>
    composites: {}
  }

  type StorePhotoGetPayload<S extends boolean | null | undefined | StorePhotoDefaultArgs> = $Result.GetResult<Prisma.$StorePhotoPayload, S>

  type StorePhotoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StorePhotoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StorePhotoCountAggregateInputType | true
    }

  export interface StorePhotoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StorePhoto'], meta: { name: 'StorePhoto' } }
    /**
     * Find zero or one StorePhoto that matches the filter.
     * @param {StorePhotoFindUniqueArgs} args - Arguments to find a StorePhoto
     * @example
     * // Get one StorePhoto
     * const storePhoto = await prisma.storePhoto.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StorePhotoFindUniqueArgs>(args: SelectSubset<T, StorePhotoFindUniqueArgs<ExtArgs>>): Prisma__StorePhotoClient<$Result.GetResult<Prisma.$StorePhotoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StorePhoto that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StorePhotoFindUniqueOrThrowArgs} args - Arguments to find a StorePhoto
     * @example
     * // Get one StorePhoto
     * const storePhoto = await prisma.storePhoto.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StorePhotoFindUniqueOrThrowArgs>(args: SelectSubset<T, StorePhotoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StorePhotoClient<$Result.GetResult<Prisma.$StorePhotoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StorePhoto that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StorePhotoFindFirstArgs} args - Arguments to find a StorePhoto
     * @example
     * // Get one StorePhoto
     * const storePhoto = await prisma.storePhoto.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StorePhotoFindFirstArgs>(args?: SelectSubset<T, StorePhotoFindFirstArgs<ExtArgs>>): Prisma__StorePhotoClient<$Result.GetResult<Prisma.$StorePhotoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StorePhoto that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StorePhotoFindFirstOrThrowArgs} args - Arguments to find a StorePhoto
     * @example
     * // Get one StorePhoto
     * const storePhoto = await prisma.storePhoto.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StorePhotoFindFirstOrThrowArgs>(args?: SelectSubset<T, StorePhotoFindFirstOrThrowArgs<ExtArgs>>): Prisma__StorePhotoClient<$Result.GetResult<Prisma.$StorePhotoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StorePhotos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StorePhotoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StorePhotos
     * const storePhotos = await prisma.storePhoto.findMany()
     * 
     * // Get first 10 StorePhotos
     * const storePhotos = await prisma.storePhoto.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const storePhotoWithIdOnly = await prisma.storePhoto.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StorePhotoFindManyArgs>(args?: SelectSubset<T, StorePhotoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StorePhotoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StorePhoto.
     * @param {StorePhotoCreateArgs} args - Arguments to create a StorePhoto.
     * @example
     * // Create one StorePhoto
     * const StorePhoto = await prisma.storePhoto.create({
     *   data: {
     *     // ... data to create a StorePhoto
     *   }
     * })
     * 
     */
    create<T extends StorePhotoCreateArgs>(args: SelectSubset<T, StorePhotoCreateArgs<ExtArgs>>): Prisma__StorePhotoClient<$Result.GetResult<Prisma.$StorePhotoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StorePhotos.
     * @param {StorePhotoCreateManyArgs} args - Arguments to create many StorePhotos.
     * @example
     * // Create many StorePhotos
     * const storePhoto = await prisma.storePhoto.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StorePhotoCreateManyArgs>(args?: SelectSubset<T, StorePhotoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StorePhotos and returns the data saved in the database.
     * @param {StorePhotoCreateManyAndReturnArgs} args - Arguments to create many StorePhotos.
     * @example
     * // Create many StorePhotos
     * const storePhoto = await prisma.storePhoto.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StorePhotos and only return the `id`
     * const storePhotoWithIdOnly = await prisma.storePhoto.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StorePhotoCreateManyAndReturnArgs>(args?: SelectSubset<T, StorePhotoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StorePhotoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StorePhoto.
     * @param {StorePhotoDeleteArgs} args - Arguments to delete one StorePhoto.
     * @example
     * // Delete one StorePhoto
     * const StorePhoto = await prisma.storePhoto.delete({
     *   where: {
     *     // ... filter to delete one StorePhoto
     *   }
     * })
     * 
     */
    delete<T extends StorePhotoDeleteArgs>(args: SelectSubset<T, StorePhotoDeleteArgs<ExtArgs>>): Prisma__StorePhotoClient<$Result.GetResult<Prisma.$StorePhotoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StorePhoto.
     * @param {StorePhotoUpdateArgs} args - Arguments to update one StorePhoto.
     * @example
     * // Update one StorePhoto
     * const storePhoto = await prisma.storePhoto.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StorePhotoUpdateArgs>(args: SelectSubset<T, StorePhotoUpdateArgs<ExtArgs>>): Prisma__StorePhotoClient<$Result.GetResult<Prisma.$StorePhotoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StorePhotos.
     * @param {StorePhotoDeleteManyArgs} args - Arguments to filter StorePhotos to delete.
     * @example
     * // Delete a few StorePhotos
     * const { count } = await prisma.storePhoto.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StorePhotoDeleteManyArgs>(args?: SelectSubset<T, StorePhotoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StorePhotos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StorePhotoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StorePhotos
     * const storePhoto = await prisma.storePhoto.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StorePhotoUpdateManyArgs>(args: SelectSubset<T, StorePhotoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StorePhotos and returns the data updated in the database.
     * @param {StorePhotoUpdateManyAndReturnArgs} args - Arguments to update many StorePhotos.
     * @example
     * // Update many StorePhotos
     * const storePhoto = await prisma.storePhoto.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StorePhotos and only return the `id`
     * const storePhotoWithIdOnly = await prisma.storePhoto.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StorePhotoUpdateManyAndReturnArgs>(args: SelectSubset<T, StorePhotoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StorePhotoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StorePhoto.
     * @param {StorePhotoUpsertArgs} args - Arguments to update or create a StorePhoto.
     * @example
     * // Update or create a StorePhoto
     * const storePhoto = await prisma.storePhoto.upsert({
     *   create: {
     *     // ... data to create a StorePhoto
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StorePhoto we want to update
     *   }
     * })
     */
    upsert<T extends StorePhotoUpsertArgs>(args: SelectSubset<T, StorePhotoUpsertArgs<ExtArgs>>): Prisma__StorePhotoClient<$Result.GetResult<Prisma.$StorePhotoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StorePhotos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StorePhotoCountArgs} args - Arguments to filter StorePhotos to count.
     * @example
     * // Count the number of StorePhotos
     * const count = await prisma.storePhoto.count({
     *   where: {
     *     // ... the filter for the StorePhotos we want to count
     *   }
     * })
    **/
    count<T extends StorePhotoCountArgs>(
      args?: Subset<T, StorePhotoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StorePhotoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StorePhoto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StorePhotoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StorePhotoAggregateArgs>(args: Subset<T, StorePhotoAggregateArgs>): Prisma.PrismaPromise<GetStorePhotoAggregateType<T>>

    /**
     * Group by StorePhoto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StorePhotoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StorePhotoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StorePhotoGroupByArgs['orderBy'] }
        : { orderBy?: StorePhotoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StorePhotoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStorePhotoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StorePhoto model
   */
  readonly fields: StorePhotoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StorePhoto.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StorePhotoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    store<T extends StoreDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StoreDefaultArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StorePhoto model
   */
  interface StorePhotoFieldRefs {
    readonly id: FieldRef<"StorePhoto", 'String'>
    readonly storeId: FieldRef<"StorePhoto", 'String'>
    readonly url: FieldRef<"StorePhoto", 'String'>
    readonly caption: FieldRef<"StorePhoto", 'String'>
    readonly sortOrder: FieldRef<"StorePhoto", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * StorePhoto findUnique
   */
  export type StorePhotoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorePhoto
     */
    select?: StorePhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorePhoto
     */
    omit?: StorePhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorePhotoInclude<ExtArgs> | null
    /**
     * Filter, which StorePhoto to fetch.
     */
    where: StorePhotoWhereUniqueInput
  }

  /**
   * StorePhoto findUniqueOrThrow
   */
  export type StorePhotoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorePhoto
     */
    select?: StorePhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorePhoto
     */
    omit?: StorePhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorePhotoInclude<ExtArgs> | null
    /**
     * Filter, which StorePhoto to fetch.
     */
    where: StorePhotoWhereUniqueInput
  }

  /**
   * StorePhoto findFirst
   */
  export type StorePhotoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorePhoto
     */
    select?: StorePhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorePhoto
     */
    omit?: StorePhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorePhotoInclude<ExtArgs> | null
    /**
     * Filter, which StorePhoto to fetch.
     */
    where?: StorePhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StorePhotos to fetch.
     */
    orderBy?: StorePhotoOrderByWithRelationInput | StorePhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StorePhotos.
     */
    cursor?: StorePhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StorePhotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StorePhotos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StorePhotos.
     */
    distinct?: StorePhotoScalarFieldEnum | StorePhotoScalarFieldEnum[]
  }

  /**
   * StorePhoto findFirstOrThrow
   */
  export type StorePhotoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorePhoto
     */
    select?: StorePhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorePhoto
     */
    omit?: StorePhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorePhotoInclude<ExtArgs> | null
    /**
     * Filter, which StorePhoto to fetch.
     */
    where?: StorePhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StorePhotos to fetch.
     */
    orderBy?: StorePhotoOrderByWithRelationInput | StorePhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StorePhotos.
     */
    cursor?: StorePhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StorePhotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StorePhotos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StorePhotos.
     */
    distinct?: StorePhotoScalarFieldEnum | StorePhotoScalarFieldEnum[]
  }

  /**
   * StorePhoto findMany
   */
  export type StorePhotoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorePhoto
     */
    select?: StorePhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorePhoto
     */
    omit?: StorePhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorePhotoInclude<ExtArgs> | null
    /**
     * Filter, which StorePhotos to fetch.
     */
    where?: StorePhotoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StorePhotos to fetch.
     */
    orderBy?: StorePhotoOrderByWithRelationInput | StorePhotoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StorePhotos.
     */
    cursor?: StorePhotoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StorePhotos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StorePhotos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StorePhotos.
     */
    distinct?: StorePhotoScalarFieldEnum | StorePhotoScalarFieldEnum[]
  }

  /**
   * StorePhoto create
   */
  export type StorePhotoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorePhoto
     */
    select?: StorePhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorePhoto
     */
    omit?: StorePhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorePhotoInclude<ExtArgs> | null
    /**
     * The data needed to create a StorePhoto.
     */
    data: XOR<StorePhotoCreateInput, StorePhotoUncheckedCreateInput>
  }

  /**
   * StorePhoto createMany
   */
  export type StorePhotoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StorePhotos.
     */
    data: StorePhotoCreateManyInput | StorePhotoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StorePhoto createManyAndReturn
   */
  export type StorePhotoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorePhoto
     */
    select?: StorePhotoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StorePhoto
     */
    omit?: StorePhotoOmit<ExtArgs> | null
    /**
     * The data used to create many StorePhotos.
     */
    data: StorePhotoCreateManyInput | StorePhotoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorePhotoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * StorePhoto update
   */
  export type StorePhotoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorePhoto
     */
    select?: StorePhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorePhoto
     */
    omit?: StorePhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorePhotoInclude<ExtArgs> | null
    /**
     * The data needed to update a StorePhoto.
     */
    data: XOR<StorePhotoUpdateInput, StorePhotoUncheckedUpdateInput>
    /**
     * Choose, which StorePhoto to update.
     */
    where: StorePhotoWhereUniqueInput
  }

  /**
   * StorePhoto updateMany
   */
  export type StorePhotoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StorePhotos.
     */
    data: XOR<StorePhotoUpdateManyMutationInput, StorePhotoUncheckedUpdateManyInput>
    /**
     * Filter which StorePhotos to update
     */
    where?: StorePhotoWhereInput
    /**
     * Limit how many StorePhotos to update.
     */
    limit?: number
  }

  /**
   * StorePhoto updateManyAndReturn
   */
  export type StorePhotoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorePhoto
     */
    select?: StorePhotoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StorePhoto
     */
    omit?: StorePhotoOmit<ExtArgs> | null
    /**
     * The data used to update StorePhotos.
     */
    data: XOR<StorePhotoUpdateManyMutationInput, StorePhotoUncheckedUpdateManyInput>
    /**
     * Filter which StorePhotos to update
     */
    where?: StorePhotoWhereInput
    /**
     * Limit how many StorePhotos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorePhotoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * StorePhoto upsert
   */
  export type StorePhotoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorePhoto
     */
    select?: StorePhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorePhoto
     */
    omit?: StorePhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorePhotoInclude<ExtArgs> | null
    /**
     * The filter to search for the StorePhoto to update in case it exists.
     */
    where: StorePhotoWhereUniqueInput
    /**
     * In case the StorePhoto found by the `where` argument doesn't exist, create a new StorePhoto with this data.
     */
    create: XOR<StorePhotoCreateInput, StorePhotoUncheckedCreateInput>
    /**
     * In case the StorePhoto was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StorePhotoUpdateInput, StorePhotoUncheckedUpdateInput>
  }

  /**
   * StorePhoto delete
   */
  export type StorePhotoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorePhoto
     */
    select?: StorePhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorePhoto
     */
    omit?: StorePhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorePhotoInclude<ExtArgs> | null
    /**
     * Filter which StorePhoto to delete.
     */
    where: StorePhotoWhereUniqueInput
  }

  /**
   * StorePhoto deleteMany
   */
  export type StorePhotoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StorePhotos to delete
     */
    where?: StorePhotoWhereInput
    /**
     * Limit how many StorePhotos to delete.
     */
    limit?: number
  }

  /**
   * StorePhoto without action
   */
  export type StorePhotoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorePhoto
     */
    select?: StorePhotoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorePhoto
     */
    omit?: StorePhotoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorePhotoInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    avatarUrl: 'avatarUrl',
    role: 'role',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const StoreScalarFieldEnum: {
    id: 'id',
    slug: 'slug',
    name: 'name',
    description: 'description',
    addressLine: 'addressLine',
    city: 'city',
    postalCode: 'postalCode',
    country: 'country',
    latitude: 'latitude',
    longitude: 'longitude',
    phone: 'phone',
    website: 'website',
    email: 'email',
    ownerUserId: 'ownerUserId',
    status: 'status',
    fairBadges: 'fairBadges',
    categories: 'categories',
    coverImage: 'coverImage',
    createdById: 'createdById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StoreScalarFieldEnum = (typeof StoreScalarFieldEnum)[keyof typeof StoreScalarFieldEnum]


  export const StoreHoursScalarFieldEnum: {
    id: 'id',
    storeId: 'storeId',
    dayOfWeek: 'dayOfWeek',
    openTime: 'openTime',
    closeTime: 'closeTime',
    isClosed: 'isClosed'
  };

  export type StoreHoursScalarFieldEnum = (typeof StoreHoursScalarFieldEnum)[keyof typeof StoreHoursScalarFieldEnum]


  export const ProductScalarFieldEnum: {
    id: 'id',
    storeId: 'storeId',
    name: 'name',
    slug: 'slug',
    description: 'description',
    price: 'price',
    currency: 'currency',
    category: 'category',
    imageUrl: 'imageUrl',
    inStock: 'inStock',
    createdAt: 'createdAt'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const ReviewScalarFieldEnum: {
    id: 'id',
    storeId: 'storeId',
    userId: 'userId',
    rating: 'rating',
    title: 'title',
    body: 'body',
    ownerReply: 'ownerReply',
    ownerReplyAt: 'ownerReplyAt',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type ReviewScalarFieldEnum = (typeof ReviewScalarFieldEnum)[keyof typeof ReviewScalarFieldEnum]


  export const SavedStoreScalarFieldEnum: {
    userId: 'userId',
    storeId: 'storeId',
    createdAt: 'createdAt'
  };

  export type SavedStoreScalarFieldEnum = (typeof SavedStoreScalarFieldEnum)[keyof typeof SavedStoreScalarFieldEnum]


  export const SavedProductScalarFieldEnum: {
    userId: 'userId',
    productId: 'productId',
    createdAt: 'createdAt'
  };

  export type SavedProductScalarFieldEnum = (typeof SavedProductScalarFieldEnum)[keyof typeof SavedProductScalarFieldEnum]


  export const StoreClaimScalarFieldEnum: {
    id: 'id',
    storeId: 'storeId',
    userId: 'userId',
    proofText: 'proofText',
    proofDocs: 'proofDocs',
    status: 'status',
    reviewedBy: 'reviewedBy',
    createdAt: 'createdAt'
  };

  export type StoreClaimScalarFieldEnum = (typeof StoreClaimScalarFieldEnum)[keyof typeof StoreClaimScalarFieldEnum]


  export const StorePhotoScalarFieldEnum: {
    id: 'id',
    storeId: 'storeId',
    url: 'url',
    caption: 'caption',
    sortOrder: 'sortOrder'
  };

  export type StorePhotoScalarFieldEnum = (typeof StorePhotoScalarFieldEnum)[keyof typeof StorePhotoScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'StoreStatus'
   */
  export type EnumStoreStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StoreStatus'>
    


  /**
   * Reference to a field of type 'StoreStatus[]'
   */
  export type ListEnumStoreStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StoreStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'ReviewStatus'
   */
  export type EnumReviewStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReviewStatus'>
    


  /**
   * Reference to a field of type 'ReviewStatus[]'
   */
  export type ListEnumReviewStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReviewStatus[]'>
    


  /**
   * Reference to a field of type 'ClaimStatus'
   */
  export type EnumClaimStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ClaimStatus'>
    


  /**
   * Reference to a field of type 'ClaimStatus[]'
   */
  export type ListEnumClaimStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ClaimStatus[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    avatarUrl?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeFilter<"User"> | Date | string
    storesCreated?: StoreListRelationFilter
    storesOwned?: StoreListRelationFilter
    reviews?: ReviewListRelationFilter
    savedStores?: SavedStoreListRelationFilter
    savedProducts?: SavedProductListRelationFilter
    claims?: StoreClaimListRelationFilter
    claimsReviewed?: StoreClaimListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    storesCreated?: StoreOrderByRelationAggregateInput
    storesOwned?: StoreOrderByRelationAggregateInput
    reviews?: ReviewOrderByRelationAggregateInput
    savedStores?: SavedStoreOrderByRelationAggregateInput
    savedProducts?: SavedProductOrderByRelationAggregateInput
    claims?: StoreClaimOrderByRelationAggregateInput
    claimsReviewed?: StoreClaimOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    avatarUrl?: StringNullableFilter<"User"> | string | null
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeFilter<"User"> | Date | string
    storesCreated?: StoreListRelationFilter
    storesOwned?: StoreListRelationFilter
    reviews?: ReviewListRelationFilter
    savedStores?: SavedStoreListRelationFilter
    savedProducts?: SavedProductListRelationFilter
    claims?: StoreClaimListRelationFilter
    claimsReviewed?: StoreClaimListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    avatarUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type StoreWhereInput = {
    AND?: StoreWhereInput | StoreWhereInput[]
    OR?: StoreWhereInput[]
    NOT?: StoreWhereInput | StoreWhereInput[]
    id?: StringFilter<"Store"> | string
    slug?: StringFilter<"Store"> | string
    name?: StringFilter<"Store"> | string
    description?: StringFilter<"Store"> | string
    addressLine?: StringFilter<"Store"> | string
    city?: StringFilter<"Store"> | string
    postalCode?: StringFilter<"Store"> | string
    country?: StringFilter<"Store"> | string
    latitude?: FloatFilter<"Store"> | number
    longitude?: FloatFilter<"Store"> | number
    phone?: StringNullableFilter<"Store"> | string | null
    website?: StringNullableFilter<"Store"> | string | null
    email?: StringNullableFilter<"Store"> | string | null
    ownerUserId?: StringNullableFilter<"Store"> | string | null
    status?: EnumStoreStatusFilter<"Store"> | $Enums.StoreStatus
    fairBadges?: StringFilter<"Store"> | string
    categories?: StringFilter<"Store"> | string
    coverImage?: StringNullableFilter<"Store"> | string | null
    createdById?: StringFilter<"Store"> | string
    createdAt?: DateTimeFilter<"Store"> | Date | string
    updatedAt?: DateTimeFilter<"Store"> | Date | string
    owner?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    hours?: StoreHoursListRelationFilter
    products?: ProductListRelationFilter
    reviews?: ReviewListRelationFilter
    savedBy?: SavedStoreListRelationFilter
    claims?: StoreClaimListRelationFilter
    photos?: StorePhotoListRelationFilter
  }

  export type StoreOrderByWithRelationInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    description?: SortOrder
    addressLine?: SortOrder
    city?: SortOrder
    postalCode?: SortOrder
    country?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    phone?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    ownerUserId?: SortOrderInput | SortOrder
    status?: SortOrder
    fairBadges?: SortOrder
    categories?: SortOrder
    coverImage?: SortOrderInput | SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    owner?: UserOrderByWithRelationInput
    createdBy?: UserOrderByWithRelationInput
    hours?: StoreHoursOrderByRelationAggregateInput
    products?: ProductOrderByRelationAggregateInput
    reviews?: ReviewOrderByRelationAggregateInput
    savedBy?: SavedStoreOrderByRelationAggregateInput
    claims?: StoreClaimOrderByRelationAggregateInput
    photos?: StorePhotoOrderByRelationAggregateInput
  }

  export type StoreWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: StoreWhereInput | StoreWhereInput[]
    OR?: StoreWhereInput[]
    NOT?: StoreWhereInput | StoreWhereInput[]
    name?: StringFilter<"Store"> | string
    description?: StringFilter<"Store"> | string
    addressLine?: StringFilter<"Store"> | string
    city?: StringFilter<"Store"> | string
    postalCode?: StringFilter<"Store"> | string
    country?: StringFilter<"Store"> | string
    latitude?: FloatFilter<"Store"> | number
    longitude?: FloatFilter<"Store"> | number
    phone?: StringNullableFilter<"Store"> | string | null
    website?: StringNullableFilter<"Store"> | string | null
    email?: StringNullableFilter<"Store"> | string | null
    ownerUserId?: StringNullableFilter<"Store"> | string | null
    status?: EnumStoreStatusFilter<"Store"> | $Enums.StoreStatus
    fairBadges?: StringFilter<"Store"> | string
    categories?: StringFilter<"Store"> | string
    coverImage?: StringNullableFilter<"Store"> | string | null
    createdById?: StringFilter<"Store"> | string
    createdAt?: DateTimeFilter<"Store"> | Date | string
    updatedAt?: DateTimeFilter<"Store"> | Date | string
    owner?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    createdBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    hours?: StoreHoursListRelationFilter
    products?: ProductListRelationFilter
    reviews?: ReviewListRelationFilter
    savedBy?: SavedStoreListRelationFilter
    claims?: StoreClaimListRelationFilter
    photos?: StorePhotoListRelationFilter
  }, "id" | "slug">

  export type StoreOrderByWithAggregationInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    description?: SortOrder
    addressLine?: SortOrder
    city?: SortOrder
    postalCode?: SortOrder
    country?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    phone?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    ownerUserId?: SortOrderInput | SortOrder
    status?: SortOrder
    fairBadges?: SortOrder
    categories?: SortOrder
    coverImage?: SortOrderInput | SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StoreCountOrderByAggregateInput
    _avg?: StoreAvgOrderByAggregateInput
    _max?: StoreMaxOrderByAggregateInput
    _min?: StoreMinOrderByAggregateInput
    _sum?: StoreSumOrderByAggregateInput
  }

  export type StoreScalarWhereWithAggregatesInput = {
    AND?: StoreScalarWhereWithAggregatesInput | StoreScalarWhereWithAggregatesInput[]
    OR?: StoreScalarWhereWithAggregatesInput[]
    NOT?: StoreScalarWhereWithAggregatesInput | StoreScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Store"> | string
    slug?: StringWithAggregatesFilter<"Store"> | string
    name?: StringWithAggregatesFilter<"Store"> | string
    description?: StringWithAggregatesFilter<"Store"> | string
    addressLine?: StringWithAggregatesFilter<"Store"> | string
    city?: StringWithAggregatesFilter<"Store"> | string
    postalCode?: StringWithAggregatesFilter<"Store"> | string
    country?: StringWithAggregatesFilter<"Store"> | string
    latitude?: FloatWithAggregatesFilter<"Store"> | number
    longitude?: FloatWithAggregatesFilter<"Store"> | number
    phone?: StringNullableWithAggregatesFilter<"Store"> | string | null
    website?: StringNullableWithAggregatesFilter<"Store"> | string | null
    email?: StringNullableWithAggregatesFilter<"Store"> | string | null
    ownerUserId?: StringNullableWithAggregatesFilter<"Store"> | string | null
    status?: EnumStoreStatusWithAggregatesFilter<"Store"> | $Enums.StoreStatus
    fairBadges?: StringWithAggregatesFilter<"Store"> | string
    categories?: StringWithAggregatesFilter<"Store"> | string
    coverImage?: StringNullableWithAggregatesFilter<"Store"> | string | null
    createdById?: StringWithAggregatesFilter<"Store"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Store"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Store"> | Date | string
  }

  export type StoreHoursWhereInput = {
    AND?: StoreHoursWhereInput | StoreHoursWhereInput[]
    OR?: StoreHoursWhereInput[]
    NOT?: StoreHoursWhereInput | StoreHoursWhereInput[]
    id?: StringFilter<"StoreHours"> | string
    storeId?: StringFilter<"StoreHours"> | string
    dayOfWeek?: IntFilter<"StoreHours"> | number
    openTime?: StringFilter<"StoreHours"> | string
    closeTime?: StringFilter<"StoreHours"> | string
    isClosed?: BoolFilter<"StoreHours"> | boolean
    store?: XOR<StoreScalarRelationFilter, StoreWhereInput>
  }

  export type StoreHoursOrderByWithRelationInput = {
    id?: SortOrder
    storeId?: SortOrder
    dayOfWeek?: SortOrder
    openTime?: SortOrder
    closeTime?: SortOrder
    isClosed?: SortOrder
    store?: StoreOrderByWithRelationInput
  }

  export type StoreHoursWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    storeId_dayOfWeek?: StoreHoursStoreIdDayOfWeekCompoundUniqueInput
    AND?: StoreHoursWhereInput | StoreHoursWhereInput[]
    OR?: StoreHoursWhereInput[]
    NOT?: StoreHoursWhereInput | StoreHoursWhereInput[]
    storeId?: StringFilter<"StoreHours"> | string
    dayOfWeek?: IntFilter<"StoreHours"> | number
    openTime?: StringFilter<"StoreHours"> | string
    closeTime?: StringFilter<"StoreHours"> | string
    isClosed?: BoolFilter<"StoreHours"> | boolean
    store?: XOR<StoreScalarRelationFilter, StoreWhereInput>
  }, "id" | "storeId_dayOfWeek">

  export type StoreHoursOrderByWithAggregationInput = {
    id?: SortOrder
    storeId?: SortOrder
    dayOfWeek?: SortOrder
    openTime?: SortOrder
    closeTime?: SortOrder
    isClosed?: SortOrder
    _count?: StoreHoursCountOrderByAggregateInput
    _avg?: StoreHoursAvgOrderByAggregateInput
    _max?: StoreHoursMaxOrderByAggregateInput
    _min?: StoreHoursMinOrderByAggregateInput
    _sum?: StoreHoursSumOrderByAggregateInput
  }

  export type StoreHoursScalarWhereWithAggregatesInput = {
    AND?: StoreHoursScalarWhereWithAggregatesInput | StoreHoursScalarWhereWithAggregatesInput[]
    OR?: StoreHoursScalarWhereWithAggregatesInput[]
    NOT?: StoreHoursScalarWhereWithAggregatesInput | StoreHoursScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StoreHours"> | string
    storeId?: StringWithAggregatesFilter<"StoreHours"> | string
    dayOfWeek?: IntWithAggregatesFilter<"StoreHours"> | number
    openTime?: StringWithAggregatesFilter<"StoreHours"> | string
    closeTime?: StringWithAggregatesFilter<"StoreHours"> | string
    isClosed?: BoolWithAggregatesFilter<"StoreHours"> | boolean
  }

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    id?: StringFilter<"Product"> | string
    storeId?: StringFilter<"Product"> | string
    name?: StringFilter<"Product"> | string
    slug?: StringFilter<"Product"> | string
    description?: StringNullableFilter<"Product"> | string | null
    price?: FloatNullableFilter<"Product"> | number | null
    currency?: StringFilter<"Product"> | string
    category?: StringNullableFilter<"Product"> | string | null
    imageUrl?: StringNullableFilter<"Product"> | string | null
    inStock?: BoolFilter<"Product"> | boolean
    createdAt?: DateTimeFilter<"Product"> | Date | string
    store?: XOR<StoreScalarRelationFilter, StoreWhereInput>
    savedBy?: SavedProductListRelationFilter
  }

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder
    storeId?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    price?: SortOrderInput | SortOrder
    currency?: SortOrder
    category?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    inStock?: SortOrder
    createdAt?: SortOrder
    store?: StoreOrderByWithRelationInput
    savedBy?: SavedProductOrderByRelationAggregateInput
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    storeId_slug?: ProductStoreIdSlugCompoundUniqueInput
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    storeId?: StringFilter<"Product"> | string
    name?: StringFilter<"Product"> | string
    slug?: StringFilter<"Product"> | string
    description?: StringNullableFilter<"Product"> | string | null
    price?: FloatNullableFilter<"Product"> | number | null
    currency?: StringFilter<"Product"> | string
    category?: StringNullableFilter<"Product"> | string | null
    imageUrl?: StringNullableFilter<"Product"> | string | null
    inStock?: BoolFilter<"Product"> | boolean
    createdAt?: DateTimeFilter<"Product"> | Date | string
    store?: XOR<StoreScalarRelationFilter, StoreWhereInput>
    savedBy?: SavedProductListRelationFilter
  }, "id" | "storeId_slug">

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    storeId?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    price?: SortOrderInput | SortOrder
    currency?: SortOrder
    category?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    inStock?: SortOrder
    createdAt?: SortOrder
    _count?: ProductCountOrderByAggregateInput
    _avg?: ProductAvgOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
    _sum?: ProductSumOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Product"> | string
    storeId?: StringWithAggregatesFilter<"Product"> | string
    name?: StringWithAggregatesFilter<"Product"> | string
    slug?: StringWithAggregatesFilter<"Product"> | string
    description?: StringNullableWithAggregatesFilter<"Product"> | string | null
    price?: FloatNullableWithAggregatesFilter<"Product"> | number | null
    currency?: StringWithAggregatesFilter<"Product"> | string
    category?: StringNullableWithAggregatesFilter<"Product"> | string | null
    imageUrl?: StringNullableWithAggregatesFilter<"Product"> | string | null
    inStock?: BoolWithAggregatesFilter<"Product"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
  }

  export type ReviewWhereInput = {
    AND?: ReviewWhereInput | ReviewWhereInput[]
    OR?: ReviewWhereInput[]
    NOT?: ReviewWhereInput | ReviewWhereInput[]
    id?: StringFilter<"Review"> | string
    storeId?: StringFilter<"Review"> | string
    userId?: StringFilter<"Review"> | string
    rating?: IntFilter<"Review"> | number
    title?: StringNullableFilter<"Review"> | string | null
    body?: StringFilter<"Review"> | string
    ownerReply?: StringNullableFilter<"Review"> | string | null
    ownerReplyAt?: DateTimeNullableFilter<"Review"> | Date | string | null
    status?: EnumReviewStatusFilter<"Review"> | $Enums.ReviewStatus
    createdAt?: DateTimeFilter<"Review"> | Date | string
    store?: XOR<StoreScalarRelationFilter, StoreWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ReviewOrderByWithRelationInput = {
    id?: SortOrder
    storeId?: SortOrder
    userId?: SortOrder
    rating?: SortOrder
    title?: SortOrderInput | SortOrder
    body?: SortOrder
    ownerReply?: SortOrderInput | SortOrder
    ownerReplyAt?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    store?: StoreOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type ReviewWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    storeId_userId?: ReviewStoreIdUserIdCompoundUniqueInput
    AND?: ReviewWhereInput | ReviewWhereInput[]
    OR?: ReviewWhereInput[]
    NOT?: ReviewWhereInput | ReviewWhereInput[]
    storeId?: StringFilter<"Review"> | string
    userId?: StringFilter<"Review"> | string
    rating?: IntFilter<"Review"> | number
    title?: StringNullableFilter<"Review"> | string | null
    body?: StringFilter<"Review"> | string
    ownerReply?: StringNullableFilter<"Review"> | string | null
    ownerReplyAt?: DateTimeNullableFilter<"Review"> | Date | string | null
    status?: EnumReviewStatusFilter<"Review"> | $Enums.ReviewStatus
    createdAt?: DateTimeFilter<"Review"> | Date | string
    store?: XOR<StoreScalarRelationFilter, StoreWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "storeId_userId">

  export type ReviewOrderByWithAggregationInput = {
    id?: SortOrder
    storeId?: SortOrder
    userId?: SortOrder
    rating?: SortOrder
    title?: SortOrderInput | SortOrder
    body?: SortOrder
    ownerReply?: SortOrderInput | SortOrder
    ownerReplyAt?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: ReviewCountOrderByAggregateInput
    _avg?: ReviewAvgOrderByAggregateInput
    _max?: ReviewMaxOrderByAggregateInput
    _min?: ReviewMinOrderByAggregateInput
    _sum?: ReviewSumOrderByAggregateInput
  }

  export type ReviewScalarWhereWithAggregatesInput = {
    AND?: ReviewScalarWhereWithAggregatesInput | ReviewScalarWhereWithAggregatesInput[]
    OR?: ReviewScalarWhereWithAggregatesInput[]
    NOT?: ReviewScalarWhereWithAggregatesInput | ReviewScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Review"> | string
    storeId?: StringWithAggregatesFilter<"Review"> | string
    userId?: StringWithAggregatesFilter<"Review"> | string
    rating?: IntWithAggregatesFilter<"Review"> | number
    title?: StringNullableWithAggregatesFilter<"Review"> | string | null
    body?: StringWithAggregatesFilter<"Review"> | string
    ownerReply?: StringNullableWithAggregatesFilter<"Review"> | string | null
    ownerReplyAt?: DateTimeNullableWithAggregatesFilter<"Review"> | Date | string | null
    status?: EnumReviewStatusWithAggregatesFilter<"Review"> | $Enums.ReviewStatus
    createdAt?: DateTimeWithAggregatesFilter<"Review"> | Date | string
  }

  export type SavedStoreWhereInput = {
    AND?: SavedStoreWhereInput | SavedStoreWhereInput[]
    OR?: SavedStoreWhereInput[]
    NOT?: SavedStoreWhereInput | SavedStoreWhereInput[]
    userId?: StringFilter<"SavedStore"> | string
    storeId?: StringFilter<"SavedStore"> | string
    createdAt?: DateTimeFilter<"SavedStore"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    store?: XOR<StoreScalarRelationFilter, StoreWhereInput>
  }

  export type SavedStoreOrderByWithRelationInput = {
    userId?: SortOrder
    storeId?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    store?: StoreOrderByWithRelationInput
  }

  export type SavedStoreWhereUniqueInput = Prisma.AtLeast<{
    userId_storeId?: SavedStoreUserIdStoreIdCompoundUniqueInput
    AND?: SavedStoreWhereInput | SavedStoreWhereInput[]
    OR?: SavedStoreWhereInput[]
    NOT?: SavedStoreWhereInput | SavedStoreWhereInput[]
    userId?: StringFilter<"SavedStore"> | string
    storeId?: StringFilter<"SavedStore"> | string
    createdAt?: DateTimeFilter<"SavedStore"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    store?: XOR<StoreScalarRelationFilter, StoreWhereInput>
  }, "userId_storeId">

  export type SavedStoreOrderByWithAggregationInput = {
    userId?: SortOrder
    storeId?: SortOrder
    createdAt?: SortOrder
    _count?: SavedStoreCountOrderByAggregateInput
    _max?: SavedStoreMaxOrderByAggregateInput
    _min?: SavedStoreMinOrderByAggregateInput
  }

  export type SavedStoreScalarWhereWithAggregatesInput = {
    AND?: SavedStoreScalarWhereWithAggregatesInput | SavedStoreScalarWhereWithAggregatesInput[]
    OR?: SavedStoreScalarWhereWithAggregatesInput[]
    NOT?: SavedStoreScalarWhereWithAggregatesInput | SavedStoreScalarWhereWithAggregatesInput[]
    userId?: StringWithAggregatesFilter<"SavedStore"> | string
    storeId?: StringWithAggregatesFilter<"SavedStore"> | string
    createdAt?: DateTimeWithAggregatesFilter<"SavedStore"> | Date | string
  }

  export type SavedProductWhereInput = {
    AND?: SavedProductWhereInput | SavedProductWhereInput[]
    OR?: SavedProductWhereInput[]
    NOT?: SavedProductWhereInput | SavedProductWhereInput[]
    userId?: StringFilter<"SavedProduct"> | string
    productId?: StringFilter<"SavedProduct"> | string
    createdAt?: DateTimeFilter<"SavedProduct"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }

  export type SavedProductOrderByWithRelationInput = {
    userId?: SortOrder
    productId?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    product?: ProductOrderByWithRelationInput
  }

  export type SavedProductWhereUniqueInput = Prisma.AtLeast<{
    userId_productId?: SavedProductUserIdProductIdCompoundUniqueInput
    AND?: SavedProductWhereInput | SavedProductWhereInput[]
    OR?: SavedProductWhereInput[]
    NOT?: SavedProductWhereInput | SavedProductWhereInput[]
    userId?: StringFilter<"SavedProduct"> | string
    productId?: StringFilter<"SavedProduct"> | string
    createdAt?: DateTimeFilter<"SavedProduct"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }, "userId_productId">

  export type SavedProductOrderByWithAggregationInput = {
    userId?: SortOrder
    productId?: SortOrder
    createdAt?: SortOrder
    _count?: SavedProductCountOrderByAggregateInput
    _max?: SavedProductMaxOrderByAggregateInput
    _min?: SavedProductMinOrderByAggregateInput
  }

  export type SavedProductScalarWhereWithAggregatesInput = {
    AND?: SavedProductScalarWhereWithAggregatesInput | SavedProductScalarWhereWithAggregatesInput[]
    OR?: SavedProductScalarWhereWithAggregatesInput[]
    NOT?: SavedProductScalarWhereWithAggregatesInput | SavedProductScalarWhereWithAggregatesInput[]
    userId?: StringWithAggregatesFilter<"SavedProduct"> | string
    productId?: StringWithAggregatesFilter<"SavedProduct"> | string
    createdAt?: DateTimeWithAggregatesFilter<"SavedProduct"> | Date | string
  }

  export type StoreClaimWhereInput = {
    AND?: StoreClaimWhereInput | StoreClaimWhereInput[]
    OR?: StoreClaimWhereInput[]
    NOT?: StoreClaimWhereInput | StoreClaimWhereInput[]
    id?: StringFilter<"StoreClaim"> | string
    storeId?: StringFilter<"StoreClaim"> | string
    userId?: StringFilter<"StoreClaim"> | string
    proofText?: StringFilter<"StoreClaim"> | string
    proofDocs?: StringNullableFilter<"StoreClaim"> | string | null
    status?: EnumClaimStatusFilter<"StoreClaim"> | $Enums.ClaimStatus
    reviewedBy?: StringNullableFilter<"StoreClaim"> | string | null
    createdAt?: DateTimeFilter<"StoreClaim"> | Date | string
    store?: XOR<StoreScalarRelationFilter, StoreWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    reviewer?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type StoreClaimOrderByWithRelationInput = {
    id?: SortOrder
    storeId?: SortOrder
    userId?: SortOrder
    proofText?: SortOrder
    proofDocs?: SortOrderInput | SortOrder
    status?: SortOrder
    reviewedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    store?: StoreOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    reviewer?: UserOrderByWithRelationInput
  }

  export type StoreClaimWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: StoreClaimWhereInput | StoreClaimWhereInput[]
    OR?: StoreClaimWhereInput[]
    NOT?: StoreClaimWhereInput | StoreClaimWhereInput[]
    storeId?: StringFilter<"StoreClaim"> | string
    userId?: StringFilter<"StoreClaim"> | string
    proofText?: StringFilter<"StoreClaim"> | string
    proofDocs?: StringNullableFilter<"StoreClaim"> | string | null
    status?: EnumClaimStatusFilter<"StoreClaim"> | $Enums.ClaimStatus
    reviewedBy?: StringNullableFilter<"StoreClaim"> | string | null
    createdAt?: DateTimeFilter<"StoreClaim"> | Date | string
    store?: XOR<StoreScalarRelationFilter, StoreWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    reviewer?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type StoreClaimOrderByWithAggregationInput = {
    id?: SortOrder
    storeId?: SortOrder
    userId?: SortOrder
    proofText?: SortOrder
    proofDocs?: SortOrderInput | SortOrder
    status?: SortOrder
    reviewedBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: StoreClaimCountOrderByAggregateInput
    _max?: StoreClaimMaxOrderByAggregateInput
    _min?: StoreClaimMinOrderByAggregateInput
  }

  export type StoreClaimScalarWhereWithAggregatesInput = {
    AND?: StoreClaimScalarWhereWithAggregatesInput | StoreClaimScalarWhereWithAggregatesInput[]
    OR?: StoreClaimScalarWhereWithAggregatesInput[]
    NOT?: StoreClaimScalarWhereWithAggregatesInput | StoreClaimScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StoreClaim"> | string
    storeId?: StringWithAggregatesFilter<"StoreClaim"> | string
    userId?: StringWithAggregatesFilter<"StoreClaim"> | string
    proofText?: StringWithAggregatesFilter<"StoreClaim"> | string
    proofDocs?: StringNullableWithAggregatesFilter<"StoreClaim"> | string | null
    status?: EnumClaimStatusWithAggregatesFilter<"StoreClaim"> | $Enums.ClaimStatus
    reviewedBy?: StringNullableWithAggregatesFilter<"StoreClaim"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"StoreClaim"> | Date | string
  }

  export type StorePhotoWhereInput = {
    AND?: StorePhotoWhereInput | StorePhotoWhereInput[]
    OR?: StorePhotoWhereInput[]
    NOT?: StorePhotoWhereInput | StorePhotoWhereInput[]
    id?: StringFilter<"StorePhoto"> | string
    storeId?: StringFilter<"StorePhoto"> | string
    url?: StringFilter<"StorePhoto"> | string
    caption?: StringNullableFilter<"StorePhoto"> | string | null
    sortOrder?: IntFilter<"StorePhoto"> | number
    store?: XOR<StoreScalarRelationFilter, StoreWhereInput>
  }

  export type StorePhotoOrderByWithRelationInput = {
    id?: SortOrder
    storeId?: SortOrder
    url?: SortOrder
    caption?: SortOrderInput | SortOrder
    sortOrder?: SortOrder
    store?: StoreOrderByWithRelationInput
  }

  export type StorePhotoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: StorePhotoWhereInput | StorePhotoWhereInput[]
    OR?: StorePhotoWhereInput[]
    NOT?: StorePhotoWhereInput | StorePhotoWhereInput[]
    storeId?: StringFilter<"StorePhoto"> | string
    url?: StringFilter<"StorePhoto"> | string
    caption?: StringNullableFilter<"StorePhoto"> | string | null
    sortOrder?: IntFilter<"StorePhoto"> | number
    store?: XOR<StoreScalarRelationFilter, StoreWhereInput>
  }, "id">

  export type StorePhotoOrderByWithAggregationInput = {
    id?: SortOrder
    storeId?: SortOrder
    url?: SortOrder
    caption?: SortOrderInput | SortOrder
    sortOrder?: SortOrder
    _count?: StorePhotoCountOrderByAggregateInput
    _avg?: StorePhotoAvgOrderByAggregateInput
    _max?: StorePhotoMaxOrderByAggregateInput
    _min?: StorePhotoMinOrderByAggregateInput
    _sum?: StorePhotoSumOrderByAggregateInput
  }

  export type StorePhotoScalarWhereWithAggregatesInput = {
    AND?: StorePhotoScalarWhereWithAggregatesInput | StorePhotoScalarWhereWithAggregatesInput[]
    OR?: StorePhotoScalarWhereWithAggregatesInput[]
    NOT?: StorePhotoScalarWhereWithAggregatesInput | StorePhotoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StorePhoto"> | string
    storeId?: StringWithAggregatesFilter<"StorePhoto"> | string
    url?: StringWithAggregatesFilter<"StorePhoto"> | string
    caption?: StringNullableWithAggregatesFilter<"StorePhoto"> | string | null
    sortOrder?: IntWithAggregatesFilter<"StorePhoto"> | number
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    storesCreated?: StoreCreateNestedManyWithoutCreatedByInput
    storesOwned?: StoreCreateNestedManyWithoutOwnerInput
    reviews?: ReviewCreateNestedManyWithoutUserInput
    savedStores?: SavedStoreCreateNestedManyWithoutUserInput
    savedProducts?: SavedProductCreateNestedManyWithoutUserInput
    claims?: StoreClaimCreateNestedManyWithoutUserInput
    claimsReviewed?: StoreClaimCreateNestedManyWithoutReviewerInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    storesCreated?: StoreUncheckedCreateNestedManyWithoutCreatedByInput
    storesOwned?: StoreUncheckedCreateNestedManyWithoutOwnerInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutUserInput
    savedStores?: SavedStoreUncheckedCreateNestedManyWithoutUserInput
    savedProducts?: SavedProductUncheckedCreateNestedManyWithoutUserInput
    claims?: StoreClaimUncheckedCreateNestedManyWithoutUserInput
    claimsReviewed?: StoreClaimUncheckedCreateNestedManyWithoutReviewerInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    storesCreated?: StoreUpdateManyWithoutCreatedByNestedInput
    storesOwned?: StoreUpdateManyWithoutOwnerNestedInput
    reviews?: ReviewUpdateManyWithoutUserNestedInput
    savedStores?: SavedStoreUpdateManyWithoutUserNestedInput
    savedProducts?: SavedProductUpdateManyWithoutUserNestedInput
    claims?: StoreClaimUpdateManyWithoutUserNestedInput
    claimsReviewed?: StoreClaimUpdateManyWithoutReviewerNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    storesCreated?: StoreUncheckedUpdateManyWithoutCreatedByNestedInput
    storesOwned?: StoreUncheckedUpdateManyWithoutOwnerNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutUserNestedInput
    savedStores?: SavedStoreUncheckedUpdateManyWithoutUserNestedInput
    savedProducts?: SavedProductUncheckedUpdateManyWithoutUserNestedInput
    claims?: StoreClaimUncheckedUpdateManyWithoutUserNestedInput
    claimsReviewed?: StoreClaimUncheckedUpdateManyWithoutReviewerNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StoreCreateInput = {
    id?: string
    slug: string
    name: string
    description: string
    addressLine: string
    city: string
    postalCode: string
    country?: string
    latitude: number
    longitude: number
    phone?: string | null
    website?: string | null
    email?: string | null
    status?: $Enums.StoreStatus
    fairBadges?: string
    categories?: string
    coverImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    owner?: UserCreateNestedOneWithoutStoresOwnedInput
    createdBy: UserCreateNestedOneWithoutStoresCreatedInput
    hours?: StoreHoursCreateNestedManyWithoutStoreInput
    products?: ProductCreateNestedManyWithoutStoreInput
    reviews?: ReviewCreateNestedManyWithoutStoreInput
    savedBy?: SavedStoreCreateNestedManyWithoutStoreInput
    claims?: StoreClaimCreateNestedManyWithoutStoreInput
    photos?: StorePhotoCreateNestedManyWithoutStoreInput
  }

  export type StoreUncheckedCreateInput = {
    id?: string
    slug: string
    name: string
    description: string
    addressLine: string
    city: string
    postalCode: string
    country?: string
    latitude: number
    longitude: number
    phone?: string | null
    website?: string | null
    email?: string | null
    ownerUserId?: string | null
    status?: $Enums.StoreStatus
    fairBadges?: string
    categories?: string
    coverImage?: string | null
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
    hours?: StoreHoursUncheckedCreateNestedManyWithoutStoreInput
    products?: ProductUncheckedCreateNestedManyWithoutStoreInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutStoreInput
    savedBy?: SavedStoreUncheckedCreateNestedManyWithoutStoreInput
    claims?: StoreClaimUncheckedCreateNestedManyWithoutStoreInput
    photos?: StorePhotoUncheckedCreateNestedManyWithoutStoreInput
  }

  export type StoreUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    addressLine?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStoreStatusFieldUpdateOperationsInput | $Enums.StoreStatus
    fairBadges?: StringFieldUpdateOperationsInput | string
    categories?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneWithoutStoresOwnedNestedInput
    createdBy?: UserUpdateOneRequiredWithoutStoresCreatedNestedInput
    hours?: StoreHoursUpdateManyWithoutStoreNestedInput
    products?: ProductUpdateManyWithoutStoreNestedInput
    reviews?: ReviewUpdateManyWithoutStoreNestedInput
    savedBy?: SavedStoreUpdateManyWithoutStoreNestedInput
    claims?: StoreClaimUpdateManyWithoutStoreNestedInput
    photos?: StorePhotoUpdateManyWithoutStoreNestedInput
  }

  export type StoreUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    addressLine?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    ownerUserId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStoreStatusFieldUpdateOperationsInput | $Enums.StoreStatus
    fairBadges?: StringFieldUpdateOperationsInput | string
    categories?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hours?: StoreHoursUncheckedUpdateManyWithoutStoreNestedInput
    products?: ProductUncheckedUpdateManyWithoutStoreNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutStoreNestedInput
    savedBy?: SavedStoreUncheckedUpdateManyWithoutStoreNestedInput
    claims?: StoreClaimUncheckedUpdateManyWithoutStoreNestedInput
    photos?: StorePhotoUncheckedUpdateManyWithoutStoreNestedInput
  }

  export type StoreCreateManyInput = {
    id?: string
    slug: string
    name: string
    description: string
    addressLine: string
    city: string
    postalCode: string
    country?: string
    latitude: number
    longitude: number
    phone?: string | null
    website?: string | null
    email?: string | null
    ownerUserId?: string | null
    status?: $Enums.StoreStatus
    fairBadges?: string
    categories?: string
    coverImage?: string | null
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StoreUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    addressLine?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStoreStatusFieldUpdateOperationsInput | $Enums.StoreStatus
    fairBadges?: StringFieldUpdateOperationsInput | string
    categories?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StoreUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    addressLine?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    ownerUserId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStoreStatusFieldUpdateOperationsInput | $Enums.StoreStatus
    fairBadges?: StringFieldUpdateOperationsInput | string
    categories?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StoreHoursCreateInput = {
    id?: string
    dayOfWeek: number
    openTime: string
    closeTime: string
    isClosed?: boolean
    store: StoreCreateNestedOneWithoutHoursInput
  }

  export type StoreHoursUncheckedCreateInput = {
    id?: string
    storeId: string
    dayOfWeek: number
    openTime: string
    closeTime: string
    isClosed?: boolean
  }

  export type StoreHoursUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    openTime?: StringFieldUpdateOperationsInput | string
    closeTime?: StringFieldUpdateOperationsInput | string
    isClosed?: BoolFieldUpdateOperationsInput | boolean
    store?: StoreUpdateOneRequiredWithoutHoursNestedInput
  }

  export type StoreHoursUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    storeId?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    openTime?: StringFieldUpdateOperationsInput | string
    closeTime?: StringFieldUpdateOperationsInput | string
    isClosed?: BoolFieldUpdateOperationsInput | boolean
  }

  export type StoreHoursCreateManyInput = {
    id?: string
    storeId: string
    dayOfWeek: number
    openTime: string
    closeTime: string
    isClosed?: boolean
  }

  export type StoreHoursUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    openTime?: StringFieldUpdateOperationsInput | string
    closeTime?: StringFieldUpdateOperationsInput | string
    isClosed?: BoolFieldUpdateOperationsInput | boolean
  }

  export type StoreHoursUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    storeId?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    openTime?: StringFieldUpdateOperationsInput | string
    closeTime?: StringFieldUpdateOperationsInput | string
    isClosed?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProductCreateInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    price?: number | null
    currency?: string
    category?: string | null
    imageUrl?: string | null
    inStock?: boolean
    createdAt?: Date | string
    store: StoreCreateNestedOneWithoutProductsInput
    savedBy?: SavedProductCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateInput = {
    id?: string
    storeId: string
    name: string
    slug: string
    description?: string | null
    price?: number | null
    currency?: string
    category?: string | null
    imageUrl?: string | null
    inStock?: boolean
    createdAt?: Date | string
    savedBy?: SavedProductUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    inStock?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    store?: StoreUpdateOneRequiredWithoutProductsNestedInput
    savedBy?: SavedProductUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    storeId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    inStock?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    savedBy?: SavedProductUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateManyInput = {
    id?: string
    storeId: string
    name: string
    slug: string
    description?: string | null
    price?: number | null
    currency?: string
    category?: string | null
    imageUrl?: string | null
    inStock?: boolean
    createdAt?: Date | string
  }

  export type ProductUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    inStock?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    storeId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    inStock?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewCreateInput = {
    id?: string
    rating: number
    title?: string | null
    body: string
    ownerReply?: string | null
    ownerReplyAt?: Date | string | null
    status?: $Enums.ReviewStatus
    createdAt?: Date | string
    store: StoreCreateNestedOneWithoutReviewsInput
    user: UserCreateNestedOneWithoutReviewsInput
  }

  export type ReviewUncheckedCreateInput = {
    id?: string
    storeId: string
    userId: string
    rating: number
    title?: string | null
    body: string
    ownerReply?: string | null
    ownerReplyAt?: Date | string | null
    status?: $Enums.ReviewStatus
    createdAt?: Date | string
  }

  export type ReviewUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    body?: StringFieldUpdateOperationsInput | string
    ownerReply?: NullableStringFieldUpdateOperationsInput | string | null
    ownerReplyAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    store?: StoreUpdateOneRequiredWithoutReviewsNestedInput
    user?: UserUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ReviewUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    storeId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    body?: StringFieldUpdateOperationsInput | string
    ownerReply?: NullableStringFieldUpdateOperationsInput | string | null
    ownerReplyAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewCreateManyInput = {
    id?: string
    storeId: string
    userId: string
    rating: number
    title?: string | null
    body: string
    ownerReply?: string | null
    ownerReplyAt?: Date | string | null
    status?: $Enums.ReviewStatus
    createdAt?: Date | string
  }

  export type ReviewUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    body?: StringFieldUpdateOperationsInput | string
    ownerReply?: NullableStringFieldUpdateOperationsInput | string | null
    ownerReplyAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    storeId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    body?: StringFieldUpdateOperationsInput | string
    ownerReply?: NullableStringFieldUpdateOperationsInput | string | null
    ownerReplyAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedStoreCreateInput = {
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSavedStoresInput
    store: StoreCreateNestedOneWithoutSavedByInput
  }

  export type SavedStoreUncheckedCreateInput = {
    userId: string
    storeId: string
    createdAt?: Date | string
  }

  export type SavedStoreUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSavedStoresNestedInput
    store?: StoreUpdateOneRequiredWithoutSavedByNestedInput
  }

  export type SavedStoreUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    storeId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedStoreCreateManyInput = {
    userId: string
    storeId: string
    createdAt?: Date | string
  }

  export type SavedStoreUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedStoreUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    storeId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedProductCreateInput = {
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSavedProductsInput
    product: ProductCreateNestedOneWithoutSavedByInput
  }

  export type SavedProductUncheckedCreateInput = {
    userId: string
    productId: string
    createdAt?: Date | string
  }

  export type SavedProductUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSavedProductsNestedInput
    product?: ProductUpdateOneRequiredWithoutSavedByNestedInput
  }

  export type SavedProductUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedProductCreateManyInput = {
    userId: string
    productId: string
    createdAt?: Date | string
  }

  export type SavedProductUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedProductUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StoreClaimCreateInput = {
    id?: string
    proofText: string
    proofDocs?: string | null
    status?: $Enums.ClaimStatus
    createdAt?: Date | string
    store: StoreCreateNestedOneWithoutClaimsInput
    user: UserCreateNestedOneWithoutClaimsInput
    reviewer?: UserCreateNestedOneWithoutClaimsReviewedInput
  }

  export type StoreClaimUncheckedCreateInput = {
    id?: string
    storeId: string
    userId: string
    proofText: string
    proofDocs?: string | null
    status?: $Enums.ClaimStatus
    reviewedBy?: string | null
    createdAt?: Date | string
  }

  export type StoreClaimUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    proofText?: StringFieldUpdateOperationsInput | string
    proofDocs?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumClaimStatusFieldUpdateOperationsInput | $Enums.ClaimStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    store?: StoreUpdateOneRequiredWithoutClaimsNestedInput
    user?: UserUpdateOneRequiredWithoutClaimsNestedInput
    reviewer?: UserUpdateOneWithoutClaimsReviewedNestedInput
  }

  export type StoreClaimUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    storeId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    proofText?: StringFieldUpdateOperationsInput | string
    proofDocs?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumClaimStatusFieldUpdateOperationsInput | $Enums.ClaimStatus
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StoreClaimCreateManyInput = {
    id?: string
    storeId: string
    userId: string
    proofText: string
    proofDocs?: string | null
    status?: $Enums.ClaimStatus
    reviewedBy?: string | null
    createdAt?: Date | string
  }

  export type StoreClaimUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    proofText?: StringFieldUpdateOperationsInput | string
    proofDocs?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumClaimStatusFieldUpdateOperationsInput | $Enums.ClaimStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StoreClaimUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    storeId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    proofText?: StringFieldUpdateOperationsInput | string
    proofDocs?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumClaimStatusFieldUpdateOperationsInput | $Enums.ClaimStatus
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StorePhotoCreateInput = {
    id?: string
    url: string
    caption?: string | null
    sortOrder?: number
    store: StoreCreateNestedOneWithoutPhotosInput
  }

  export type StorePhotoUncheckedCreateInput = {
    id?: string
    storeId: string
    url: string
    caption?: string | null
    sortOrder?: number
  }

  export type StorePhotoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
    store?: StoreUpdateOneRequiredWithoutPhotosNestedInput
  }

  export type StorePhotoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    storeId?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type StorePhotoCreateManyInput = {
    id?: string
    storeId: string
    url: string
    caption?: string | null
    sortOrder?: number
  }

  export type StorePhotoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type StorePhotoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    storeId?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StoreListRelationFilter = {
    every?: StoreWhereInput
    some?: StoreWhereInput
    none?: StoreWhereInput
  }

  export type ReviewListRelationFilter = {
    every?: ReviewWhereInput
    some?: ReviewWhereInput
    none?: ReviewWhereInput
  }

  export type SavedStoreListRelationFilter = {
    every?: SavedStoreWhereInput
    some?: SavedStoreWhereInput
    none?: SavedStoreWhereInput
  }

  export type SavedProductListRelationFilter = {
    every?: SavedProductWhereInput
    some?: SavedProductWhereInput
    none?: SavedProductWhereInput
  }

  export type StoreClaimListRelationFilter = {
    every?: StoreClaimWhereInput
    some?: StoreClaimWhereInput
    none?: StoreClaimWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type StoreOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReviewOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SavedStoreOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SavedProductOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StoreClaimOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    avatarUrl?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type EnumStoreStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.StoreStatus | EnumStoreStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StoreStatus[] | ListEnumStoreStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StoreStatus[] | ListEnumStoreStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStoreStatusFilter<$PrismaModel> | $Enums.StoreStatus
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type StoreHoursListRelationFilter = {
    every?: StoreHoursWhereInput
    some?: StoreHoursWhereInput
    none?: StoreHoursWhereInput
  }

  export type ProductListRelationFilter = {
    every?: ProductWhereInput
    some?: ProductWhereInput
    none?: ProductWhereInput
  }

  export type StorePhotoListRelationFilter = {
    every?: StorePhotoWhereInput
    some?: StorePhotoWhereInput
    none?: StorePhotoWhereInput
  }

  export type StoreHoursOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StorePhotoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StoreCountOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    description?: SortOrder
    addressLine?: SortOrder
    city?: SortOrder
    postalCode?: SortOrder
    country?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    phone?: SortOrder
    website?: SortOrder
    email?: SortOrder
    ownerUserId?: SortOrder
    status?: SortOrder
    fairBadges?: SortOrder
    categories?: SortOrder
    coverImage?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StoreAvgOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type StoreMaxOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    description?: SortOrder
    addressLine?: SortOrder
    city?: SortOrder
    postalCode?: SortOrder
    country?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    phone?: SortOrder
    website?: SortOrder
    email?: SortOrder
    ownerUserId?: SortOrder
    status?: SortOrder
    fairBadges?: SortOrder
    categories?: SortOrder
    coverImage?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StoreMinOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    description?: SortOrder
    addressLine?: SortOrder
    city?: SortOrder
    postalCode?: SortOrder
    country?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    phone?: SortOrder
    website?: SortOrder
    email?: SortOrder
    ownerUserId?: SortOrder
    status?: SortOrder
    fairBadges?: SortOrder
    categories?: SortOrder
    coverImage?: SortOrder
    createdById?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StoreSumOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type EnumStoreStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StoreStatus | EnumStoreStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StoreStatus[] | ListEnumStoreStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StoreStatus[] | ListEnumStoreStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStoreStatusWithAggregatesFilter<$PrismaModel> | $Enums.StoreStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStoreStatusFilter<$PrismaModel>
    _max?: NestedEnumStoreStatusFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StoreScalarRelationFilter = {
    is?: StoreWhereInput
    isNot?: StoreWhereInput
  }

  export type StoreHoursStoreIdDayOfWeekCompoundUniqueInput = {
    storeId: string
    dayOfWeek: number
  }

  export type StoreHoursCountOrderByAggregateInput = {
    id?: SortOrder
    storeId?: SortOrder
    dayOfWeek?: SortOrder
    openTime?: SortOrder
    closeTime?: SortOrder
    isClosed?: SortOrder
  }

  export type StoreHoursAvgOrderByAggregateInput = {
    dayOfWeek?: SortOrder
  }

  export type StoreHoursMaxOrderByAggregateInput = {
    id?: SortOrder
    storeId?: SortOrder
    dayOfWeek?: SortOrder
    openTime?: SortOrder
    closeTime?: SortOrder
    isClosed?: SortOrder
  }

  export type StoreHoursMinOrderByAggregateInput = {
    id?: SortOrder
    storeId?: SortOrder
    dayOfWeek?: SortOrder
    openTime?: SortOrder
    closeTime?: SortOrder
    isClosed?: SortOrder
  }

  export type StoreHoursSumOrderByAggregateInput = {
    dayOfWeek?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type ProductStoreIdSlugCompoundUniqueInput = {
    storeId: string
    slug: string
  }

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    storeId?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    price?: SortOrder
    currency?: SortOrder
    category?: SortOrder
    imageUrl?: SortOrder
    inStock?: SortOrder
    createdAt?: SortOrder
  }

  export type ProductAvgOrderByAggregateInput = {
    price?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    storeId?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    price?: SortOrder
    currency?: SortOrder
    category?: SortOrder
    imageUrl?: SortOrder
    inStock?: SortOrder
    createdAt?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    storeId?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    price?: SortOrder
    currency?: SortOrder
    category?: SortOrder
    imageUrl?: SortOrder
    inStock?: SortOrder
    createdAt?: SortOrder
  }

  export type ProductSumOrderByAggregateInput = {
    price?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EnumReviewStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReviewStatus | EnumReviewStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReviewStatus[] | ListEnumReviewStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReviewStatus[] | ListEnumReviewStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReviewStatusFilter<$PrismaModel> | $Enums.ReviewStatus
  }

  export type ReviewStoreIdUserIdCompoundUniqueInput = {
    storeId: string
    userId: string
  }

  export type ReviewCountOrderByAggregateInput = {
    id?: SortOrder
    storeId?: SortOrder
    userId?: SortOrder
    rating?: SortOrder
    title?: SortOrder
    body?: SortOrder
    ownerReply?: SortOrder
    ownerReplyAt?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type ReviewAvgOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type ReviewMaxOrderByAggregateInput = {
    id?: SortOrder
    storeId?: SortOrder
    userId?: SortOrder
    rating?: SortOrder
    title?: SortOrder
    body?: SortOrder
    ownerReply?: SortOrder
    ownerReplyAt?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type ReviewMinOrderByAggregateInput = {
    id?: SortOrder
    storeId?: SortOrder
    userId?: SortOrder
    rating?: SortOrder
    title?: SortOrder
    body?: SortOrder
    ownerReply?: SortOrder
    ownerReplyAt?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type ReviewSumOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumReviewStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReviewStatus | EnumReviewStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReviewStatus[] | ListEnumReviewStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReviewStatus[] | ListEnumReviewStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReviewStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReviewStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReviewStatusFilter<$PrismaModel>
    _max?: NestedEnumReviewStatusFilter<$PrismaModel>
  }

  export type SavedStoreUserIdStoreIdCompoundUniqueInput = {
    userId: string
    storeId: string
  }

  export type SavedStoreCountOrderByAggregateInput = {
    userId?: SortOrder
    storeId?: SortOrder
    createdAt?: SortOrder
  }

  export type SavedStoreMaxOrderByAggregateInput = {
    userId?: SortOrder
    storeId?: SortOrder
    createdAt?: SortOrder
  }

  export type SavedStoreMinOrderByAggregateInput = {
    userId?: SortOrder
    storeId?: SortOrder
    createdAt?: SortOrder
  }

  export type ProductScalarRelationFilter = {
    is?: ProductWhereInput
    isNot?: ProductWhereInput
  }

  export type SavedProductUserIdProductIdCompoundUniqueInput = {
    userId: string
    productId: string
  }

  export type SavedProductCountOrderByAggregateInput = {
    userId?: SortOrder
    productId?: SortOrder
    createdAt?: SortOrder
  }

  export type SavedProductMaxOrderByAggregateInput = {
    userId?: SortOrder
    productId?: SortOrder
    createdAt?: SortOrder
  }

  export type SavedProductMinOrderByAggregateInput = {
    userId?: SortOrder
    productId?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumClaimStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ClaimStatus | EnumClaimStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ClaimStatus[] | ListEnumClaimStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ClaimStatus[] | ListEnumClaimStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumClaimStatusFilter<$PrismaModel> | $Enums.ClaimStatus
  }

  export type StoreClaimCountOrderByAggregateInput = {
    id?: SortOrder
    storeId?: SortOrder
    userId?: SortOrder
    proofText?: SortOrder
    proofDocs?: SortOrder
    status?: SortOrder
    reviewedBy?: SortOrder
    createdAt?: SortOrder
  }

  export type StoreClaimMaxOrderByAggregateInput = {
    id?: SortOrder
    storeId?: SortOrder
    userId?: SortOrder
    proofText?: SortOrder
    proofDocs?: SortOrder
    status?: SortOrder
    reviewedBy?: SortOrder
    createdAt?: SortOrder
  }

  export type StoreClaimMinOrderByAggregateInput = {
    id?: SortOrder
    storeId?: SortOrder
    userId?: SortOrder
    proofText?: SortOrder
    proofDocs?: SortOrder
    status?: SortOrder
    reviewedBy?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumClaimStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ClaimStatus | EnumClaimStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ClaimStatus[] | ListEnumClaimStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ClaimStatus[] | ListEnumClaimStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumClaimStatusWithAggregatesFilter<$PrismaModel> | $Enums.ClaimStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumClaimStatusFilter<$PrismaModel>
    _max?: NestedEnumClaimStatusFilter<$PrismaModel>
  }

  export type StorePhotoCountOrderByAggregateInput = {
    id?: SortOrder
    storeId?: SortOrder
    url?: SortOrder
    caption?: SortOrder
    sortOrder?: SortOrder
  }

  export type StorePhotoAvgOrderByAggregateInput = {
    sortOrder?: SortOrder
  }

  export type StorePhotoMaxOrderByAggregateInput = {
    id?: SortOrder
    storeId?: SortOrder
    url?: SortOrder
    caption?: SortOrder
    sortOrder?: SortOrder
  }

  export type StorePhotoMinOrderByAggregateInput = {
    id?: SortOrder
    storeId?: SortOrder
    url?: SortOrder
    caption?: SortOrder
    sortOrder?: SortOrder
  }

  export type StorePhotoSumOrderByAggregateInput = {
    sortOrder?: SortOrder
  }

  export type StoreCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<StoreCreateWithoutCreatedByInput, StoreUncheckedCreateWithoutCreatedByInput> | StoreCreateWithoutCreatedByInput[] | StoreUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: StoreCreateOrConnectWithoutCreatedByInput | StoreCreateOrConnectWithoutCreatedByInput[]
    createMany?: StoreCreateManyCreatedByInputEnvelope
    connect?: StoreWhereUniqueInput | StoreWhereUniqueInput[]
  }

  export type StoreCreateNestedManyWithoutOwnerInput = {
    create?: XOR<StoreCreateWithoutOwnerInput, StoreUncheckedCreateWithoutOwnerInput> | StoreCreateWithoutOwnerInput[] | StoreUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: StoreCreateOrConnectWithoutOwnerInput | StoreCreateOrConnectWithoutOwnerInput[]
    createMany?: StoreCreateManyOwnerInputEnvelope
    connect?: StoreWhereUniqueInput | StoreWhereUniqueInput[]
  }

  export type ReviewCreateNestedManyWithoutUserInput = {
    create?: XOR<ReviewCreateWithoutUserInput, ReviewUncheckedCreateWithoutUserInput> | ReviewCreateWithoutUserInput[] | ReviewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutUserInput | ReviewCreateOrConnectWithoutUserInput[]
    createMany?: ReviewCreateManyUserInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type SavedStoreCreateNestedManyWithoutUserInput = {
    create?: XOR<SavedStoreCreateWithoutUserInput, SavedStoreUncheckedCreateWithoutUserInput> | SavedStoreCreateWithoutUserInput[] | SavedStoreUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SavedStoreCreateOrConnectWithoutUserInput | SavedStoreCreateOrConnectWithoutUserInput[]
    createMany?: SavedStoreCreateManyUserInputEnvelope
    connect?: SavedStoreWhereUniqueInput | SavedStoreWhereUniqueInput[]
  }

  export type SavedProductCreateNestedManyWithoutUserInput = {
    create?: XOR<SavedProductCreateWithoutUserInput, SavedProductUncheckedCreateWithoutUserInput> | SavedProductCreateWithoutUserInput[] | SavedProductUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SavedProductCreateOrConnectWithoutUserInput | SavedProductCreateOrConnectWithoutUserInput[]
    createMany?: SavedProductCreateManyUserInputEnvelope
    connect?: SavedProductWhereUniqueInput | SavedProductWhereUniqueInput[]
  }

  export type StoreClaimCreateNestedManyWithoutUserInput = {
    create?: XOR<StoreClaimCreateWithoutUserInput, StoreClaimUncheckedCreateWithoutUserInput> | StoreClaimCreateWithoutUserInput[] | StoreClaimUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StoreClaimCreateOrConnectWithoutUserInput | StoreClaimCreateOrConnectWithoutUserInput[]
    createMany?: StoreClaimCreateManyUserInputEnvelope
    connect?: StoreClaimWhereUniqueInput | StoreClaimWhereUniqueInput[]
  }

  export type StoreClaimCreateNestedManyWithoutReviewerInput = {
    create?: XOR<StoreClaimCreateWithoutReviewerInput, StoreClaimUncheckedCreateWithoutReviewerInput> | StoreClaimCreateWithoutReviewerInput[] | StoreClaimUncheckedCreateWithoutReviewerInput[]
    connectOrCreate?: StoreClaimCreateOrConnectWithoutReviewerInput | StoreClaimCreateOrConnectWithoutReviewerInput[]
    createMany?: StoreClaimCreateManyReviewerInputEnvelope
    connect?: StoreClaimWhereUniqueInput | StoreClaimWhereUniqueInput[]
  }

  export type StoreUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<StoreCreateWithoutCreatedByInput, StoreUncheckedCreateWithoutCreatedByInput> | StoreCreateWithoutCreatedByInput[] | StoreUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: StoreCreateOrConnectWithoutCreatedByInput | StoreCreateOrConnectWithoutCreatedByInput[]
    createMany?: StoreCreateManyCreatedByInputEnvelope
    connect?: StoreWhereUniqueInput | StoreWhereUniqueInput[]
  }

  export type StoreUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<StoreCreateWithoutOwnerInput, StoreUncheckedCreateWithoutOwnerInput> | StoreCreateWithoutOwnerInput[] | StoreUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: StoreCreateOrConnectWithoutOwnerInput | StoreCreateOrConnectWithoutOwnerInput[]
    createMany?: StoreCreateManyOwnerInputEnvelope
    connect?: StoreWhereUniqueInput | StoreWhereUniqueInput[]
  }

  export type ReviewUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ReviewCreateWithoutUserInput, ReviewUncheckedCreateWithoutUserInput> | ReviewCreateWithoutUserInput[] | ReviewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutUserInput | ReviewCreateOrConnectWithoutUserInput[]
    createMany?: ReviewCreateManyUserInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type SavedStoreUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SavedStoreCreateWithoutUserInput, SavedStoreUncheckedCreateWithoutUserInput> | SavedStoreCreateWithoutUserInput[] | SavedStoreUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SavedStoreCreateOrConnectWithoutUserInput | SavedStoreCreateOrConnectWithoutUserInput[]
    createMany?: SavedStoreCreateManyUserInputEnvelope
    connect?: SavedStoreWhereUniqueInput | SavedStoreWhereUniqueInput[]
  }

  export type SavedProductUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SavedProductCreateWithoutUserInput, SavedProductUncheckedCreateWithoutUserInput> | SavedProductCreateWithoutUserInput[] | SavedProductUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SavedProductCreateOrConnectWithoutUserInput | SavedProductCreateOrConnectWithoutUserInput[]
    createMany?: SavedProductCreateManyUserInputEnvelope
    connect?: SavedProductWhereUniqueInput | SavedProductWhereUniqueInput[]
  }

  export type StoreClaimUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<StoreClaimCreateWithoutUserInput, StoreClaimUncheckedCreateWithoutUserInput> | StoreClaimCreateWithoutUserInput[] | StoreClaimUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StoreClaimCreateOrConnectWithoutUserInput | StoreClaimCreateOrConnectWithoutUserInput[]
    createMany?: StoreClaimCreateManyUserInputEnvelope
    connect?: StoreClaimWhereUniqueInput | StoreClaimWhereUniqueInput[]
  }

  export type StoreClaimUncheckedCreateNestedManyWithoutReviewerInput = {
    create?: XOR<StoreClaimCreateWithoutReviewerInput, StoreClaimUncheckedCreateWithoutReviewerInput> | StoreClaimCreateWithoutReviewerInput[] | StoreClaimUncheckedCreateWithoutReviewerInput[]
    connectOrCreate?: StoreClaimCreateOrConnectWithoutReviewerInput | StoreClaimCreateOrConnectWithoutReviewerInput[]
    createMany?: StoreClaimCreateManyReviewerInputEnvelope
    connect?: StoreClaimWhereUniqueInput | StoreClaimWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type StoreUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<StoreCreateWithoutCreatedByInput, StoreUncheckedCreateWithoutCreatedByInput> | StoreCreateWithoutCreatedByInput[] | StoreUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: StoreCreateOrConnectWithoutCreatedByInput | StoreCreateOrConnectWithoutCreatedByInput[]
    upsert?: StoreUpsertWithWhereUniqueWithoutCreatedByInput | StoreUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: StoreCreateManyCreatedByInputEnvelope
    set?: StoreWhereUniqueInput | StoreWhereUniqueInput[]
    disconnect?: StoreWhereUniqueInput | StoreWhereUniqueInput[]
    delete?: StoreWhereUniqueInput | StoreWhereUniqueInput[]
    connect?: StoreWhereUniqueInput | StoreWhereUniqueInput[]
    update?: StoreUpdateWithWhereUniqueWithoutCreatedByInput | StoreUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: StoreUpdateManyWithWhereWithoutCreatedByInput | StoreUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: StoreScalarWhereInput | StoreScalarWhereInput[]
  }

  export type StoreUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<StoreCreateWithoutOwnerInput, StoreUncheckedCreateWithoutOwnerInput> | StoreCreateWithoutOwnerInput[] | StoreUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: StoreCreateOrConnectWithoutOwnerInput | StoreCreateOrConnectWithoutOwnerInput[]
    upsert?: StoreUpsertWithWhereUniqueWithoutOwnerInput | StoreUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: StoreCreateManyOwnerInputEnvelope
    set?: StoreWhereUniqueInput | StoreWhereUniqueInput[]
    disconnect?: StoreWhereUniqueInput | StoreWhereUniqueInput[]
    delete?: StoreWhereUniqueInput | StoreWhereUniqueInput[]
    connect?: StoreWhereUniqueInput | StoreWhereUniqueInput[]
    update?: StoreUpdateWithWhereUniqueWithoutOwnerInput | StoreUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: StoreUpdateManyWithWhereWithoutOwnerInput | StoreUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: StoreScalarWhereInput | StoreScalarWhereInput[]
  }

  export type ReviewUpdateManyWithoutUserNestedInput = {
    create?: XOR<ReviewCreateWithoutUserInput, ReviewUncheckedCreateWithoutUserInput> | ReviewCreateWithoutUserInput[] | ReviewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutUserInput | ReviewCreateOrConnectWithoutUserInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutUserInput | ReviewUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ReviewCreateManyUserInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutUserInput | ReviewUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutUserInput | ReviewUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type SavedStoreUpdateManyWithoutUserNestedInput = {
    create?: XOR<SavedStoreCreateWithoutUserInput, SavedStoreUncheckedCreateWithoutUserInput> | SavedStoreCreateWithoutUserInput[] | SavedStoreUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SavedStoreCreateOrConnectWithoutUserInput | SavedStoreCreateOrConnectWithoutUserInput[]
    upsert?: SavedStoreUpsertWithWhereUniqueWithoutUserInput | SavedStoreUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SavedStoreCreateManyUserInputEnvelope
    set?: SavedStoreWhereUniqueInput | SavedStoreWhereUniqueInput[]
    disconnect?: SavedStoreWhereUniqueInput | SavedStoreWhereUniqueInput[]
    delete?: SavedStoreWhereUniqueInput | SavedStoreWhereUniqueInput[]
    connect?: SavedStoreWhereUniqueInput | SavedStoreWhereUniqueInput[]
    update?: SavedStoreUpdateWithWhereUniqueWithoutUserInput | SavedStoreUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SavedStoreUpdateManyWithWhereWithoutUserInput | SavedStoreUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SavedStoreScalarWhereInput | SavedStoreScalarWhereInput[]
  }

  export type SavedProductUpdateManyWithoutUserNestedInput = {
    create?: XOR<SavedProductCreateWithoutUserInput, SavedProductUncheckedCreateWithoutUserInput> | SavedProductCreateWithoutUserInput[] | SavedProductUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SavedProductCreateOrConnectWithoutUserInput | SavedProductCreateOrConnectWithoutUserInput[]
    upsert?: SavedProductUpsertWithWhereUniqueWithoutUserInput | SavedProductUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SavedProductCreateManyUserInputEnvelope
    set?: SavedProductWhereUniqueInput | SavedProductWhereUniqueInput[]
    disconnect?: SavedProductWhereUniqueInput | SavedProductWhereUniqueInput[]
    delete?: SavedProductWhereUniqueInput | SavedProductWhereUniqueInput[]
    connect?: SavedProductWhereUniqueInput | SavedProductWhereUniqueInput[]
    update?: SavedProductUpdateWithWhereUniqueWithoutUserInput | SavedProductUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SavedProductUpdateManyWithWhereWithoutUserInput | SavedProductUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SavedProductScalarWhereInput | SavedProductScalarWhereInput[]
  }

  export type StoreClaimUpdateManyWithoutUserNestedInput = {
    create?: XOR<StoreClaimCreateWithoutUserInput, StoreClaimUncheckedCreateWithoutUserInput> | StoreClaimCreateWithoutUserInput[] | StoreClaimUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StoreClaimCreateOrConnectWithoutUserInput | StoreClaimCreateOrConnectWithoutUserInput[]
    upsert?: StoreClaimUpsertWithWhereUniqueWithoutUserInput | StoreClaimUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: StoreClaimCreateManyUserInputEnvelope
    set?: StoreClaimWhereUniqueInput | StoreClaimWhereUniqueInput[]
    disconnect?: StoreClaimWhereUniqueInput | StoreClaimWhereUniqueInput[]
    delete?: StoreClaimWhereUniqueInput | StoreClaimWhereUniqueInput[]
    connect?: StoreClaimWhereUniqueInput | StoreClaimWhereUniqueInput[]
    update?: StoreClaimUpdateWithWhereUniqueWithoutUserInput | StoreClaimUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: StoreClaimUpdateManyWithWhereWithoutUserInput | StoreClaimUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: StoreClaimScalarWhereInput | StoreClaimScalarWhereInput[]
  }

  export type StoreClaimUpdateManyWithoutReviewerNestedInput = {
    create?: XOR<StoreClaimCreateWithoutReviewerInput, StoreClaimUncheckedCreateWithoutReviewerInput> | StoreClaimCreateWithoutReviewerInput[] | StoreClaimUncheckedCreateWithoutReviewerInput[]
    connectOrCreate?: StoreClaimCreateOrConnectWithoutReviewerInput | StoreClaimCreateOrConnectWithoutReviewerInput[]
    upsert?: StoreClaimUpsertWithWhereUniqueWithoutReviewerInput | StoreClaimUpsertWithWhereUniqueWithoutReviewerInput[]
    createMany?: StoreClaimCreateManyReviewerInputEnvelope
    set?: StoreClaimWhereUniqueInput | StoreClaimWhereUniqueInput[]
    disconnect?: StoreClaimWhereUniqueInput | StoreClaimWhereUniqueInput[]
    delete?: StoreClaimWhereUniqueInput | StoreClaimWhereUniqueInput[]
    connect?: StoreClaimWhereUniqueInput | StoreClaimWhereUniqueInput[]
    update?: StoreClaimUpdateWithWhereUniqueWithoutReviewerInput | StoreClaimUpdateWithWhereUniqueWithoutReviewerInput[]
    updateMany?: StoreClaimUpdateManyWithWhereWithoutReviewerInput | StoreClaimUpdateManyWithWhereWithoutReviewerInput[]
    deleteMany?: StoreClaimScalarWhereInput | StoreClaimScalarWhereInput[]
  }

  export type StoreUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<StoreCreateWithoutCreatedByInput, StoreUncheckedCreateWithoutCreatedByInput> | StoreCreateWithoutCreatedByInput[] | StoreUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: StoreCreateOrConnectWithoutCreatedByInput | StoreCreateOrConnectWithoutCreatedByInput[]
    upsert?: StoreUpsertWithWhereUniqueWithoutCreatedByInput | StoreUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: StoreCreateManyCreatedByInputEnvelope
    set?: StoreWhereUniqueInput | StoreWhereUniqueInput[]
    disconnect?: StoreWhereUniqueInput | StoreWhereUniqueInput[]
    delete?: StoreWhereUniqueInput | StoreWhereUniqueInput[]
    connect?: StoreWhereUniqueInput | StoreWhereUniqueInput[]
    update?: StoreUpdateWithWhereUniqueWithoutCreatedByInput | StoreUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: StoreUpdateManyWithWhereWithoutCreatedByInput | StoreUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: StoreScalarWhereInput | StoreScalarWhereInput[]
  }

  export type StoreUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<StoreCreateWithoutOwnerInput, StoreUncheckedCreateWithoutOwnerInput> | StoreCreateWithoutOwnerInput[] | StoreUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: StoreCreateOrConnectWithoutOwnerInput | StoreCreateOrConnectWithoutOwnerInput[]
    upsert?: StoreUpsertWithWhereUniqueWithoutOwnerInput | StoreUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: StoreCreateManyOwnerInputEnvelope
    set?: StoreWhereUniqueInput | StoreWhereUniqueInput[]
    disconnect?: StoreWhereUniqueInput | StoreWhereUniqueInput[]
    delete?: StoreWhereUniqueInput | StoreWhereUniqueInput[]
    connect?: StoreWhereUniqueInput | StoreWhereUniqueInput[]
    update?: StoreUpdateWithWhereUniqueWithoutOwnerInput | StoreUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: StoreUpdateManyWithWhereWithoutOwnerInput | StoreUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: StoreScalarWhereInput | StoreScalarWhereInput[]
  }

  export type ReviewUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ReviewCreateWithoutUserInput, ReviewUncheckedCreateWithoutUserInput> | ReviewCreateWithoutUserInput[] | ReviewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutUserInput | ReviewCreateOrConnectWithoutUserInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutUserInput | ReviewUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ReviewCreateManyUserInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutUserInput | ReviewUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutUserInput | ReviewUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type SavedStoreUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SavedStoreCreateWithoutUserInput, SavedStoreUncheckedCreateWithoutUserInput> | SavedStoreCreateWithoutUserInput[] | SavedStoreUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SavedStoreCreateOrConnectWithoutUserInput | SavedStoreCreateOrConnectWithoutUserInput[]
    upsert?: SavedStoreUpsertWithWhereUniqueWithoutUserInput | SavedStoreUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SavedStoreCreateManyUserInputEnvelope
    set?: SavedStoreWhereUniqueInput | SavedStoreWhereUniqueInput[]
    disconnect?: SavedStoreWhereUniqueInput | SavedStoreWhereUniqueInput[]
    delete?: SavedStoreWhereUniqueInput | SavedStoreWhereUniqueInput[]
    connect?: SavedStoreWhereUniqueInput | SavedStoreWhereUniqueInput[]
    update?: SavedStoreUpdateWithWhereUniqueWithoutUserInput | SavedStoreUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SavedStoreUpdateManyWithWhereWithoutUserInput | SavedStoreUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SavedStoreScalarWhereInput | SavedStoreScalarWhereInput[]
  }

  export type SavedProductUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SavedProductCreateWithoutUserInput, SavedProductUncheckedCreateWithoutUserInput> | SavedProductCreateWithoutUserInput[] | SavedProductUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SavedProductCreateOrConnectWithoutUserInput | SavedProductCreateOrConnectWithoutUserInput[]
    upsert?: SavedProductUpsertWithWhereUniqueWithoutUserInput | SavedProductUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SavedProductCreateManyUserInputEnvelope
    set?: SavedProductWhereUniqueInput | SavedProductWhereUniqueInput[]
    disconnect?: SavedProductWhereUniqueInput | SavedProductWhereUniqueInput[]
    delete?: SavedProductWhereUniqueInput | SavedProductWhereUniqueInput[]
    connect?: SavedProductWhereUniqueInput | SavedProductWhereUniqueInput[]
    update?: SavedProductUpdateWithWhereUniqueWithoutUserInput | SavedProductUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SavedProductUpdateManyWithWhereWithoutUserInput | SavedProductUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SavedProductScalarWhereInput | SavedProductScalarWhereInput[]
  }

  export type StoreClaimUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<StoreClaimCreateWithoutUserInput, StoreClaimUncheckedCreateWithoutUserInput> | StoreClaimCreateWithoutUserInput[] | StoreClaimUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StoreClaimCreateOrConnectWithoutUserInput | StoreClaimCreateOrConnectWithoutUserInput[]
    upsert?: StoreClaimUpsertWithWhereUniqueWithoutUserInput | StoreClaimUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: StoreClaimCreateManyUserInputEnvelope
    set?: StoreClaimWhereUniqueInput | StoreClaimWhereUniqueInput[]
    disconnect?: StoreClaimWhereUniqueInput | StoreClaimWhereUniqueInput[]
    delete?: StoreClaimWhereUniqueInput | StoreClaimWhereUniqueInput[]
    connect?: StoreClaimWhereUniqueInput | StoreClaimWhereUniqueInput[]
    update?: StoreClaimUpdateWithWhereUniqueWithoutUserInput | StoreClaimUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: StoreClaimUpdateManyWithWhereWithoutUserInput | StoreClaimUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: StoreClaimScalarWhereInput | StoreClaimScalarWhereInput[]
  }

  export type StoreClaimUncheckedUpdateManyWithoutReviewerNestedInput = {
    create?: XOR<StoreClaimCreateWithoutReviewerInput, StoreClaimUncheckedCreateWithoutReviewerInput> | StoreClaimCreateWithoutReviewerInput[] | StoreClaimUncheckedCreateWithoutReviewerInput[]
    connectOrCreate?: StoreClaimCreateOrConnectWithoutReviewerInput | StoreClaimCreateOrConnectWithoutReviewerInput[]
    upsert?: StoreClaimUpsertWithWhereUniqueWithoutReviewerInput | StoreClaimUpsertWithWhereUniqueWithoutReviewerInput[]
    createMany?: StoreClaimCreateManyReviewerInputEnvelope
    set?: StoreClaimWhereUniqueInput | StoreClaimWhereUniqueInput[]
    disconnect?: StoreClaimWhereUniqueInput | StoreClaimWhereUniqueInput[]
    delete?: StoreClaimWhereUniqueInput | StoreClaimWhereUniqueInput[]
    connect?: StoreClaimWhereUniqueInput | StoreClaimWhereUniqueInput[]
    update?: StoreClaimUpdateWithWhereUniqueWithoutReviewerInput | StoreClaimUpdateWithWhereUniqueWithoutReviewerInput[]
    updateMany?: StoreClaimUpdateManyWithWhereWithoutReviewerInput | StoreClaimUpdateManyWithWhereWithoutReviewerInput[]
    deleteMany?: StoreClaimScalarWhereInput | StoreClaimScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutStoresOwnedInput = {
    create?: XOR<UserCreateWithoutStoresOwnedInput, UserUncheckedCreateWithoutStoresOwnedInput>
    connectOrCreate?: UserCreateOrConnectWithoutStoresOwnedInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutStoresCreatedInput = {
    create?: XOR<UserCreateWithoutStoresCreatedInput, UserUncheckedCreateWithoutStoresCreatedInput>
    connectOrCreate?: UserCreateOrConnectWithoutStoresCreatedInput
    connect?: UserWhereUniqueInput
  }

  export type StoreHoursCreateNestedManyWithoutStoreInput = {
    create?: XOR<StoreHoursCreateWithoutStoreInput, StoreHoursUncheckedCreateWithoutStoreInput> | StoreHoursCreateWithoutStoreInput[] | StoreHoursUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: StoreHoursCreateOrConnectWithoutStoreInput | StoreHoursCreateOrConnectWithoutStoreInput[]
    createMany?: StoreHoursCreateManyStoreInputEnvelope
    connect?: StoreHoursWhereUniqueInput | StoreHoursWhereUniqueInput[]
  }

  export type ProductCreateNestedManyWithoutStoreInput = {
    create?: XOR<ProductCreateWithoutStoreInput, ProductUncheckedCreateWithoutStoreInput> | ProductCreateWithoutStoreInput[] | ProductUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutStoreInput | ProductCreateOrConnectWithoutStoreInput[]
    createMany?: ProductCreateManyStoreInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type ReviewCreateNestedManyWithoutStoreInput = {
    create?: XOR<ReviewCreateWithoutStoreInput, ReviewUncheckedCreateWithoutStoreInput> | ReviewCreateWithoutStoreInput[] | ReviewUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutStoreInput | ReviewCreateOrConnectWithoutStoreInput[]
    createMany?: ReviewCreateManyStoreInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type SavedStoreCreateNestedManyWithoutStoreInput = {
    create?: XOR<SavedStoreCreateWithoutStoreInput, SavedStoreUncheckedCreateWithoutStoreInput> | SavedStoreCreateWithoutStoreInput[] | SavedStoreUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: SavedStoreCreateOrConnectWithoutStoreInput | SavedStoreCreateOrConnectWithoutStoreInput[]
    createMany?: SavedStoreCreateManyStoreInputEnvelope
    connect?: SavedStoreWhereUniqueInput | SavedStoreWhereUniqueInput[]
  }

  export type StoreClaimCreateNestedManyWithoutStoreInput = {
    create?: XOR<StoreClaimCreateWithoutStoreInput, StoreClaimUncheckedCreateWithoutStoreInput> | StoreClaimCreateWithoutStoreInput[] | StoreClaimUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: StoreClaimCreateOrConnectWithoutStoreInput | StoreClaimCreateOrConnectWithoutStoreInput[]
    createMany?: StoreClaimCreateManyStoreInputEnvelope
    connect?: StoreClaimWhereUniqueInput | StoreClaimWhereUniqueInput[]
  }

  export type StorePhotoCreateNestedManyWithoutStoreInput = {
    create?: XOR<StorePhotoCreateWithoutStoreInput, StorePhotoUncheckedCreateWithoutStoreInput> | StorePhotoCreateWithoutStoreInput[] | StorePhotoUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: StorePhotoCreateOrConnectWithoutStoreInput | StorePhotoCreateOrConnectWithoutStoreInput[]
    createMany?: StorePhotoCreateManyStoreInputEnvelope
    connect?: StorePhotoWhereUniqueInput | StorePhotoWhereUniqueInput[]
  }

  export type StoreHoursUncheckedCreateNestedManyWithoutStoreInput = {
    create?: XOR<StoreHoursCreateWithoutStoreInput, StoreHoursUncheckedCreateWithoutStoreInput> | StoreHoursCreateWithoutStoreInput[] | StoreHoursUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: StoreHoursCreateOrConnectWithoutStoreInput | StoreHoursCreateOrConnectWithoutStoreInput[]
    createMany?: StoreHoursCreateManyStoreInputEnvelope
    connect?: StoreHoursWhereUniqueInput | StoreHoursWhereUniqueInput[]
  }

  export type ProductUncheckedCreateNestedManyWithoutStoreInput = {
    create?: XOR<ProductCreateWithoutStoreInput, ProductUncheckedCreateWithoutStoreInput> | ProductCreateWithoutStoreInput[] | ProductUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutStoreInput | ProductCreateOrConnectWithoutStoreInput[]
    createMany?: ProductCreateManyStoreInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type ReviewUncheckedCreateNestedManyWithoutStoreInput = {
    create?: XOR<ReviewCreateWithoutStoreInput, ReviewUncheckedCreateWithoutStoreInput> | ReviewCreateWithoutStoreInput[] | ReviewUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutStoreInput | ReviewCreateOrConnectWithoutStoreInput[]
    createMany?: ReviewCreateManyStoreInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type SavedStoreUncheckedCreateNestedManyWithoutStoreInput = {
    create?: XOR<SavedStoreCreateWithoutStoreInput, SavedStoreUncheckedCreateWithoutStoreInput> | SavedStoreCreateWithoutStoreInput[] | SavedStoreUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: SavedStoreCreateOrConnectWithoutStoreInput | SavedStoreCreateOrConnectWithoutStoreInput[]
    createMany?: SavedStoreCreateManyStoreInputEnvelope
    connect?: SavedStoreWhereUniqueInput | SavedStoreWhereUniqueInput[]
  }

  export type StoreClaimUncheckedCreateNestedManyWithoutStoreInput = {
    create?: XOR<StoreClaimCreateWithoutStoreInput, StoreClaimUncheckedCreateWithoutStoreInput> | StoreClaimCreateWithoutStoreInput[] | StoreClaimUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: StoreClaimCreateOrConnectWithoutStoreInput | StoreClaimCreateOrConnectWithoutStoreInput[]
    createMany?: StoreClaimCreateManyStoreInputEnvelope
    connect?: StoreClaimWhereUniqueInput | StoreClaimWhereUniqueInput[]
  }

  export type StorePhotoUncheckedCreateNestedManyWithoutStoreInput = {
    create?: XOR<StorePhotoCreateWithoutStoreInput, StorePhotoUncheckedCreateWithoutStoreInput> | StorePhotoCreateWithoutStoreInput[] | StorePhotoUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: StorePhotoCreateOrConnectWithoutStoreInput | StorePhotoCreateOrConnectWithoutStoreInput[]
    createMany?: StorePhotoCreateManyStoreInputEnvelope
    connect?: StorePhotoWhereUniqueInput | StorePhotoWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumStoreStatusFieldUpdateOperationsInput = {
    set?: $Enums.StoreStatus
  }

  export type UserUpdateOneWithoutStoresOwnedNestedInput = {
    create?: XOR<UserCreateWithoutStoresOwnedInput, UserUncheckedCreateWithoutStoresOwnedInput>
    connectOrCreate?: UserCreateOrConnectWithoutStoresOwnedInput
    upsert?: UserUpsertWithoutStoresOwnedInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutStoresOwnedInput, UserUpdateWithoutStoresOwnedInput>, UserUncheckedUpdateWithoutStoresOwnedInput>
  }

  export type UserUpdateOneRequiredWithoutStoresCreatedNestedInput = {
    create?: XOR<UserCreateWithoutStoresCreatedInput, UserUncheckedCreateWithoutStoresCreatedInput>
    connectOrCreate?: UserCreateOrConnectWithoutStoresCreatedInput
    upsert?: UserUpsertWithoutStoresCreatedInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutStoresCreatedInput, UserUpdateWithoutStoresCreatedInput>, UserUncheckedUpdateWithoutStoresCreatedInput>
  }

  export type StoreHoursUpdateManyWithoutStoreNestedInput = {
    create?: XOR<StoreHoursCreateWithoutStoreInput, StoreHoursUncheckedCreateWithoutStoreInput> | StoreHoursCreateWithoutStoreInput[] | StoreHoursUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: StoreHoursCreateOrConnectWithoutStoreInput | StoreHoursCreateOrConnectWithoutStoreInput[]
    upsert?: StoreHoursUpsertWithWhereUniqueWithoutStoreInput | StoreHoursUpsertWithWhereUniqueWithoutStoreInput[]
    createMany?: StoreHoursCreateManyStoreInputEnvelope
    set?: StoreHoursWhereUniqueInput | StoreHoursWhereUniqueInput[]
    disconnect?: StoreHoursWhereUniqueInput | StoreHoursWhereUniqueInput[]
    delete?: StoreHoursWhereUniqueInput | StoreHoursWhereUniqueInput[]
    connect?: StoreHoursWhereUniqueInput | StoreHoursWhereUniqueInput[]
    update?: StoreHoursUpdateWithWhereUniqueWithoutStoreInput | StoreHoursUpdateWithWhereUniqueWithoutStoreInput[]
    updateMany?: StoreHoursUpdateManyWithWhereWithoutStoreInput | StoreHoursUpdateManyWithWhereWithoutStoreInput[]
    deleteMany?: StoreHoursScalarWhereInput | StoreHoursScalarWhereInput[]
  }

  export type ProductUpdateManyWithoutStoreNestedInput = {
    create?: XOR<ProductCreateWithoutStoreInput, ProductUncheckedCreateWithoutStoreInput> | ProductCreateWithoutStoreInput[] | ProductUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutStoreInput | ProductCreateOrConnectWithoutStoreInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutStoreInput | ProductUpsertWithWhereUniqueWithoutStoreInput[]
    createMany?: ProductCreateManyStoreInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutStoreInput | ProductUpdateWithWhereUniqueWithoutStoreInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutStoreInput | ProductUpdateManyWithWhereWithoutStoreInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type ReviewUpdateManyWithoutStoreNestedInput = {
    create?: XOR<ReviewCreateWithoutStoreInput, ReviewUncheckedCreateWithoutStoreInput> | ReviewCreateWithoutStoreInput[] | ReviewUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutStoreInput | ReviewCreateOrConnectWithoutStoreInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutStoreInput | ReviewUpsertWithWhereUniqueWithoutStoreInput[]
    createMany?: ReviewCreateManyStoreInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutStoreInput | ReviewUpdateWithWhereUniqueWithoutStoreInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutStoreInput | ReviewUpdateManyWithWhereWithoutStoreInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type SavedStoreUpdateManyWithoutStoreNestedInput = {
    create?: XOR<SavedStoreCreateWithoutStoreInput, SavedStoreUncheckedCreateWithoutStoreInput> | SavedStoreCreateWithoutStoreInput[] | SavedStoreUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: SavedStoreCreateOrConnectWithoutStoreInput | SavedStoreCreateOrConnectWithoutStoreInput[]
    upsert?: SavedStoreUpsertWithWhereUniqueWithoutStoreInput | SavedStoreUpsertWithWhereUniqueWithoutStoreInput[]
    createMany?: SavedStoreCreateManyStoreInputEnvelope
    set?: SavedStoreWhereUniqueInput | SavedStoreWhereUniqueInput[]
    disconnect?: SavedStoreWhereUniqueInput | SavedStoreWhereUniqueInput[]
    delete?: SavedStoreWhereUniqueInput | SavedStoreWhereUniqueInput[]
    connect?: SavedStoreWhereUniqueInput | SavedStoreWhereUniqueInput[]
    update?: SavedStoreUpdateWithWhereUniqueWithoutStoreInput | SavedStoreUpdateWithWhereUniqueWithoutStoreInput[]
    updateMany?: SavedStoreUpdateManyWithWhereWithoutStoreInput | SavedStoreUpdateManyWithWhereWithoutStoreInput[]
    deleteMany?: SavedStoreScalarWhereInput | SavedStoreScalarWhereInput[]
  }

  export type StoreClaimUpdateManyWithoutStoreNestedInput = {
    create?: XOR<StoreClaimCreateWithoutStoreInput, StoreClaimUncheckedCreateWithoutStoreInput> | StoreClaimCreateWithoutStoreInput[] | StoreClaimUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: StoreClaimCreateOrConnectWithoutStoreInput | StoreClaimCreateOrConnectWithoutStoreInput[]
    upsert?: StoreClaimUpsertWithWhereUniqueWithoutStoreInput | StoreClaimUpsertWithWhereUniqueWithoutStoreInput[]
    createMany?: StoreClaimCreateManyStoreInputEnvelope
    set?: StoreClaimWhereUniqueInput | StoreClaimWhereUniqueInput[]
    disconnect?: StoreClaimWhereUniqueInput | StoreClaimWhereUniqueInput[]
    delete?: StoreClaimWhereUniqueInput | StoreClaimWhereUniqueInput[]
    connect?: StoreClaimWhereUniqueInput | StoreClaimWhereUniqueInput[]
    update?: StoreClaimUpdateWithWhereUniqueWithoutStoreInput | StoreClaimUpdateWithWhereUniqueWithoutStoreInput[]
    updateMany?: StoreClaimUpdateManyWithWhereWithoutStoreInput | StoreClaimUpdateManyWithWhereWithoutStoreInput[]
    deleteMany?: StoreClaimScalarWhereInput | StoreClaimScalarWhereInput[]
  }

  export type StorePhotoUpdateManyWithoutStoreNestedInput = {
    create?: XOR<StorePhotoCreateWithoutStoreInput, StorePhotoUncheckedCreateWithoutStoreInput> | StorePhotoCreateWithoutStoreInput[] | StorePhotoUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: StorePhotoCreateOrConnectWithoutStoreInput | StorePhotoCreateOrConnectWithoutStoreInput[]
    upsert?: StorePhotoUpsertWithWhereUniqueWithoutStoreInput | StorePhotoUpsertWithWhereUniqueWithoutStoreInput[]
    createMany?: StorePhotoCreateManyStoreInputEnvelope
    set?: StorePhotoWhereUniqueInput | StorePhotoWhereUniqueInput[]
    disconnect?: StorePhotoWhereUniqueInput | StorePhotoWhereUniqueInput[]
    delete?: StorePhotoWhereUniqueInput | StorePhotoWhereUniqueInput[]
    connect?: StorePhotoWhereUniqueInput | StorePhotoWhereUniqueInput[]
    update?: StorePhotoUpdateWithWhereUniqueWithoutStoreInput | StorePhotoUpdateWithWhereUniqueWithoutStoreInput[]
    updateMany?: StorePhotoUpdateManyWithWhereWithoutStoreInput | StorePhotoUpdateManyWithWhereWithoutStoreInput[]
    deleteMany?: StorePhotoScalarWhereInput | StorePhotoScalarWhereInput[]
  }

  export type StoreHoursUncheckedUpdateManyWithoutStoreNestedInput = {
    create?: XOR<StoreHoursCreateWithoutStoreInput, StoreHoursUncheckedCreateWithoutStoreInput> | StoreHoursCreateWithoutStoreInput[] | StoreHoursUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: StoreHoursCreateOrConnectWithoutStoreInput | StoreHoursCreateOrConnectWithoutStoreInput[]
    upsert?: StoreHoursUpsertWithWhereUniqueWithoutStoreInput | StoreHoursUpsertWithWhereUniqueWithoutStoreInput[]
    createMany?: StoreHoursCreateManyStoreInputEnvelope
    set?: StoreHoursWhereUniqueInput | StoreHoursWhereUniqueInput[]
    disconnect?: StoreHoursWhereUniqueInput | StoreHoursWhereUniqueInput[]
    delete?: StoreHoursWhereUniqueInput | StoreHoursWhereUniqueInput[]
    connect?: StoreHoursWhereUniqueInput | StoreHoursWhereUniqueInput[]
    update?: StoreHoursUpdateWithWhereUniqueWithoutStoreInput | StoreHoursUpdateWithWhereUniqueWithoutStoreInput[]
    updateMany?: StoreHoursUpdateManyWithWhereWithoutStoreInput | StoreHoursUpdateManyWithWhereWithoutStoreInput[]
    deleteMany?: StoreHoursScalarWhereInput | StoreHoursScalarWhereInput[]
  }

  export type ProductUncheckedUpdateManyWithoutStoreNestedInput = {
    create?: XOR<ProductCreateWithoutStoreInput, ProductUncheckedCreateWithoutStoreInput> | ProductCreateWithoutStoreInput[] | ProductUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutStoreInput | ProductCreateOrConnectWithoutStoreInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutStoreInput | ProductUpsertWithWhereUniqueWithoutStoreInput[]
    createMany?: ProductCreateManyStoreInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutStoreInput | ProductUpdateWithWhereUniqueWithoutStoreInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutStoreInput | ProductUpdateManyWithWhereWithoutStoreInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type ReviewUncheckedUpdateManyWithoutStoreNestedInput = {
    create?: XOR<ReviewCreateWithoutStoreInput, ReviewUncheckedCreateWithoutStoreInput> | ReviewCreateWithoutStoreInput[] | ReviewUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutStoreInput | ReviewCreateOrConnectWithoutStoreInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutStoreInput | ReviewUpsertWithWhereUniqueWithoutStoreInput[]
    createMany?: ReviewCreateManyStoreInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutStoreInput | ReviewUpdateWithWhereUniqueWithoutStoreInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutStoreInput | ReviewUpdateManyWithWhereWithoutStoreInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type SavedStoreUncheckedUpdateManyWithoutStoreNestedInput = {
    create?: XOR<SavedStoreCreateWithoutStoreInput, SavedStoreUncheckedCreateWithoutStoreInput> | SavedStoreCreateWithoutStoreInput[] | SavedStoreUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: SavedStoreCreateOrConnectWithoutStoreInput | SavedStoreCreateOrConnectWithoutStoreInput[]
    upsert?: SavedStoreUpsertWithWhereUniqueWithoutStoreInput | SavedStoreUpsertWithWhereUniqueWithoutStoreInput[]
    createMany?: SavedStoreCreateManyStoreInputEnvelope
    set?: SavedStoreWhereUniqueInput | SavedStoreWhereUniqueInput[]
    disconnect?: SavedStoreWhereUniqueInput | SavedStoreWhereUniqueInput[]
    delete?: SavedStoreWhereUniqueInput | SavedStoreWhereUniqueInput[]
    connect?: SavedStoreWhereUniqueInput | SavedStoreWhereUniqueInput[]
    update?: SavedStoreUpdateWithWhereUniqueWithoutStoreInput | SavedStoreUpdateWithWhereUniqueWithoutStoreInput[]
    updateMany?: SavedStoreUpdateManyWithWhereWithoutStoreInput | SavedStoreUpdateManyWithWhereWithoutStoreInput[]
    deleteMany?: SavedStoreScalarWhereInput | SavedStoreScalarWhereInput[]
  }

  export type StoreClaimUncheckedUpdateManyWithoutStoreNestedInput = {
    create?: XOR<StoreClaimCreateWithoutStoreInput, StoreClaimUncheckedCreateWithoutStoreInput> | StoreClaimCreateWithoutStoreInput[] | StoreClaimUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: StoreClaimCreateOrConnectWithoutStoreInput | StoreClaimCreateOrConnectWithoutStoreInput[]
    upsert?: StoreClaimUpsertWithWhereUniqueWithoutStoreInput | StoreClaimUpsertWithWhereUniqueWithoutStoreInput[]
    createMany?: StoreClaimCreateManyStoreInputEnvelope
    set?: StoreClaimWhereUniqueInput | StoreClaimWhereUniqueInput[]
    disconnect?: StoreClaimWhereUniqueInput | StoreClaimWhereUniqueInput[]
    delete?: StoreClaimWhereUniqueInput | StoreClaimWhereUniqueInput[]
    connect?: StoreClaimWhereUniqueInput | StoreClaimWhereUniqueInput[]
    update?: StoreClaimUpdateWithWhereUniqueWithoutStoreInput | StoreClaimUpdateWithWhereUniqueWithoutStoreInput[]
    updateMany?: StoreClaimUpdateManyWithWhereWithoutStoreInput | StoreClaimUpdateManyWithWhereWithoutStoreInput[]
    deleteMany?: StoreClaimScalarWhereInput | StoreClaimScalarWhereInput[]
  }

  export type StorePhotoUncheckedUpdateManyWithoutStoreNestedInput = {
    create?: XOR<StorePhotoCreateWithoutStoreInput, StorePhotoUncheckedCreateWithoutStoreInput> | StorePhotoCreateWithoutStoreInput[] | StorePhotoUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: StorePhotoCreateOrConnectWithoutStoreInput | StorePhotoCreateOrConnectWithoutStoreInput[]
    upsert?: StorePhotoUpsertWithWhereUniqueWithoutStoreInput | StorePhotoUpsertWithWhereUniqueWithoutStoreInput[]
    createMany?: StorePhotoCreateManyStoreInputEnvelope
    set?: StorePhotoWhereUniqueInput | StorePhotoWhereUniqueInput[]
    disconnect?: StorePhotoWhereUniqueInput | StorePhotoWhereUniqueInput[]
    delete?: StorePhotoWhereUniqueInput | StorePhotoWhereUniqueInput[]
    connect?: StorePhotoWhereUniqueInput | StorePhotoWhereUniqueInput[]
    update?: StorePhotoUpdateWithWhereUniqueWithoutStoreInput | StorePhotoUpdateWithWhereUniqueWithoutStoreInput[]
    updateMany?: StorePhotoUpdateManyWithWhereWithoutStoreInput | StorePhotoUpdateManyWithWhereWithoutStoreInput[]
    deleteMany?: StorePhotoScalarWhereInput | StorePhotoScalarWhereInput[]
  }

  export type StoreCreateNestedOneWithoutHoursInput = {
    create?: XOR<StoreCreateWithoutHoursInput, StoreUncheckedCreateWithoutHoursInput>
    connectOrCreate?: StoreCreateOrConnectWithoutHoursInput
    connect?: StoreWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type StoreUpdateOneRequiredWithoutHoursNestedInput = {
    create?: XOR<StoreCreateWithoutHoursInput, StoreUncheckedCreateWithoutHoursInput>
    connectOrCreate?: StoreCreateOrConnectWithoutHoursInput
    upsert?: StoreUpsertWithoutHoursInput
    connect?: StoreWhereUniqueInput
    update?: XOR<XOR<StoreUpdateToOneWithWhereWithoutHoursInput, StoreUpdateWithoutHoursInput>, StoreUncheckedUpdateWithoutHoursInput>
  }

  export type StoreCreateNestedOneWithoutProductsInput = {
    create?: XOR<StoreCreateWithoutProductsInput, StoreUncheckedCreateWithoutProductsInput>
    connectOrCreate?: StoreCreateOrConnectWithoutProductsInput
    connect?: StoreWhereUniqueInput
  }

  export type SavedProductCreateNestedManyWithoutProductInput = {
    create?: XOR<SavedProductCreateWithoutProductInput, SavedProductUncheckedCreateWithoutProductInput> | SavedProductCreateWithoutProductInput[] | SavedProductUncheckedCreateWithoutProductInput[]
    connectOrCreate?: SavedProductCreateOrConnectWithoutProductInput | SavedProductCreateOrConnectWithoutProductInput[]
    createMany?: SavedProductCreateManyProductInputEnvelope
    connect?: SavedProductWhereUniqueInput | SavedProductWhereUniqueInput[]
  }

  export type SavedProductUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<SavedProductCreateWithoutProductInput, SavedProductUncheckedCreateWithoutProductInput> | SavedProductCreateWithoutProductInput[] | SavedProductUncheckedCreateWithoutProductInput[]
    connectOrCreate?: SavedProductCreateOrConnectWithoutProductInput | SavedProductCreateOrConnectWithoutProductInput[]
    createMany?: SavedProductCreateManyProductInputEnvelope
    connect?: SavedProductWhereUniqueInput | SavedProductWhereUniqueInput[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StoreUpdateOneRequiredWithoutProductsNestedInput = {
    create?: XOR<StoreCreateWithoutProductsInput, StoreUncheckedCreateWithoutProductsInput>
    connectOrCreate?: StoreCreateOrConnectWithoutProductsInput
    upsert?: StoreUpsertWithoutProductsInput
    connect?: StoreWhereUniqueInput
    update?: XOR<XOR<StoreUpdateToOneWithWhereWithoutProductsInput, StoreUpdateWithoutProductsInput>, StoreUncheckedUpdateWithoutProductsInput>
  }

  export type SavedProductUpdateManyWithoutProductNestedInput = {
    create?: XOR<SavedProductCreateWithoutProductInput, SavedProductUncheckedCreateWithoutProductInput> | SavedProductCreateWithoutProductInput[] | SavedProductUncheckedCreateWithoutProductInput[]
    connectOrCreate?: SavedProductCreateOrConnectWithoutProductInput | SavedProductCreateOrConnectWithoutProductInput[]
    upsert?: SavedProductUpsertWithWhereUniqueWithoutProductInput | SavedProductUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: SavedProductCreateManyProductInputEnvelope
    set?: SavedProductWhereUniqueInput | SavedProductWhereUniqueInput[]
    disconnect?: SavedProductWhereUniqueInput | SavedProductWhereUniqueInput[]
    delete?: SavedProductWhereUniqueInput | SavedProductWhereUniqueInput[]
    connect?: SavedProductWhereUniqueInput | SavedProductWhereUniqueInput[]
    update?: SavedProductUpdateWithWhereUniqueWithoutProductInput | SavedProductUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: SavedProductUpdateManyWithWhereWithoutProductInput | SavedProductUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: SavedProductScalarWhereInput | SavedProductScalarWhereInput[]
  }

  export type SavedProductUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<SavedProductCreateWithoutProductInput, SavedProductUncheckedCreateWithoutProductInput> | SavedProductCreateWithoutProductInput[] | SavedProductUncheckedCreateWithoutProductInput[]
    connectOrCreate?: SavedProductCreateOrConnectWithoutProductInput | SavedProductCreateOrConnectWithoutProductInput[]
    upsert?: SavedProductUpsertWithWhereUniqueWithoutProductInput | SavedProductUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: SavedProductCreateManyProductInputEnvelope
    set?: SavedProductWhereUniqueInput | SavedProductWhereUniqueInput[]
    disconnect?: SavedProductWhereUniqueInput | SavedProductWhereUniqueInput[]
    delete?: SavedProductWhereUniqueInput | SavedProductWhereUniqueInput[]
    connect?: SavedProductWhereUniqueInput | SavedProductWhereUniqueInput[]
    update?: SavedProductUpdateWithWhereUniqueWithoutProductInput | SavedProductUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: SavedProductUpdateManyWithWhereWithoutProductInput | SavedProductUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: SavedProductScalarWhereInput | SavedProductScalarWhereInput[]
  }

  export type StoreCreateNestedOneWithoutReviewsInput = {
    create?: XOR<StoreCreateWithoutReviewsInput, StoreUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: StoreCreateOrConnectWithoutReviewsInput
    connect?: StoreWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReviewsInput = {
    create?: XOR<UserCreateWithoutReviewsInput, UserUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviewsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EnumReviewStatusFieldUpdateOperationsInput = {
    set?: $Enums.ReviewStatus
  }

  export type StoreUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: XOR<StoreCreateWithoutReviewsInput, StoreUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: StoreCreateOrConnectWithoutReviewsInput
    upsert?: StoreUpsertWithoutReviewsInput
    connect?: StoreWhereUniqueInput
    update?: XOR<XOR<StoreUpdateToOneWithWhereWithoutReviewsInput, StoreUpdateWithoutReviewsInput>, StoreUncheckedUpdateWithoutReviewsInput>
  }

  export type UserUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: XOR<UserCreateWithoutReviewsInput, UserUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviewsInput
    upsert?: UserUpsertWithoutReviewsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReviewsInput, UserUpdateWithoutReviewsInput>, UserUncheckedUpdateWithoutReviewsInput>
  }

  export type UserCreateNestedOneWithoutSavedStoresInput = {
    create?: XOR<UserCreateWithoutSavedStoresInput, UserUncheckedCreateWithoutSavedStoresInput>
    connectOrCreate?: UserCreateOrConnectWithoutSavedStoresInput
    connect?: UserWhereUniqueInput
  }

  export type StoreCreateNestedOneWithoutSavedByInput = {
    create?: XOR<StoreCreateWithoutSavedByInput, StoreUncheckedCreateWithoutSavedByInput>
    connectOrCreate?: StoreCreateOrConnectWithoutSavedByInput
    connect?: StoreWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSavedStoresNestedInput = {
    create?: XOR<UserCreateWithoutSavedStoresInput, UserUncheckedCreateWithoutSavedStoresInput>
    connectOrCreate?: UserCreateOrConnectWithoutSavedStoresInput
    upsert?: UserUpsertWithoutSavedStoresInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSavedStoresInput, UserUpdateWithoutSavedStoresInput>, UserUncheckedUpdateWithoutSavedStoresInput>
  }

  export type StoreUpdateOneRequiredWithoutSavedByNestedInput = {
    create?: XOR<StoreCreateWithoutSavedByInput, StoreUncheckedCreateWithoutSavedByInput>
    connectOrCreate?: StoreCreateOrConnectWithoutSavedByInput
    upsert?: StoreUpsertWithoutSavedByInput
    connect?: StoreWhereUniqueInput
    update?: XOR<XOR<StoreUpdateToOneWithWhereWithoutSavedByInput, StoreUpdateWithoutSavedByInput>, StoreUncheckedUpdateWithoutSavedByInput>
  }

  export type UserCreateNestedOneWithoutSavedProductsInput = {
    create?: XOR<UserCreateWithoutSavedProductsInput, UserUncheckedCreateWithoutSavedProductsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSavedProductsInput
    connect?: UserWhereUniqueInput
  }

  export type ProductCreateNestedOneWithoutSavedByInput = {
    create?: XOR<ProductCreateWithoutSavedByInput, ProductUncheckedCreateWithoutSavedByInput>
    connectOrCreate?: ProductCreateOrConnectWithoutSavedByInput
    connect?: ProductWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSavedProductsNestedInput = {
    create?: XOR<UserCreateWithoutSavedProductsInput, UserUncheckedCreateWithoutSavedProductsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSavedProductsInput
    upsert?: UserUpsertWithoutSavedProductsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSavedProductsInput, UserUpdateWithoutSavedProductsInput>, UserUncheckedUpdateWithoutSavedProductsInput>
  }

  export type ProductUpdateOneRequiredWithoutSavedByNestedInput = {
    create?: XOR<ProductCreateWithoutSavedByInput, ProductUncheckedCreateWithoutSavedByInput>
    connectOrCreate?: ProductCreateOrConnectWithoutSavedByInput
    upsert?: ProductUpsertWithoutSavedByInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutSavedByInput, ProductUpdateWithoutSavedByInput>, ProductUncheckedUpdateWithoutSavedByInput>
  }

  export type StoreCreateNestedOneWithoutClaimsInput = {
    create?: XOR<StoreCreateWithoutClaimsInput, StoreUncheckedCreateWithoutClaimsInput>
    connectOrCreate?: StoreCreateOrConnectWithoutClaimsInput
    connect?: StoreWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutClaimsInput = {
    create?: XOR<UserCreateWithoutClaimsInput, UserUncheckedCreateWithoutClaimsInput>
    connectOrCreate?: UserCreateOrConnectWithoutClaimsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutClaimsReviewedInput = {
    create?: XOR<UserCreateWithoutClaimsReviewedInput, UserUncheckedCreateWithoutClaimsReviewedInput>
    connectOrCreate?: UserCreateOrConnectWithoutClaimsReviewedInput
    connect?: UserWhereUniqueInput
  }

  export type EnumClaimStatusFieldUpdateOperationsInput = {
    set?: $Enums.ClaimStatus
  }

  export type StoreUpdateOneRequiredWithoutClaimsNestedInput = {
    create?: XOR<StoreCreateWithoutClaimsInput, StoreUncheckedCreateWithoutClaimsInput>
    connectOrCreate?: StoreCreateOrConnectWithoutClaimsInput
    upsert?: StoreUpsertWithoutClaimsInput
    connect?: StoreWhereUniqueInput
    update?: XOR<XOR<StoreUpdateToOneWithWhereWithoutClaimsInput, StoreUpdateWithoutClaimsInput>, StoreUncheckedUpdateWithoutClaimsInput>
  }

  export type UserUpdateOneRequiredWithoutClaimsNestedInput = {
    create?: XOR<UserCreateWithoutClaimsInput, UserUncheckedCreateWithoutClaimsInput>
    connectOrCreate?: UserCreateOrConnectWithoutClaimsInput
    upsert?: UserUpsertWithoutClaimsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutClaimsInput, UserUpdateWithoutClaimsInput>, UserUncheckedUpdateWithoutClaimsInput>
  }

  export type UserUpdateOneWithoutClaimsReviewedNestedInput = {
    create?: XOR<UserCreateWithoutClaimsReviewedInput, UserUncheckedCreateWithoutClaimsReviewedInput>
    connectOrCreate?: UserCreateOrConnectWithoutClaimsReviewedInput
    upsert?: UserUpsertWithoutClaimsReviewedInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutClaimsReviewedInput, UserUpdateWithoutClaimsReviewedInput>, UserUncheckedUpdateWithoutClaimsReviewedInput>
  }

  export type StoreCreateNestedOneWithoutPhotosInput = {
    create?: XOR<StoreCreateWithoutPhotosInput, StoreUncheckedCreateWithoutPhotosInput>
    connectOrCreate?: StoreCreateOrConnectWithoutPhotosInput
    connect?: StoreWhereUniqueInput
  }

  export type StoreUpdateOneRequiredWithoutPhotosNestedInput = {
    create?: XOR<StoreCreateWithoutPhotosInput, StoreUncheckedCreateWithoutPhotosInput>
    connectOrCreate?: StoreCreateOrConnectWithoutPhotosInput
    upsert?: StoreUpsertWithoutPhotosInput
    connect?: StoreWhereUniqueInput
    update?: XOR<XOR<StoreUpdateToOneWithWhereWithoutPhotosInput, StoreUpdateWithoutPhotosInput>, StoreUncheckedUpdateWithoutPhotosInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumStoreStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.StoreStatus | EnumStoreStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StoreStatus[] | ListEnumStoreStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StoreStatus[] | ListEnumStoreStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStoreStatusFilter<$PrismaModel> | $Enums.StoreStatus
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedEnumStoreStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StoreStatus | EnumStoreStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StoreStatus[] | ListEnumStoreStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StoreStatus[] | ListEnumStoreStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStoreStatusWithAggregatesFilter<$PrismaModel> | $Enums.StoreStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStoreStatusFilter<$PrismaModel>
    _max?: NestedEnumStoreStatusFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumReviewStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReviewStatus | EnumReviewStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReviewStatus[] | ListEnumReviewStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReviewStatus[] | ListEnumReviewStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReviewStatusFilter<$PrismaModel> | $Enums.ReviewStatus
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumReviewStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReviewStatus | EnumReviewStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReviewStatus[] | ListEnumReviewStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReviewStatus[] | ListEnumReviewStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReviewStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReviewStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReviewStatusFilter<$PrismaModel>
    _max?: NestedEnumReviewStatusFilter<$PrismaModel>
  }

  export type NestedEnumClaimStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ClaimStatus | EnumClaimStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ClaimStatus[] | ListEnumClaimStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ClaimStatus[] | ListEnumClaimStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumClaimStatusFilter<$PrismaModel> | $Enums.ClaimStatus
  }

  export type NestedEnumClaimStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ClaimStatus | EnumClaimStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ClaimStatus[] | ListEnumClaimStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ClaimStatus[] | ListEnumClaimStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumClaimStatusWithAggregatesFilter<$PrismaModel> | $Enums.ClaimStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumClaimStatusFilter<$PrismaModel>
    _max?: NestedEnumClaimStatusFilter<$PrismaModel>
  }

  export type StoreCreateWithoutCreatedByInput = {
    id?: string
    slug: string
    name: string
    description: string
    addressLine: string
    city: string
    postalCode: string
    country?: string
    latitude: number
    longitude: number
    phone?: string | null
    website?: string | null
    email?: string | null
    status?: $Enums.StoreStatus
    fairBadges?: string
    categories?: string
    coverImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    owner?: UserCreateNestedOneWithoutStoresOwnedInput
    hours?: StoreHoursCreateNestedManyWithoutStoreInput
    products?: ProductCreateNestedManyWithoutStoreInput
    reviews?: ReviewCreateNestedManyWithoutStoreInput
    savedBy?: SavedStoreCreateNestedManyWithoutStoreInput
    claims?: StoreClaimCreateNestedManyWithoutStoreInput
    photos?: StorePhotoCreateNestedManyWithoutStoreInput
  }

  export type StoreUncheckedCreateWithoutCreatedByInput = {
    id?: string
    slug: string
    name: string
    description: string
    addressLine: string
    city: string
    postalCode: string
    country?: string
    latitude: number
    longitude: number
    phone?: string | null
    website?: string | null
    email?: string | null
    ownerUserId?: string | null
    status?: $Enums.StoreStatus
    fairBadges?: string
    categories?: string
    coverImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    hours?: StoreHoursUncheckedCreateNestedManyWithoutStoreInput
    products?: ProductUncheckedCreateNestedManyWithoutStoreInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutStoreInput
    savedBy?: SavedStoreUncheckedCreateNestedManyWithoutStoreInput
    claims?: StoreClaimUncheckedCreateNestedManyWithoutStoreInput
    photos?: StorePhotoUncheckedCreateNestedManyWithoutStoreInput
  }

  export type StoreCreateOrConnectWithoutCreatedByInput = {
    where: StoreWhereUniqueInput
    create: XOR<StoreCreateWithoutCreatedByInput, StoreUncheckedCreateWithoutCreatedByInput>
  }

  export type StoreCreateManyCreatedByInputEnvelope = {
    data: StoreCreateManyCreatedByInput | StoreCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type StoreCreateWithoutOwnerInput = {
    id?: string
    slug: string
    name: string
    description: string
    addressLine: string
    city: string
    postalCode: string
    country?: string
    latitude: number
    longitude: number
    phone?: string | null
    website?: string | null
    email?: string | null
    status?: $Enums.StoreStatus
    fairBadges?: string
    categories?: string
    coverImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdBy: UserCreateNestedOneWithoutStoresCreatedInput
    hours?: StoreHoursCreateNestedManyWithoutStoreInput
    products?: ProductCreateNestedManyWithoutStoreInput
    reviews?: ReviewCreateNestedManyWithoutStoreInput
    savedBy?: SavedStoreCreateNestedManyWithoutStoreInput
    claims?: StoreClaimCreateNestedManyWithoutStoreInput
    photos?: StorePhotoCreateNestedManyWithoutStoreInput
  }

  export type StoreUncheckedCreateWithoutOwnerInput = {
    id?: string
    slug: string
    name: string
    description: string
    addressLine: string
    city: string
    postalCode: string
    country?: string
    latitude: number
    longitude: number
    phone?: string | null
    website?: string | null
    email?: string | null
    status?: $Enums.StoreStatus
    fairBadges?: string
    categories?: string
    coverImage?: string | null
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
    hours?: StoreHoursUncheckedCreateNestedManyWithoutStoreInput
    products?: ProductUncheckedCreateNestedManyWithoutStoreInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutStoreInput
    savedBy?: SavedStoreUncheckedCreateNestedManyWithoutStoreInput
    claims?: StoreClaimUncheckedCreateNestedManyWithoutStoreInput
    photos?: StorePhotoUncheckedCreateNestedManyWithoutStoreInput
  }

  export type StoreCreateOrConnectWithoutOwnerInput = {
    where: StoreWhereUniqueInput
    create: XOR<StoreCreateWithoutOwnerInput, StoreUncheckedCreateWithoutOwnerInput>
  }

  export type StoreCreateManyOwnerInputEnvelope = {
    data: StoreCreateManyOwnerInput | StoreCreateManyOwnerInput[]
    skipDuplicates?: boolean
  }

  export type ReviewCreateWithoutUserInput = {
    id?: string
    rating: number
    title?: string | null
    body: string
    ownerReply?: string | null
    ownerReplyAt?: Date | string | null
    status?: $Enums.ReviewStatus
    createdAt?: Date | string
    store: StoreCreateNestedOneWithoutReviewsInput
  }

  export type ReviewUncheckedCreateWithoutUserInput = {
    id?: string
    storeId: string
    rating: number
    title?: string | null
    body: string
    ownerReply?: string | null
    ownerReplyAt?: Date | string | null
    status?: $Enums.ReviewStatus
    createdAt?: Date | string
  }

  export type ReviewCreateOrConnectWithoutUserInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutUserInput, ReviewUncheckedCreateWithoutUserInput>
  }

  export type ReviewCreateManyUserInputEnvelope = {
    data: ReviewCreateManyUserInput | ReviewCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SavedStoreCreateWithoutUserInput = {
    createdAt?: Date | string
    store: StoreCreateNestedOneWithoutSavedByInput
  }

  export type SavedStoreUncheckedCreateWithoutUserInput = {
    storeId: string
    createdAt?: Date | string
  }

  export type SavedStoreCreateOrConnectWithoutUserInput = {
    where: SavedStoreWhereUniqueInput
    create: XOR<SavedStoreCreateWithoutUserInput, SavedStoreUncheckedCreateWithoutUserInput>
  }

  export type SavedStoreCreateManyUserInputEnvelope = {
    data: SavedStoreCreateManyUserInput | SavedStoreCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SavedProductCreateWithoutUserInput = {
    createdAt?: Date | string
    product: ProductCreateNestedOneWithoutSavedByInput
  }

  export type SavedProductUncheckedCreateWithoutUserInput = {
    productId: string
    createdAt?: Date | string
  }

  export type SavedProductCreateOrConnectWithoutUserInput = {
    where: SavedProductWhereUniqueInput
    create: XOR<SavedProductCreateWithoutUserInput, SavedProductUncheckedCreateWithoutUserInput>
  }

  export type SavedProductCreateManyUserInputEnvelope = {
    data: SavedProductCreateManyUserInput | SavedProductCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type StoreClaimCreateWithoutUserInput = {
    id?: string
    proofText: string
    proofDocs?: string | null
    status?: $Enums.ClaimStatus
    createdAt?: Date | string
    store: StoreCreateNestedOneWithoutClaimsInput
    reviewer?: UserCreateNestedOneWithoutClaimsReviewedInput
  }

  export type StoreClaimUncheckedCreateWithoutUserInput = {
    id?: string
    storeId: string
    proofText: string
    proofDocs?: string | null
    status?: $Enums.ClaimStatus
    reviewedBy?: string | null
    createdAt?: Date | string
  }

  export type StoreClaimCreateOrConnectWithoutUserInput = {
    where: StoreClaimWhereUniqueInput
    create: XOR<StoreClaimCreateWithoutUserInput, StoreClaimUncheckedCreateWithoutUserInput>
  }

  export type StoreClaimCreateManyUserInputEnvelope = {
    data: StoreClaimCreateManyUserInput | StoreClaimCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type StoreClaimCreateWithoutReviewerInput = {
    id?: string
    proofText: string
    proofDocs?: string | null
    status?: $Enums.ClaimStatus
    createdAt?: Date | string
    store: StoreCreateNestedOneWithoutClaimsInput
    user: UserCreateNestedOneWithoutClaimsInput
  }

  export type StoreClaimUncheckedCreateWithoutReviewerInput = {
    id?: string
    storeId: string
    userId: string
    proofText: string
    proofDocs?: string | null
    status?: $Enums.ClaimStatus
    createdAt?: Date | string
  }

  export type StoreClaimCreateOrConnectWithoutReviewerInput = {
    where: StoreClaimWhereUniqueInput
    create: XOR<StoreClaimCreateWithoutReviewerInput, StoreClaimUncheckedCreateWithoutReviewerInput>
  }

  export type StoreClaimCreateManyReviewerInputEnvelope = {
    data: StoreClaimCreateManyReviewerInput | StoreClaimCreateManyReviewerInput[]
    skipDuplicates?: boolean
  }

  export type StoreUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: StoreWhereUniqueInput
    update: XOR<StoreUpdateWithoutCreatedByInput, StoreUncheckedUpdateWithoutCreatedByInput>
    create: XOR<StoreCreateWithoutCreatedByInput, StoreUncheckedCreateWithoutCreatedByInput>
  }

  export type StoreUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: StoreWhereUniqueInput
    data: XOR<StoreUpdateWithoutCreatedByInput, StoreUncheckedUpdateWithoutCreatedByInput>
  }

  export type StoreUpdateManyWithWhereWithoutCreatedByInput = {
    where: StoreScalarWhereInput
    data: XOR<StoreUpdateManyMutationInput, StoreUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type StoreScalarWhereInput = {
    AND?: StoreScalarWhereInput | StoreScalarWhereInput[]
    OR?: StoreScalarWhereInput[]
    NOT?: StoreScalarWhereInput | StoreScalarWhereInput[]
    id?: StringFilter<"Store"> | string
    slug?: StringFilter<"Store"> | string
    name?: StringFilter<"Store"> | string
    description?: StringFilter<"Store"> | string
    addressLine?: StringFilter<"Store"> | string
    city?: StringFilter<"Store"> | string
    postalCode?: StringFilter<"Store"> | string
    country?: StringFilter<"Store"> | string
    latitude?: FloatFilter<"Store"> | number
    longitude?: FloatFilter<"Store"> | number
    phone?: StringNullableFilter<"Store"> | string | null
    website?: StringNullableFilter<"Store"> | string | null
    email?: StringNullableFilter<"Store"> | string | null
    ownerUserId?: StringNullableFilter<"Store"> | string | null
    status?: EnumStoreStatusFilter<"Store"> | $Enums.StoreStatus
    fairBadges?: StringFilter<"Store"> | string
    categories?: StringFilter<"Store"> | string
    coverImage?: StringNullableFilter<"Store"> | string | null
    createdById?: StringFilter<"Store"> | string
    createdAt?: DateTimeFilter<"Store"> | Date | string
    updatedAt?: DateTimeFilter<"Store"> | Date | string
  }

  export type StoreUpsertWithWhereUniqueWithoutOwnerInput = {
    where: StoreWhereUniqueInput
    update: XOR<StoreUpdateWithoutOwnerInput, StoreUncheckedUpdateWithoutOwnerInput>
    create: XOR<StoreCreateWithoutOwnerInput, StoreUncheckedCreateWithoutOwnerInput>
  }

  export type StoreUpdateWithWhereUniqueWithoutOwnerInput = {
    where: StoreWhereUniqueInput
    data: XOR<StoreUpdateWithoutOwnerInput, StoreUncheckedUpdateWithoutOwnerInput>
  }

  export type StoreUpdateManyWithWhereWithoutOwnerInput = {
    where: StoreScalarWhereInput
    data: XOR<StoreUpdateManyMutationInput, StoreUncheckedUpdateManyWithoutOwnerInput>
  }

  export type ReviewUpsertWithWhereUniqueWithoutUserInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutUserInput, ReviewUncheckedUpdateWithoutUserInput>
    create: XOR<ReviewCreateWithoutUserInput, ReviewUncheckedCreateWithoutUserInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutUserInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutUserInput, ReviewUncheckedUpdateWithoutUserInput>
  }

  export type ReviewUpdateManyWithWhereWithoutUserInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutUserInput>
  }

  export type ReviewScalarWhereInput = {
    AND?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
    OR?: ReviewScalarWhereInput[]
    NOT?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
    id?: StringFilter<"Review"> | string
    storeId?: StringFilter<"Review"> | string
    userId?: StringFilter<"Review"> | string
    rating?: IntFilter<"Review"> | number
    title?: StringNullableFilter<"Review"> | string | null
    body?: StringFilter<"Review"> | string
    ownerReply?: StringNullableFilter<"Review"> | string | null
    ownerReplyAt?: DateTimeNullableFilter<"Review"> | Date | string | null
    status?: EnumReviewStatusFilter<"Review"> | $Enums.ReviewStatus
    createdAt?: DateTimeFilter<"Review"> | Date | string
  }

  export type SavedStoreUpsertWithWhereUniqueWithoutUserInput = {
    where: SavedStoreWhereUniqueInput
    update: XOR<SavedStoreUpdateWithoutUserInput, SavedStoreUncheckedUpdateWithoutUserInput>
    create: XOR<SavedStoreCreateWithoutUserInput, SavedStoreUncheckedCreateWithoutUserInput>
  }

  export type SavedStoreUpdateWithWhereUniqueWithoutUserInput = {
    where: SavedStoreWhereUniqueInput
    data: XOR<SavedStoreUpdateWithoutUserInput, SavedStoreUncheckedUpdateWithoutUserInput>
  }

  export type SavedStoreUpdateManyWithWhereWithoutUserInput = {
    where: SavedStoreScalarWhereInput
    data: XOR<SavedStoreUpdateManyMutationInput, SavedStoreUncheckedUpdateManyWithoutUserInput>
  }

  export type SavedStoreScalarWhereInput = {
    AND?: SavedStoreScalarWhereInput | SavedStoreScalarWhereInput[]
    OR?: SavedStoreScalarWhereInput[]
    NOT?: SavedStoreScalarWhereInput | SavedStoreScalarWhereInput[]
    userId?: StringFilter<"SavedStore"> | string
    storeId?: StringFilter<"SavedStore"> | string
    createdAt?: DateTimeFilter<"SavedStore"> | Date | string
  }

  export type SavedProductUpsertWithWhereUniqueWithoutUserInput = {
    where: SavedProductWhereUniqueInput
    update: XOR<SavedProductUpdateWithoutUserInput, SavedProductUncheckedUpdateWithoutUserInput>
    create: XOR<SavedProductCreateWithoutUserInput, SavedProductUncheckedCreateWithoutUserInput>
  }

  export type SavedProductUpdateWithWhereUniqueWithoutUserInput = {
    where: SavedProductWhereUniqueInput
    data: XOR<SavedProductUpdateWithoutUserInput, SavedProductUncheckedUpdateWithoutUserInput>
  }

  export type SavedProductUpdateManyWithWhereWithoutUserInput = {
    where: SavedProductScalarWhereInput
    data: XOR<SavedProductUpdateManyMutationInput, SavedProductUncheckedUpdateManyWithoutUserInput>
  }

  export type SavedProductScalarWhereInput = {
    AND?: SavedProductScalarWhereInput | SavedProductScalarWhereInput[]
    OR?: SavedProductScalarWhereInput[]
    NOT?: SavedProductScalarWhereInput | SavedProductScalarWhereInput[]
    userId?: StringFilter<"SavedProduct"> | string
    productId?: StringFilter<"SavedProduct"> | string
    createdAt?: DateTimeFilter<"SavedProduct"> | Date | string
  }

  export type StoreClaimUpsertWithWhereUniqueWithoutUserInput = {
    where: StoreClaimWhereUniqueInput
    update: XOR<StoreClaimUpdateWithoutUserInput, StoreClaimUncheckedUpdateWithoutUserInput>
    create: XOR<StoreClaimCreateWithoutUserInput, StoreClaimUncheckedCreateWithoutUserInput>
  }

  export type StoreClaimUpdateWithWhereUniqueWithoutUserInput = {
    where: StoreClaimWhereUniqueInput
    data: XOR<StoreClaimUpdateWithoutUserInput, StoreClaimUncheckedUpdateWithoutUserInput>
  }

  export type StoreClaimUpdateManyWithWhereWithoutUserInput = {
    where: StoreClaimScalarWhereInput
    data: XOR<StoreClaimUpdateManyMutationInput, StoreClaimUncheckedUpdateManyWithoutUserInput>
  }

  export type StoreClaimScalarWhereInput = {
    AND?: StoreClaimScalarWhereInput | StoreClaimScalarWhereInput[]
    OR?: StoreClaimScalarWhereInput[]
    NOT?: StoreClaimScalarWhereInput | StoreClaimScalarWhereInput[]
    id?: StringFilter<"StoreClaim"> | string
    storeId?: StringFilter<"StoreClaim"> | string
    userId?: StringFilter<"StoreClaim"> | string
    proofText?: StringFilter<"StoreClaim"> | string
    proofDocs?: StringNullableFilter<"StoreClaim"> | string | null
    status?: EnumClaimStatusFilter<"StoreClaim"> | $Enums.ClaimStatus
    reviewedBy?: StringNullableFilter<"StoreClaim"> | string | null
    createdAt?: DateTimeFilter<"StoreClaim"> | Date | string
  }

  export type StoreClaimUpsertWithWhereUniqueWithoutReviewerInput = {
    where: StoreClaimWhereUniqueInput
    update: XOR<StoreClaimUpdateWithoutReviewerInput, StoreClaimUncheckedUpdateWithoutReviewerInput>
    create: XOR<StoreClaimCreateWithoutReviewerInput, StoreClaimUncheckedCreateWithoutReviewerInput>
  }

  export type StoreClaimUpdateWithWhereUniqueWithoutReviewerInput = {
    where: StoreClaimWhereUniqueInput
    data: XOR<StoreClaimUpdateWithoutReviewerInput, StoreClaimUncheckedUpdateWithoutReviewerInput>
  }

  export type StoreClaimUpdateManyWithWhereWithoutReviewerInput = {
    where: StoreClaimScalarWhereInput
    data: XOR<StoreClaimUpdateManyMutationInput, StoreClaimUncheckedUpdateManyWithoutReviewerInput>
  }

  export type UserCreateWithoutStoresOwnedInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    storesCreated?: StoreCreateNestedManyWithoutCreatedByInput
    reviews?: ReviewCreateNestedManyWithoutUserInput
    savedStores?: SavedStoreCreateNestedManyWithoutUserInput
    savedProducts?: SavedProductCreateNestedManyWithoutUserInput
    claims?: StoreClaimCreateNestedManyWithoutUserInput
    claimsReviewed?: StoreClaimCreateNestedManyWithoutReviewerInput
  }

  export type UserUncheckedCreateWithoutStoresOwnedInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    storesCreated?: StoreUncheckedCreateNestedManyWithoutCreatedByInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutUserInput
    savedStores?: SavedStoreUncheckedCreateNestedManyWithoutUserInput
    savedProducts?: SavedProductUncheckedCreateNestedManyWithoutUserInput
    claims?: StoreClaimUncheckedCreateNestedManyWithoutUserInput
    claimsReviewed?: StoreClaimUncheckedCreateNestedManyWithoutReviewerInput
  }

  export type UserCreateOrConnectWithoutStoresOwnedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutStoresOwnedInput, UserUncheckedCreateWithoutStoresOwnedInput>
  }

  export type UserCreateWithoutStoresCreatedInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    storesOwned?: StoreCreateNestedManyWithoutOwnerInput
    reviews?: ReviewCreateNestedManyWithoutUserInput
    savedStores?: SavedStoreCreateNestedManyWithoutUserInput
    savedProducts?: SavedProductCreateNestedManyWithoutUserInput
    claims?: StoreClaimCreateNestedManyWithoutUserInput
    claimsReviewed?: StoreClaimCreateNestedManyWithoutReviewerInput
  }

  export type UserUncheckedCreateWithoutStoresCreatedInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    storesOwned?: StoreUncheckedCreateNestedManyWithoutOwnerInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutUserInput
    savedStores?: SavedStoreUncheckedCreateNestedManyWithoutUserInput
    savedProducts?: SavedProductUncheckedCreateNestedManyWithoutUserInput
    claims?: StoreClaimUncheckedCreateNestedManyWithoutUserInput
    claimsReviewed?: StoreClaimUncheckedCreateNestedManyWithoutReviewerInput
  }

  export type UserCreateOrConnectWithoutStoresCreatedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutStoresCreatedInput, UserUncheckedCreateWithoutStoresCreatedInput>
  }

  export type StoreHoursCreateWithoutStoreInput = {
    id?: string
    dayOfWeek: number
    openTime: string
    closeTime: string
    isClosed?: boolean
  }

  export type StoreHoursUncheckedCreateWithoutStoreInput = {
    id?: string
    dayOfWeek: number
    openTime: string
    closeTime: string
    isClosed?: boolean
  }

  export type StoreHoursCreateOrConnectWithoutStoreInput = {
    where: StoreHoursWhereUniqueInput
    create: XOR<StoreHoursCreateWithoutStoreInput, StoreHoursUncheckedCreateWithoutStoreInput>
  }

  export type StoreHoursCreateManyStoreInputEnvelope = {
    data: StoreHoursCreateManyStoreInput | StoreHoursCreateManyStoreInput[]
    skipDuplicates?: boolean
  }

  export type ProductCreateWithoutStoreInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    price?: number | null
    currency?: string
    category?: string | null
    imageUrl?: string | null
    inStock?: boolean
    createdAt?: Date | string
    savedBy?: SavedProductCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutStoreInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    price?: number | null
    currency?: string
    category?: string | null
    imageUrl?: string | null
    inStock?: boolean
    createdAt?: Date | string
    savedBy?: SavedProductUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutStoreInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutStoreInput, ProductUncheckedCreateWithoutStoreInput>
  }

  export type ProductCreateManyStoreInputEnvelope = {
    data: ProductCreateManyStoreInput | ProductCreateManyStoreInput[]
    skipDuplicates?: boolean
  }

  export type ReviewCreateWithoutStoreInput = {
    id?: string
    rating: number
    title?: string | null
    body: string
    ownerReply?: string | null
    ownerReplyAt?: Date | string | null
    status?: $Enums.ReviewStatus
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutReviewsInput
  }

  export type ReviewUncheckedCreateWithoutStoreInput = {
    id?: string
    userId: string
    rating: number
    title?: string | null
    body: string
    ownerReply?: string | null
    ownerReplyAt?: Date | string | null
    status?: $Enums.ReviewStatus
    createdAt?: Date | string
  }

  export type ReviewCreateOrConnectWithoutStoreInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutStoreInput, ReviewUncheckedCreateWithoutStoreInput>
  }

  export type ReviewCreateManyStoreInputEnvelope = {
    data: ReviewCreateManyStoreInput | ReviewCreateManyStoreInput[]
    skipDuplicates?: boolean
  }

  export type SavedStoreCreateWithoutStoreInput = {
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSavedStoresInput
  }

  export type SavedStoreUncheckedCreateWithoutStoreInput = {
    userId: string
    createdAt?: Date | string
  }

  export type SavedStoreCreateOrConnectWithoutStoreInput = {
    where: SavedStoreWhereUniqueInput
    create: XOR<SavedStoreCreateWithoutStoreInput, SavedStoreUncheckedCreateWithoutStoreInput>
  }

  export type SavedStoreCreateManyStoreInputEnvelope = {
    data: SavedStoreCreateManyStoreInput | SavedStoreCreateManyStoreInput[]
    skipDuplicates?: boolean
  }

  export type StoreClaimCreateWithoutStoreInput = {
    id?: string
    proofText: string
    proofDocs?: string | null
    status?: $Enums.ClaimStatus
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutClaimsInput
    reviewer?: UserCreateNestedOneWithoutClaimsReviewedInput
  }

  export type StoreClaimUncheckedCreateWithoutStoreInput = {
    id?: string
    userId: string
    proofText: string
    proofDocs?: string | null
    status?: $Enums.ClaimStatus
    reviewedBy?: string | null
    createdAt?: Date | string
  }

  export type StoreClaimCreateOrConnectWithoutStoreInput = {
    where: StoreClaimWhereUniqueInput
    create: XOR<StoreClaimCreateWithoutStoreInput, StoreClaimUncheckedCreateWithoutStoreInput>
  }

  export type StoreClaimCreateManyStoreInputEnvelope = {
    data: StoreClaimCreateManyStoreInput | StoreClaimCreateManyStoreInput[]
    skipDuplicates?: boolean
  }

  export type StorePhotoCreateWithoutStoreInput = {
    id?: string
    url: string
    caption?: string | null
    sortOrder?: number
  }

  export type StorePhotoUncheckedCreateWithoutStoreInput = {
    id?: string
    url: string
    caption?: string | null
    sortOrder?: number
  }

  export type StorePhotoCreateOrConnectWithoutStoreInput = {
    where: StorePhotoWhereUniqueInput
    create: XOR<StorePhotoCreateWithoutStoreInput, StorePhotoUncheckedCreateWithoutStoreInput>
  }

  export type StorePhotoCreateManyStoreInputEnvelope = {
    data: StorePhotoCreateManyStoreInput | StorePhotoCreateManyStoreInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutStoresOwnedInput = {
    update: XOR<UserUpdateWithoutStoresOwnedInput, UserUncheckedUpdateWithoutStoresOwnedInput>
    create: XOR<UserCreateWithoutStoresOwnedInput, UserUncheckedCreateWithoutStoresOwnedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutStoresOwnedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutStoresOwnedInput, UserUncheckedUpdateWithoutStoresOwnedInput>
  }

  export type UserUpdateWithoutStoresOwnedInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    storesCreated?: StoreUpdateManyWithoutCreatedByNestedInput
    reviews?: ReviewUpdateManyWithoutUserNestedInput
    savedStores?: SavedStoreUpdateManyWithoutUserNestedInput
    savedProducts?: SavedProductUpdateManyWithoutUserNestedInput
    claims?: StoreClaimUpdateManyWithoutUserNestedInput
    claimsReviewed?: StoreClaimUpdateManyWithoutReviewerNestedInput
  }

  export type UserUncheckedUpdateWithoutStoresOwnedInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    storesCreated?: StoreUncheckedUpdateManyWithoutCreatedByNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutUserNestedInput
    savedStores?: SavedStoreUncheckedUpdateManyWithoutUserNestedInput
    savedProducts?: SavedProductUncheckedUpdateManyWithoutUserNestedInput
    claims?: StoreClaimUncheckedUpdateManyWithoutUserNestedInput
    claimsReviewed?: StoreClaimUncheckedUpdateManyWithoutReviewerNestedInput
  }

  export type UserUpsertWithoutStoresCreatedInput = {
    update: XOR<UserUpdateWithoutStoresCreatedInput, UserUncheckedUpdateWithoutStoresCreatedInput>
    create: XOR<UserCreateWithoutStoresCreatedInput, UserUncheckedCreateWithoutStoresCreatedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutStoresCreatedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutStoresCreatedInput, UserUncheckedUpdateWithoutStoresCreatedInput>
  }

  export type UserUpdateWithoutStoresCreatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    storesOwned?: StoreUpdateManyWithoutOwnerNestedInput
    reviews?: ReviewUpdateManyWithoutUserNestedInput
    savedStores?: SavedStoreUpdateManyWithoutUserNestedInput
    savedProducts?: SavedProductUpdateManyWithoutUserNestedInput
    claims?: StoreClaimUpdateManyWithoutUserNestedInput
    claimsReviewed?: StoreClaimUpdateManyWithoutReviewerNestedInput
  }

  export type UserUncheckedUpdateWithoutStoresCreatedInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    storesOwned?: StoreUncheckedUpdateManyWithoutOwnerNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutUserNestedInput
    savedStores?: SavedStoreUncheckedUpdateManyWithoutUserNestedInput
    savedProducts?: SavedProductUncheckedUpdateManyWithoutUserNestedInput
    claims?: StoreClaimUncheckedUpdateManyWithoutUserNestedInput
    claimsReviewed?: StoreClaimUncheckedUpdateManyWithoutReviewerNestedInput
  }

  export type StoreHoursUpsertWithWhereUniqueWithoutStoreInput = {
    where: StoreHoursWhereUniqueInput
    update: XOR<StoreHoursUpdateWithoutStoreInput, StoreHoursUncheckedUpdateWithoutStoreInput>
    create: XOR<StoreHoursCreateWithoutStoreInput, StoreHoursUncheckedCreateWithoutStoreInput>
  }

  export type StoreHoursUpdateWithWhereUniqueWithoutStoreInput = {
    where: StoreHoursWhereUniqueInput
    data: XOR<StoreHoursUpdateWithoutStoreInput, StoreHoursUncheckedUpdateWithoutStoreInput>
  }

  export type StoreHoursUpdateManyWithWhereWithoutStoreInput = {
    where: StoreHoursScalarWhereInput
    data: XOR<StoreHoursUpdateManyMutationInput, StoreHoursUncheckedUpdateManyWithoutStoreInput>
  }

  export type StoreHoursScalarWhereInput = {
    AND?: StoreHoursScalarWhereInput | StoreHoursScalarWhereInput[]
    OR?: StoreHoursScalarWhereInput[]
    NOT?: StoreHoursScalarWhereInput | StoreHoursScalarWhereInput[]
    id?: StringFilter<"StoreHours"> | string
    storeId?: StringFilter<"StoreHours"> | string
    dayOfWeek?: IntFilter<"StoreHours"> | number
    openTime?: StringFilter<"StoreHours"> | string
    closeTime?: StringFilter<"StoreHours"> | string
    isClosed?: BoolFilter<"StoreHours"> | boolean
  }

  export type ProductUpsertWithWhereUniqueWithoutStoreInput = {
    where: ProductWhereUniqueInput
    update: XOR<ProductUpdateWithoutStoreInput, ProductUncheckedUpdateWithoutStoreInput>
    create: XOR<ProductCreateWithoutStoreInput, ProductUncheckedCreateWithoutStoreInput>
  }

  export type ProductUpdateWithWhereUniqueWithoutStoreInput = {
    where: ProductWhereUniqueInput
    data: XOR<ProductUpdateWithoutStoreInput, ProductUncheckedUpdateWithoutStoreInput>
  }

  export type ProductUpdateManyWithWhereWithoutStoreInput = {
    where: ProductScalarWhereInput
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyWithoutStoreInput>
  }

  export type ProductScalarWhereInput = {
    AND?: ProductScalarWhereInput | ProductScalarWhereInput[]
    OR?: ProductScalarWhereInput[]
    NOT?: ProductScalarWhereInput | ProductScalarWhereInput[]
    id?: StringFilter<"Product"> | string
    storeId?: StringFilter<"Product"> | string
    name?: StringFilter<"Product"> | string
    slug?: StringFilter<"Product"> | string
    description?: StringNullableFilter<"Product"> | string | null
    price?: FloatNullableFilter<"Product"> | number | null
    currency?: StringFilter<"Product"> | string
    category?: StringNullableFilter<"Product"> | string | null
    imageUrl?: StringNullableFilter<"Product"> | string | null
    inStock?: BoolFilter<"Product"> | boolean
    createdAt?: DateTimeFilter<"Product"> | Date | string
  }

  export type ReviewUpsertWithWhereUniqueWithoutStoreInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutStoreInput, ReviewUncheckedUpdateWithoutStoreInput>
    create: XOR<ReviewCreateWithoutStoreInput, ReviewUncheckedCreateWithoutStoreInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutStoreInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutStoreInput, ReviewUncheckedUpdateWithoutStoreInput>
  }

  export type ReviewUpdateManyWithWhereWithoutStoreInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutStoreInput>
  }

  export type SavedStoreUpsertWithWhereUniqueWithoutStoreInput = {
    where: SavedStoreWhereUniqueInput
    update: XOR<SavedStoreUpdateWithoutStoreInput, SavedStoreUncheckedUpdateWithoutStoreInput>
    create: XOR<SavedStoreCreateWithoutStoreInput, SavedStoreUncheckedCreateWithoutStoreInput>
  }

  export type SavedStoreUpdateWithWhereUniqueWithoutStoreInput = {
    where: SavedStoreWhereUniqueInput
    data: XOR<SavedStoreUpdateWithoutStoreInput, SavedStoreUncheckedUpdateWithoutStoreInput>
  }

  export type SavedStoreUpdateManyWithWhereWithoutStoreInput = {
    where: SavedStoreScalarWhereInput
    data: XOR<SavedStoreUpdateManyMutationInput, SavedStoreUncheckedUpdateManyWithoutStoreInput>
  }

  export type StoreClaimUpsertWithWhereUniqueWithoutStoreInput = {
    where: StoreClaimWhereUniqueInput
    update: XOR<StoreClaimUpdateWithoutStoreInput, StoreClaimUncheckedUpdateWithoutStoreInput>
    create: XOR<StoreClaimCreateWithoutStoreInput, StoreClaimUncheckedCreateWithoutStoreInput>
  }

  export type StoreClaimUpdateWithWhereUniqueWithoutStoreInput = {
    where: StoreClaimWhereUniqueInput
    data: XOR<StoreClaimUpdateWithoutStoreInput, StoreClaimUncheckedUpdateWithoutStoreInput>
  }

  export type StoreClaimUpdateManyWithWhereWithoutStoreInput = {
    where: StoreClaimScalarWhereInput
    data: XOR<StoreClaimUpdateManyMutationInput, StoreClaimUncheckedUpdateManyWithoutStoreInput>
  }

  export type StorePhotoUpsertWithWhereUniqueWithoutStoreInput = {
    where: StorePhotoWhereUniqueInput
    update: XOR<StorePhotoUpdateWithoutStoreInput, StorePhotoUncheckedUpdateWithoutStoreInput>
    create: XOR<StorePhotoCreateWithoutStoreInput, StorePhotoUncheckedCreateWithoutStoreInput>
  }

  export type StorePhotoUpdateWithWhereUniqueWithoutStoreInput = {
    where: StorePhotoWhereUniqueInput
    data: XOR<StorePhotoUpdateWithoutStoreInput, StorePhotoUncheckedUpdateWithoutStoreInput>
  }

  export type StorePhotoUpdateManyWithWhereWithoutStoreInput = {
    where: StorePhotoScalarWhereInput
    data: XOR<StorePhotoUpdateManyMutationInput, StorePhotoUncheckedUpdateManyWithoutStoreInput>
  }

  export type StorePhotoScalarWhereInput = {
    AND?: StorePhotoScalarWhereInput | StorePhotoScalarWhereInput[]
    OR?: StorePhotoScalarWhereInput[]
    NOT?: StorePhotoScalarWhereInput | StorePhotoScalarWhereInput[]
    id?: StringFilter<"StorePhoto"> | string
    storeId?: StringFilter<"StorePhoto"> | string
    url?: StringFilter<"StorePhoto"> | string
    caption?: StringNullableFilter<"StorePhoto"> | string | null
    sortOrder?: IntFilter<"StorePhoto"> | number
  }

  export type StoreCreateWithoutHoursInput = {
    id?: string
    slug: string
    name: string
    description: string
    addressLine: string
    city: string
    postalCode: string
    country?: string
    latitude: number
    longitude: number
    phone?: string | null
    website?: string | null
    email?: string | null
    status?: $Enums.StoreStatus
    fairBadges?: string
    categories?: string
    coverImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    owner?: UserCreateNestedOneWithoutStoresOwnedInput
    createdBy: UserCreateNestedOneWithoutStoresCreatedInput
    products?: ProductCreateNestedManyWithoutStoreInput
    reviews?: ReviewCreateNestedManyWithoutStoreInput
    savedBy?: SavedStoreCreateNestedManyWithoutStoreInput
    claims?: StoreClaimCreateNestedManyWithoutStoreInput
    photos?: StorePhotoCreateNestedManyWithoutStoreInput
  }

  export type StoreUncheckedCreateWithoutHoursInput = {
    id?: string
    slug: string
    name: string
    description: string
    addressLine: string
    city: string
    postalCode: string
    country?: string
    latitude: number
    longitude: number
    phone?: string | null
    website?: string | null
    email?: string | null
    ownerUserId?: string | null
    status?: $Enums.StoreStatus
    fairBadges?: string
    categories?: string
    coverImage?: string | null
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
    products?: ProductUncheckedCreateNestedManyWithoutStoreInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutStoreInput
    savedBy?: SavedStoreUncheckedCreateNestedManyWithoutStoreInput
    claims?: StoreClaimUncheckedCreateNestedManyWithoutStoreInput
    photos?: StorePhotoUncheckedCreateNestedManyWithoutStoreInput
  }

  export type StoreCreateOrConnectWithoutHoursInput = {
    where: StoreWhereUniqueInput
    create: XOR<StoreCreateWithoutHoursInput, StoreUncheckedCreateWithoutHoursInput>
  }

  export type StoreUpsertWithoutHoursInput = {
    update: XOR<StoreUpdateWithoutHoursInput, StoreUncheckedUpdateWithoutHoursInput>
    create: XOR<StoreCreateWithoutHoursInput, StoreUncheckedCreateWithoutHoursInput>
    where?: StoreWhereInput
  }

  export type StoreUpdateToOneWithWhereWithoutHoursInput = {
    where?: StoreWhereInput
    data: XOR<StoreUpdateWithoutHoursInput, StoreUncheckedUpdateWithoutHoursInput>
  }

  export type StoreUpdateWithoutHoursInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    addressLine?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStoreStatusFieldUpdateOperationsInput | $Enums.StoreStatus
    fairBadges?: StringFieldUpdateOperationsInput | string
    categories?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneWithoutStoresOwnedNestedInput
    createdBy?: UserUpdateOneRequiredWithoutStoresCreatedNestedInput
    products?: ProductUpdateManyWithoutStoreNestedInput
    reviews?: ReviewUpdateManyWithoutStoreNestedInput
    savedBy?: SavedStoreUpdateManyWithoutStoreNestedInput
    claims?: StoreClaimUpdateManyWithoutStoreNestedInput
    photos?: StorePhotoUpdateManyWithoutStoreNestedInput
  }

  export type StoreUncheckedUpdateWithoutHoursInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    addressLine?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    ownerUserId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStoreStatusFieldUpdateOperationsInput | $Enums.StoreStatus
    fairBadges?: StringFieldUpdateOperationsInput | string
    categories?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    products?: ProductUncheckedUpdateManyWithoutStoreNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutStoreNestedInput
    savedBy?: SavedStoreUncheckedUpdateManyWithoutStoreNestedInput
    claims?: StoreClaimUncheckedUpdateManyWithoutStoreNestedInput
    photos?: StorePhotoUncheckedUpdateManyWithoutStoreNestedInput
  }

  export type StoreCreateWithoutProductsInput = {
    id?: string
    slug: string
    name: string
    description: string
    addressLine: string
    city: string
    postalCode: string
    country?: string
    latitude: number
    longitude: number
    phone?: string | null
    website?: string | null
    email?: string | null
    status?: $Enums.StoreStatus
    fairBadges?: string
    categories?: string
    coverImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    owner?: UserCreateNestedOneWithoutStoresOwnedInput
    createdBy: UserCreateNestedOneWithoutStoresCreatedInput
    hours?: StoreHoursCreateNestedManyWithoutStoreInput
    reviews?: ReviewCreateNestedManyWithoutStoreInput
    savedBy?: SavedStoreCreateNestedManyWithoutStoreInput
    claims?: StoreClaimCreateNestedManyWithoutStoreInput
    photos?: StorePhotoCreateNestedManyWithoutStoreInput
  }

  export type StoreUncheckedCreateWithoutProductsInput = {
    id?: string
    slug: string
    name: string
    description: string
    addressLine: string
    city: string
    postalCode: string
    country?: string
    latitude: number
    longitude: number
    phone?: string | null
    website?: string | null
    email?: string | null
    ownerUserId?: string | null
    status?: $Enums.StoreStatus
    fairBadges?: string
    categories?: string
    coverImage?: string | null
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
    hours?: StoreHoursUncheckedCreateNestedManyWithoutStoreInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutStoreInput
    savedBy?: SavedStoreUncheckedCreateNestedManyWithoutStoreInput
    claims?: StoreClaimUncheckedCreateNestedManyWithoutStoreInput
    photos?: StorePhotoUncheckedCreateNestedManyWithoutStoreInput
  }

  export type StoreCreateOrConnectWithoutProductsInput = {
    where: StoreWhereUniqueInput
    create: XOR<StoreCreateWithoutProductsInput, StoreUncheckedCreateWithoutProductsInput>
  }

  export type SavedProductCreateWithoutProductInput = {
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSavedProductsInput
  }

  export type SavedProductUncheckedCreateWithoutProductInput = {
    userId: string
    createdAt?: Date | string
  }

  export type SavedProductCreateOrConnectWithoutProductInput = {
    where: SavedProductWhereUniqueInput
    create: XOR<SavedProductCreateWithoutProductInput, SavedProductUncheckedCreateWithoutProductInput>
  }

  export type SavedProductCreateManyProductInputEnvelope = {
    data: SavedProductCreateManyProductInput | SavedProductCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type StoreUpsertWithoutProductsInput = {
    update: XOR<StoreUpdateWithoutProductsInput, StoreUncheckedUpdateWithoutProductsInput>
    create: XOR<StoreCreateWithoutProductsInput, StoreUncheckedCreateWithoutProductsInput>
    where?: StoreWhereInput
  }

  export type StoreUpdateToOneWithWhereWithoutProductsInput = {
    where?: StoreWhereInput
    data: XOR<StoreUpdateWithoutProductsInput, StoreUncheckedUpdateWithoutProductsInput>
  }

  export type StoreUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    addressLine?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStoreStatusFieldUpdateOperationsInput | $Enums.StoreStatus
    fairBadges?: StringFieldUpdateOperationsInput | string
    categories?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneWithoutStoresOwnedNestedInput
    createdBy?: UserUpdateOneRequiredWithoutStoresCreatedNestedInput
    hours?: StoreHoursUpdateManyWithoutStoreNestedInput
    reviews?: ReviewUpdateManyWithoutStoreNestedInput
    savedBy?: SavedStoreUpdateManyWithoutStoreNestedInput
    claims?: StoreClaimUpdateManyWithoutStoreNestedInput
    photos?: StorePhotoUpdateManyWithoutStoreNestedInput
  }

  export type StoreUncheckedUpdateWithoutProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    addressLine?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    ownerUserId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStoreStatusFieldUpdateOperationsInput | $Enums.StoreStatus
    fairBadges?: StringFieldUpdateOperationsInput | string
    categories?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hours?: StoreHoursUncheckedUpdateManyWithoutStoreNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutStoreNestedInput
    savedBy?: SavedStoreUncheckedUpdateManyWithoutStoreNestedInput
    claims?: StoreClaimUncheckedUpdateManyWithoutStoreNestedInput
    photos?: StorePhotoUncheckedUpdateManyWithoutStoreNestedInput
  }

  export type SavedProductUpsertWithWhereUniqueWithoutProductInput = {
    where: SavedProductWhereUniqueInput
    update: XOR<SavedProductUpdateWithoutProductInput, SavedProductUncheckedUpdateWithoutProductInput>
    create: XOR<SavedProductCreateWithoutProductInput, SavedProductUncheckedCreateWithoutProductInput>
  }

  export type SavedProductUpdateWithWhereUniqueWithoutProductInput = {
    where: SavedProductWhereUniqueInput
    data: XOR<SavedProductUpdateWithoutProductInput, SavedProductUncheckedUpdateWithoutProductInput>
  }

  export type SavedProductUpdateManyWithWhereWithoutProductInput = {
    where: SavedProductScalarWhereInput
    data: XOR<SavedProductUpdateManyMutationInput, SavedProductUncheckedUpdateManyWithoutProductInput>
  }

  export type StoreCreateWithoutReviewsInput = {
    id?: string
    slug: string
    name: string
    description: string
    addressLine: string
    city: string
    postalCode: string
    country?: string
    latitude: number
    longitude: number
    phone?: string | null
    website?: string | null
    email?: string | null
    status?: $Enums.StoreStatus
    fairBadges?: string
    categories?: string
    coverImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    owner?: UserCreateNestedOneWithoutStoresOwnedInput
    createdBy: UserCreateNestedOneWithoutStoresCreatedInput
    hours?: StoreHoursCreateNestedManyWithoutStoreInput
    products?: ProductCreateNestedManyWithoutStoreInput
    savedBy?: SavedStoreCreateNestedManyWithoutStoreInput
    claims?: StoreClaimCreateNestedManyWithoutStoreInput
    photos?: StorePhotoCreateNestedManyWithoutStoreInput
  }

  export type StoreUncheckedCreateWithoutReviewsInput = {
    id?: string
    slug: string
    name: string
    description: string
    addressLine: string
    city: string
    postalCode: string
    country?: string
    latitude: number
    longitude: number
    phone?: string | null
    website?: string | null
    email?: string | null
    ownerUserId?: string | null
    status?: $Enums.StoreStatus
    fairBadges?: string
    categories?: string
    coverImage?: string | null
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
    hours?: StoreHoursUncheckedCreateNestedManyWithoutStoreInput
    products?: ProductUncheckedCreateNestedManyWithoutStoreInput
    savedBy?: SavedStoreUncheckedCreateNestedManyWithoutStoreInput
    claims?: StoreClaimUncheckedCreateNestedManyWithoutStoreInput
    photos?: StorePhotoUncheckedCreateNestedManyWithoutStoreInput
  }

  export type StoreCreateOrConnectWithoutReviewsInput = {
    where: StoreWhereUniqueInput
    create: XOR<StoreCreateWithoutReviewsInput, StoreUncheckedCreateWithoutReviewsInput>
  }

  export type UserCreateWithoutReviewsInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    storesCreated?: StoreCreateNestedManyWithoutCreatedByInput
    storesOwned?: StoreCreateNestedManyWithoutOwnerInput
    savedStores?: SavedStoreCreateNestedManyWithoutUserInput
    savedProducts?: SavedProductCreateNestedManyWithoutUserInput
    claims?: StoreClaimCreateNestedManyWithoutUserInput
    claimsReviewed?: StoreClaimCreateNestedManyWithoutReviewerInput
  }

  export type UserUncheckedCreateWithoutReviewsInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    storesCreated?: StoreUncheckedCreateNestedManyWithoutCreatedByInput
    storesOwned?: StoreUncheckedCreateNestedManyWithoutOwnerInput
    savedStores?: SavedStoreUncheckedCreateNestedManyWithoutUserInput
    savedProducts?: SavedProductUncheckedCreateNestedManyWithoutUserInput
    claims?: StoreClaimUncheckedCreateNestedManyWithoutUserInput
    claimsReviewed?: StoreClaimUncheckedCreateNestedManyWithoutReviewerInput
  }

  export type UserCreateOrConnectWithoutReviewsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReviewsInput, UserUncheckedCreateWithoutReviewsInput>
  }

  export type StoreUpsertWithoutReviewsInput = {
    update: XOR<StoreUpdateWithoutReviewsInput, StoreUncheckedUpdateWithoutReviewsInput>
    create: XOR<StoreCreateWithoutReviewsInput, StoreUncheckedCreateWithoutReviewsInput>
    where?: StoreWhereInput
  }

  export type StoreUpdateToOneWithWhereWithoutReviewsInput = {
    where?: StoreWhereInput
    data: XOR<StoreUpdateWithoutReviewsInput, StoreUncheckedUpdateWithoutReviewsInput>
  }

  export type StoreUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    addressLine?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStoreStatusFieldUpdateOperationsInput | $Enums.StoreStatus
    fairBadges?: StringFieldUpdateOperationsInput | string
    categories?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneWithoutStoresOwnedNestedInput
    createdBy?: UserUpdateOneRequiredWithoutStoresCreatedNestedInput
    hours?: StoreHoursUpdateManyWithoutStoreNestedInput
    products?: ProductUpdateManyWithoutStoreNestedInput
    savedBy?: SavedStoreUpdateManyWithoutStoreNestedInput
    claims?: StoreClaimUpdateManyWithoutStoreNestedInput
    photos?: StorePhotoUpdateManyWithoutStoreNestedInput
  }

  export type StoreUncheckedUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    addressLine?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    ownerUserId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStoreStatusFieldUpdateOperationsInput | $Enums.StoreStatus
    fairBadges?: StringFieldUpdateOperationsInput | string
    categories?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hours?: StoreHoursUncheckedUpdateManyWithoutStoreNestedInput
    products?: ProductUncheckedUpdateManyWithoutStoreNestedInput
    savedBy?: SavedStoreUncheckedUpdateManyWithoutStoreNestedInput
    claims?: StoreClaimUncheckedUpdateManyWithoutStoreNestedInput
    photos?: StorePhotoUncheckedUpdateManyWithoutStoreNestedInput
  }

  export type UserUpsertWithoutReviewsInput = {
    update: XOR<UserUpdateWithoutReviewsInput, UserUncheckedUpdateWithoutReviewsInput>
    create: XOR<UserCreateWithoutReviewsInput, UserUncheckedCreateWithoutReviewsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReviewsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReviewsInput, UserUncheckedUpdateWithoutReviewsInput>
  }

  export type UserUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    storesCreated?: StoreUpdateManyWithoutCreatedByNestedInput
    storesOwned?: StoreUpdateManyWithoutOwnerNestedInput
    savedStores?: SavedStoreUpdateManyWithoutUserNestedInput
    savedProducts?: SavedProductUpdateManyWithoutUserNestedInput
    claims?: StoreClaimUpdateManyWithoutUserNestedInput
    claimsReviewed?: StoreClaimUpdateManyWithoutReviewerNestedInput
  }

  export type UserUncheckedUpdateWithoutReviewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    storesCreated?: StoreUncheckedUpdateManyWithoutCreatedByNestedInput
    storesOwned?: StoreUncheckedUpdateManyWithoutOwnerNestedInput
    savedStores?: SavedStoreUncheckedUpdateManyWithoutUserNestedInput
    savedProducts?: SavedProductUncheckedUpdateManyWithoutUserNestedInput
    claims?: StoreClaimUncheckedUpdateManyWithoutUserNestedInput
    claimsReviewed?: StoreClaimUncheckedUpdateManyWithoutReviewerNestedInput
  }

  export type UserCreateWithoutSavedStoresInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    storesCreated?: StoreCreateNestedManyWithoutCreatedByInput
    storesOwned?: StoreCreateNestedManyWithoutOwnerInput
    reviews?: ReviewCreateNestedManyWithoutUserInput
    savedProducts?: SavedProductCreateNestedManyWithoutUserInput
    claims?: StoreClaimCreateNestedManyWithoutUserInput
    claimsReviewed?: StoreClaimCreateNestedManyWithoutReviewerInput
  }

  export type UserUncheckedCreateWithoutSavedStoresInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    storesCreated?: StoreUncheckedCreateNestedManyWithoutCreatedByInput
    storesOwned?: StoreUncheckedCreateNestedManyWithoutOwnerInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutUserInput
    savedProducts?: SavedProductUncheckedCreateNestedManyWithoutUserInput
    claims?: StoreClaimUncheckedCreateNestedManyWithoutUserInput
    claimsReviewed?: StoreClaimUncheckedCreateNestedManyWithoutReviewerInput
  }

  export type UserCreateOrConnectWithoutSavedStoresInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSavedStoresInput, UserUncheckedCreateWithoutSavedStoresInput>
  }

  export type StoreCreateWithoutSavedByInput = {
    id?: string
    slug: string
    name: string
    description: string
    addressLine: string
    city: string
    postalCode: string
    country?: string
    latitude: number
    longitude: number
    phone?: string | null
    website?: string | null
    email?: string | null
    status?: $Enums.StoreStatus
    fairBadges?: string
    categories?: string
    coverImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    owner?: UserCreateNestedOneWithoutStoresOwnedInput
    createdBy: UserCreateNestedOneWithoutStoresCreatedInput
    hours?: StoreHoursCreateNestedManyWithoutStoreInput
    products?: ProductCreateNestedManyWithoutStoreInput
    reviews?: ReviewCreateNestedManyWithoutStoreInput
    claims?: StoreClaimCreateNestedManyWithoutStoreInput
    photos?: StorePhotoCreateNestedManyWithoutStoreInput
  }

  export type StoreUncheckedCreateWithoutSavedByInput = {
    id?: string
    slug: string
    name: string
    description: string
    addressLine: string
    city: string
    postalCode: string
    country?: string
    latitude: number
    longitude: number
    phone?: string | null
    website?: string | null
    email?: string | null
    ownerUserId?: string | null
    status?: $Enums.StoreStatus
    fairBadges?: string
    categories?: string
    coverImage?: string | null
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
    hours?: StoreHoursUncheckedCreateNestedManyWithoutStoreInput
    products?: ProductUncheckedCreateNestedManyWithoutStoreInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutStoreInput
    claims?: StoreClaimUncheckedCreateNestedManyWithoutStoreInput
    photos?: StorePhotoUncheckedCreateNestedManyWithoutStoreInput
  }

  export type StoreCreateOrConnectWithoutSavedByInput = {
    where: StoreWhereUniqueInput
    create: XOR<StoreCreateWithoutSavedByInput, StoreUncheckedCreateWithoutSavedByInput>
  }

  export type UserUpsertWithoutSavedStoresInput = {
    update: XOR<UserUpdateWithoutSavedStoresInput, UserUncheckedUpdateWithoutSavedStoresInput>
    create: XOR<UserCreateWithoutSavedStoresInput, UserUncheckedCreateWithoutSavedStoresInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSavedStoresInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSavedStoresInput, UserUncheckedUpdateWithoutSavedStoresInput>
  }

  export type UserUpdateWithoutSavedStoresInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    storesCreated?: StoreUpdateManyWithoutCreatedByNestedInput
    storesOwned?: StoreUpdateManyWithoutOwnerNestedInput
    reviews?: ReviewUpdateManyWithoutUserNestedInput
    savedProducts?: SavedProductUpdateManyWithoutUserNestedInput
    claims?: StoreClaimUpdateManyWithoutUserNestedInput
    claimsReviewed?: StoreClaimUpdateManyWithoutReviewerNestedInput
  }

  export type UserUncheckedUpdateWithoutSavedStoresInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    storesCreated?: StoreUncheckedUpdateManyWithoutCreatedByNestedInput
    storesOwned?: StoreUncheckedUpdateManyWithoutOwnerNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutUserNestedInput
    savedProducts?: SavedProductUncheckedUpdateManyWithoutUserNestedInput
    claims?: StoreClaimUncheckedUpdateManyWithoutUserNestedInput
    claimsReviewed?: StoreClaimUncheckedUpdateManyWithoutReviewerNestedInput
  }

  export type StoreUpsertWithoutSavedByInput = {
    update: XOR<StoreUpdateWithoutSavedByInput, StoreUncheckedUpdateWithoutSavedByInput>
    create: XOR<StoreCreateWithoutSavedByInput, StoreUncheckedCreateWithoutSavedByInput>
    where?: StoreWhereInput
  }

  export type StoreUpdateToOneWithWhereWithoutSavedByInput = {
    where?: StoreWhereInput
    data: XOR<StoreUpdateWithoutSavedByInput, StoreUncheckedUpdateWithoutSavedByInput>
  }

  export type StoreUpdateWithoutSavedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    addressLine?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStoreStatusFieldUpdateOperationsInput | $Enums.StoreStatus
    fairBadges?: StringFieldUpdateOperationsInput | string
    categories?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneWithoutStoresOwnedNestedInput
    createdBy?: UserUpdateOneRequiredWithoutStoresCreatedNestedInput
    hours?: StoreHoursUpdateManyWithoutStoreNestedInput
    products?: ProductUpdateManyWithoutStoreNestedInput
    reviews?: ReviewUpdateManyWithoutStoreNestedInput
    claims?: StoreClaimUpdateManyWithoutStoreNestedInput
    photos?: StorePhotoUpdateManyWithoutStoreNestedInput
  }

  export type StoreUncheckedUpdateWithoutSavedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    addressLine?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    ownerUserId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStoreStatusFieldUpdateOperationsInput | $Enums.StoreStatus
    fairBadges?: StringFieldUpdateOperationsInput | string
    categories?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hours?: StoreHoursUncheckedUpdateManyWithoutStoreNestedInput
    products?: ProductUncheckedUpdateManyWithoutStoreNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutStoreNestedInput
    claims?: StoreClaimUncheckedUpdateManyWithoutStoreNestedInput
    photos?: StorePhotoUncheckedUpdateManyWithoutStoreNestedInput
  }

  export type UserCreateWithoutSavedProductsInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    storesCreated?: StoreCreateNestedManyWithoutCreatedByInput
    storesOwned?: StoreCreateNestedManyWithoutOwnerInput
    reviews?: ReviewCreateNestedManyWithoutUserInput
    savedStores?: SavedStoreCreateNestedManyWithoutUserInput
    claims?: StoreClaimCreateNestedManyWithoutUserInput
    claimsReviewed?: StoreClaimCreateNestedManyWithoutReviewerInput
  }

  export type UserUncheckedCreateWithoutSavedProductsInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    storesCreated?: StoreUncheckedCreateNestedManyWithoutCreatedByInput
    storesOwned?: StoreUncheckedCreateNestedManyWithoutOwnerInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutUserInput
    savedStores?: SavedStoreUncheckedCreateNestedManyWithoutUserInput
    claims?: StoreClaimUncheckedCreateNestedManyWithoutUserInput
    claimsReviewed?: StoreClaimUncheckedCreateNestedManyWithoutReviewerInput
  }

  export type UserCreateOrConnectWithoutSavedProductsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSavedProductsInput, UserUncheckedCreateWithoutSavedProductsInput>
  }

  export type ProductCreateWithoutSavedByInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    price?: number | null
    currency?: string
    category?: string | null
    imageUrl?: string | null
    inStock?: boolean
    createdAt?: Date | string
    store: StoreCreateNestedOneWithoutProductsInput
  }

  export type ProductUncheckedCreateWithoutSavedByInput = {
    id?: string
    storeId: string
    name: string
    slug: string
    description?: string | null
    price?: number | null
    currency?: string
    category?: string | null
    imageUrl?: string | null
    inStock?: boolean
    createdAt?: Date | string
  }

  export type ProductCreateOrConnectWithoutSavedByInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutSavedByInput, ProductUncheckedCreateWithoutSavedByInput>
  }

  export type UserUpsertWithoutSavedProductsInput = {
    update: XOR<UserUpdateWithoutSavedProductsInput, UserUncheckedUpdateWithoutSavedProductsInput>
    create: XOR<UserCreateWithoutSavedProductsInput, UserUncheckedCreateWithoutSavedProductsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSavedProductsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSavedProductsInput, UserUncheckedUpdateWithoutSavedProductsInput>
  }

  export type UserUpdateWithoutSavedProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    storesCreated?: StoreUpdateManyWithoutCreatedByNestedInput
    storesOwned?: StoreUpdateManyWithoutOwnerNestedInput
    reviews?: ReviewUpdateManyWithoutUserNestedInput
    savedStores?: SavedStoreUpdateManyWithoutUserNestedInput
    claims?: StoreClaimUpdateManyWithoutUserNestedInput
    claimsReviewed?: StoreClaimUpdateManyWithoutReviewerNestedInput
  }

  export type UserUncheckedUpdateWithoutSavedProductsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    storesCreated?: StoreUncheckedUpdateManyWithoutCreatedByNestedInput
    storesOwned?: StoreUncheckedUpdateManyWithoutOwnerNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutUserNestedInput
    savedStores?: SavedStoreUncheckedUpdateManyWithoutUserNestedInput
    claims?: StoreClaimUncheckedUpdateManyWithoutUserNestedInput
    claimsReviewed?: StoreClaimUncheckedUpdateManyWithoutReviewerNestedInput
  }

  export type ProductUpsertWithoutSavedByInput = {
    update: XOR<ProductUpdateWithoutSavedByInput, ProductUncheckedUpdateWithoutSavedByInput>
    create: XOR<ProductCreateWithoutSavedByInput, ProductUncheckedCreateWithoutSavedByInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutSavedByInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutSavedByInput, ProductUncheckedUpdateWithoutSavedByInput>
  }

  export type ProductUpdateWithoutSavedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    inStock?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    store?: StoreUpdateOneRequiredWithoutProductsNestedInput
  }

  export type ProductUncheckedUpdateWithoutSavedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    storeId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    inStock?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StoreCreateWithoutClaimsInput = {
    id?: string
    slug: string
    name: string
    description: string
    addressLine: string
    city: string
    postalCode: string
    country?: string
    latitude: number
    longitude: number
    phone?: string | null
    website?: string | null
    email?: string | null
    status?: $Enums.StoreStatus
    fairBadges?: string
    categories?: string
    coverImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    owner?: UserCreateNestedOneWithoutStoresOwnedInput
    createdBy: UserCreateNestedOneWithoutStoresCreatedInput
    hours?: StoreHoursCreateNestedManyWithoutStoreInput
    products?: ProductCreateNestedManyWithoutStoreInput
    reviews?: ReviewCreateNestedManyWithoutStoreInput
    savedBy?: SavedStoreCreateNestedManyWithoutStoreInput
    photos?: StorePhotoCreateNestedManyWithoutStoreInput
  }

  export type StoreUncheckedCreateWithoutClaimsInput = {
    id?: string
    slug: string
    name: string
    description: string
    addressLine: string
    city: string
    postalCode: string
    country?: string
    latitude: number
    longitude: number
    phone?: string | null
    website?: string | null
    email?: string | null
    ownerUserId?: string | null
    status?: $Enums.StoreStatus
    fairBadges?: string
    categories?: string
    coverImage?: string | null
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
    hours?: StoreHoursUncheckedCreateNestedManyWithoutStoreInput
    products?: ProductUncheckedCreateNestedManyWithoutStoreInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutStoreInput
    savedBy?: SavedStoreUncheckedCreateNestedManyWithoutStoreInput
    photos?: StorePhotoUncheckedCreateNestedManyWithoutStoreInput
  }

  export type StoreCreateOrConnectWithoutClaimsInput = {
    where: StoreWhereUniqueInput
    create: XOR<StoreCreateWithoutClaimsInput, StoreUncheckedCreateWithoutClaimsInput>
  }

  export type UserCreateWithoutClaimsInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    storesCreated?: StoreCreateNestedManyWithoutCreatedByInput
    storesOwned?: StoreCreateNestedManyWithoutOwnerInput
    reviews?: ReviewCreateNestedManyWithoutUserInput
    savedStores?: SavedStoreCreateNestedManyWithoutUserInput
    savedProducts?: SavedProductCreateNestedManyWithoutUserInput
    claimsReviewed?: StoreClaimCreateNestedManyWithoutReviewerInput
  }

  export type UserUncheckedCreateWithoutClaimsInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    storesCreated?: StoreUncheckedCreateNestedManyWithoutCreatedByInput
    storesOwned?: StoreUncheckedCreateNestedManyWithoutOwnerInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutUserInput
    savedStores?: SavedStoreUncheckedCreateNestedManyWithoutUserInput
    savedProducts?: SavedProductUncheckedCreateNestedManyWithoutUserInput
    claimsReviewed?: StoreClaimUncheckedCreateNestedManyWithoutReviewerInput
  }

  export type UserCreateOrConnectWithoutClaimsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutClaimsInput, UserUncheckedCreateWithoutClaimsInput>
  }

  export type UserCreateWithoutClaimsReviewedInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    storesCreated?: StoreCreateNestedManyWithoutCreatedByInput
    storesOwned?: StoreCreateNestedManyWithoutOwnerInput
    reviews?: ReviewCreateNestedManyWithoutUserInput
    savedStores?: SavedStoreCreateNestedManyWithoutUserInput
    savedProducts?: SavedProductCreateNestedManyWithoutUserInput
    claims?: StoreClaimCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutClaimsReviewedInput = {
    id?: string
    email: string
    name?: string | null
    avatarUrl?: string | null
    role?: $Enums.UserRole
    createdAt?: Date | string
    storesCreated?: StoreUncheckedCreateNestedManyWithoutCreatedByInput
    storesOwned?: StoreUncheckedCreateNestedManyWithoutOwnerInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutUserInput
    savedStores?: SavedStoreUncheckedCreateNestedManyWithoutUserInput
    savedProducts?: SavedProductUncheckedCreateNestedManyWithoutUserInput
    claims?: StoreClaimUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutClaimsReviewedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutClaimsReviewedInput, UserUncheckedCreateWithoutClaimsReviewedInput>
  }

  export type StoreUpsertWithoutClaimsInput = {
    update: XOR<StoreUpdateWithoutClaimsInput, StoreUncheckedUpdateWithoutClaimsInput>
    create: XOR<StoreCreateWithoutClaimsInput, StoreUncheckedCreateWithoutClaimsInput>
    where?: StoreWhereInput
  }

  export type StoreUpdateToOneWithWhereWithoutClaimsInput = {
    where?: StoreWhereInput
    data: XOR<StoreUpdateWithoutClaimsInput, StoreUncheckedUpdateWithoutClaimsInput>
  }

  export type StoreUpdateWithoutClaimsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    addressLine?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStoreStatusFieldUpdateOperationsInput | $Enums.StoreStatus
    fairBadges?: StringFieldUpdateOperationsInput | string
    categories?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneWithoutStoresOwnedNestedInput
    createdBy?: UserUpdateOneRequiredWithoutStoresCreatedNestedInput
    hours?: StoreHoursUpdateManyWithoutStoreNestedInput
    products?: ProductUpdateManyWithoutStoreNestedInput
    reviews?: ReviewUpdateManyWithoutStoreNestedInput
    savedBy?: SavedStoreUpdateManyWithoutStoreNestedInput
    photos?: StorePhotoUpdateManyWithoutStoreNestedInput
  }

  export type StoreUncheckedUpdateWithoutClaimsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    addressLine?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    ownerUserId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStoreStatusFieldUpdateOperationsInput | $Enums.StoreStatus
    fairBadges?: StringFieldUpdateOperationsInput | string
    categories?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hours?: StoreHoursUncheckedUpdateManyWithoutStoreNestedInput
    products?: ProductUncheckedUpdateManyWithoutStoreNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutStoreNestedInput
    savedBy?: SavedStoreUncheckedUpdateManyWithoutStoreNestedInput
    photos?: StorePhotoUncheckedUpdateManyWithoutStoreNestedInput
  }

  export type UserUpsertWithoutClaimsInput = {
    update: XOR<UserUpdateWithoutClaimsInput, UserUncheckedUpdateWithoutClaimsInput>
    create: XOR<UserCreateWithoutClaimsInput, UserUncheckedCreateWithoutClaimsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutClaimsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutClaimsInput, UserUncheckedUpdateWithoutClaimsInput>
  }

  export type UserUpdateWithoutClaimsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    storesCreated?: StoreUpdateManyWithoutCreatedByNestedInput
    storesOwned?: StoreUpdateManyWithoutOwnerNestedInput
    reviews?: ReviewUpdateManyWithoutUserNestedInput
    savedStores?: SavedStoreUpdateManyWithoutUserNestedInput
    savedProducts?: SavedProductUpdateManyWithoutUserNestedInput
    claimsReviewed?: StoreClaimUpdateManyWithoutReviewerNestedInput
  }

  export type UserUncheckedUpdateWithoutClaimsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    storesCreated?: StoreUncheckedUpdateManyWithoutCreatedByNestedInput
    storesOwned?: StoreUncheckedUpdateManyWithoutOwnerNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutUserNestedInput
    savedStores?: SavedStoreUncheckedUpdateManyWithoutUserNestedInput
    savedProducts?: SavedProductUncheckedUpdateManyWithoutUserNestedInput
    claimsReviewed?: StoreClaimUncheckedUpdateManyWithoutReviewerNestedInput
  }

  export type UserUpsertWithoutClaimsReviewedInput = {
    update: XOR<UserUpdateWithoutClaimsReviewedInput, UserUncheckedUpdateWithoutClaimsReviewedInput>
    create: XOR<UserCreateWithoutClaimsReviewedInput, UserUncheckedCreateWithoutClaimsReviewedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutClaimsReviewedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutClaimsReviewedInput, UserUncheckedUpdateWithoutClaimsReviewedInput>
  }

  export type UserUpdateWithoutClaimsReviewedInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    storesCreated?: StoreUpdateManyWithoutCreatedByNestedInput
    storesOwned?: StoreUpdateManyWithoutOwnerNestedInput
    reviews?: ReviewUpdateManyWithoutUserNestedInput
    savedStores?: SavedStoreUpdateManyWithoutUserNestedInput
    savedProducts?: SavedProductUpdateManyWithoutUserNestedInput
    claims?: StoreClaimUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutClaimsReviewedInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    storesCreated?: StoreUncheckedUpdateManyWithoutCreatedByNestedInput
    storesOwned?: StoreUncheckedUpdateManyWithoutOwnerNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutUserNestedInput
    savedStores?: SavedStoreUncheckedUpdateManyWithoutUserNestedInput
    savedProducts?: SavedProductUncheckedUpdateManyWithoutUserNestedInput
    claims?: StoreClaimUncheckedUpdateManyWithoutUserNestedInput
  }

  export type StoreCreateWithoutPhotosInput = {
    id?: string
    slug: string
    name: string
    description: string
    addressLine: string
    city: string
    postalCode: string
    country?: string
    latitude: number
    longitude: number
    phone?: string | null
    website?: string | null
    email?: string | null
    status?: $Enums.StoreStatus
    fairBadges?: string
    categories?: string
    coverImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    owner?: UserCreateNestedOneWithoutStoresOwnedInput
    createdBy: UserCreateNestedOneWithoutStoresCreatedInput
    hours?: StoreHoursCreateNestedManyWithoutStoreInput
    products?: ProductCreateNestedManyWithoutStoreInput
    reviews?: ReviewCreateNestedManyWithoutStoreInput
    savedBy?: SavedStoreCreateNestedManyWithoutStoreInput
    claims?: StoreClaimCreateNestedManyWithoutStoreInput
  }

  export type StoreUncheckedCreateWithoutPhotosInput = {
    id?: string
    slug: string
    name: string
    description: string
    addressLine: string
    city: string
    postalCode: string
    country?: string
    latitude: number
    longitude: number
    phone?: string | null
    website?: string | null
    email?: string | null
    ownerUserId?: string | null
    status?: $Enums.StoreStatus
    fairBadges?: string
    categories?: string
    coverImage?: string | null
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
    hours?: StoreHoursUncheckedCreateNestedManyWithoutStoreInput
    products?: ProductUncheckedCreateNestedManyWithoutStoreInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutStoreInput
    savedBy?: SavedStoreUncheckedCreateNestedManyWithoutStoreInput
    claims?: StoreClaimUncheckedCreateNestedManyWithoutStoreInput
  }

  export type StoreCreateOrConnectWithoutPhotosInput = {
    where: StoreWhereUniqueInput
    create: XOR<StoreCreateWithoutPhotosInput, StoreUncheckedCreateWithoutPhotosInput>
  }

  export type StoreUpsertWithoutPhotosInput = {
    update: XOR<StoreUpdateWithoutPhotosInput, StoreUncheckedUpdateWithoutPhotosInput>
    create: XOR<StoreCreateWithoutPhotosInput, StoreUncheckedCreateWithoutPhotosInput>
    where?: StoreWhereInput
  }

  export type StoreUpdateToOneWithWhereWithoutPhotosInput = {
    where?: StoreWhereInput
    data: XOR<StoreUpdateWithoutPhotosInput, StoreUncheckedUpdateWithoutPhotosInput>
  }

  export type StoreUpdateWithoutPhotosInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    addressLine?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStoreStatusFieldUpdateOperationsInput | $Enums.StoreStatus
    fairBadges?: StringFieldUpdateOperationsInput | string
    categories?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneWithoutStoresOwnedNestedInput
    createdBy?: UserUpdateOneRequiredWithoutStoresCreatedNestedInput
    hours?: StoreHoursUpdateManyWithoutStoreNestedInput
    products?: ProductUpdateManyWithoutStoreNestedInput
    reviews?: ReviewUpdateManyWithoutStoreNestedInput
    savedBy?: SavedStoreUpdateManyWithoutStoreNestedInput
    claims?: StoreClaimUpdateManyWithoutStoreNestedInput
  }

  export type StoreUncheckedUpdateWithoutPhotosInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    addressLine?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    ownerUserId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStoreStatusFieldUpdateOperationsInput | $Enums.StoreStatus
    fairBadges?: StringFieldUpdateOperationsInput | string
    categories?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hours?: StoreHoursUncheckedUpdateManyWithoutStoreNestedInput
    products?: ProductUncheckedUpdateManyWithoutStoreNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutStoreNestedInput
    savedBy?: SavedStoreUncheckedUpdateManyWithoutStoreNestedInput
    claims?: StoreClaimUncheckedUpdateManyWithoutStoreNestedInput
  }

  export type StoreCreateManyCreatedByInput = {
    id?: string
    slug: string
    name: string
    description: string
    addressLine: string
    city: string
    postalCode: string
    country?: string
    latitude: number
    longitude: number
    phone?: string | null
    website?: string | null
    email?: string | null
    ownerUserId?: string | null
    status?: $Enums.StoreStatus
    fairBadges?: string
    categories?: string
    coverImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StoreCreateManyOwnerInput = {
    id?: string
    slug: string
    name: string
    description: string
    addressLine: string
    city: string
    postalCode: string
    country?: string
    latitude: number
    longitude: number
    phone?: string | null
    website?: string | null
    email?: string | null
    status?: $Enums.StoreStatus
    fairBadges?: string
    categories?: string
    coverImage?: string | null
    createdById: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReviewCreateManyUserInput = {
    id?: string
    storeId: string
    rating: number
    title?: string | null
    body: string
    ownerReply?: string | null
    ownerReplyAt?: Date | string | null
    status?: $Enums.ReviewStatus
    createdAt?: Date | string
  }

  export type SavedStoreCreateManyUserInput = {
    storeId: string
    createdAt?: Date | string
  }

  export type SavedProductCreateManyUserInput = {
    productId: string
    createdAt?: Date | string
  }

  export type StoreClaimCreateManyUserInput = {
    id?: string
    storeId: string
    proofText: string
    proofDocs?: string | null
    status?: $Enums.ClaimStatus
    reviewedBy?: string | null
    createdAt?: Date | string
  }

  export type StoreClaimCreateManyReviewerInput = {
    id?: string
    storeId: string
    userId: string
    proofText: string
    proofDocs?: string | null
    status?: $Enums.ClaimStatus
    createdAt?: Date | string
  }

  export type StoreUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    addressLine?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStoreStatusFieldUpdateOperationsInput | $Enums.StoreStatus
    fairBadges?: StringFieldUpdateOperationsInput | string
    categories?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneWithoutStoresOwnedNestedInput
    hours?: StoreHoursUpdateManyWithoutStoreNestedInput
    products?: ProductUpdateManyWithoutStoreNestedInput
    reviews?: ReviewUpdateManyWithoutStoreNestedInput
    savedBy?: SavedStoreUpdateManyWithoutStoreNestedInput
    claims?: StoreClaimUpdateManyWithoutStoreNestedInput
    photos?: StorePhotoUpdateManyWithoutStoreNestedInput
  }

  export type StoreUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    addressLine?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    ownerUserId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStoreStatusFieldUpdateOperationsInput | $Enums.StoreStatus
    fairBadges?: StringFieldUpdateOperationsInput | string
    categories?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hours?: StoreHoursUncheckedUpdateManyWithoutStoreNestedInput
    products?: ProductUncheckedUpdateManyWithoutStoreNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutStoreNestedInput
    savedBy?: SavedStoreUncheckedUpdateManyWithoutStoreNestedInput
    claims?: StoreClaimUncheckedUpdateManyWithoutStoreNestedInput
    photos?: StorePhotoUncheckedUpdateManyWithoutStoreNestedInput
  }

  export type StoreUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    addressLine?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    ownerUserId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStoreStatusFieldUpdateOperationsInput | $Enums.StoreStatus
    fairBadges?: StringFieldUpdateOperationsInput | string
    categories?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StoreUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    addressLine?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStoreStatusFieldUpdateOperationsInput | $Enums.StoreStatus
    fairBadges?: StringFieldUpdateOperationsInput | string
    categories?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneRequiredWithoutStoresCreatedNestedInput
    hours?: StoreHoursUpdateManyWithoutStoreNestedInput
    products?: ProductUpdateManyWithoutStoreNestedInput
    reviews?: ReviewUpdateManyWithoutStoreNestedInput
    savedBy?: SavedStoreUpdateManyWithoutStoreNestedInput
    claims?: StoreClaimUpdateManyWithoutStoreNestedInput
    photos?: StorePhotoUpdateManyWithoutStoreNestedInput
  }

  export type StoreUncheckedUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    addressLine?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStoreStatusFieldUpdateOperationsInput | $Enums.StoreStatus
    fairBadges?: StringFieldUpdateOperationsInput | string
    categories?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hours?: StoreHoursUncheckedUpdateManyWithoutStoreNestedInput
    products?: ProductUncheckedUpdateManyWithoutStoreNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutStoreNestedInput
    savedBy?: SavedStoreUncheckedUpdateManyWithoutStoreNestedInput
    claims?: StoreClaimUncheckedUpdateManyWithoutStoreNestedInput
    photos?: StorePhotoUncheckedUpdateManyWithoutStoreNestedInput
  }

  export type StoreUncheckedUpdateManyWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    addressLine?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    latitude?: FloatFieldUpdateOperationsInput | number
    longitude?: FloatFieldUpdateOperationsInput | number
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStoreStatusFieldUpdateOperationsInput | $Enums.StoreStatus
    fairBadges?: StringFieldUpdateOperationsInput | string
    categories?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    body?: StringFieldUpdateOperationsInput | string
    ownerReply?: NullableStringFieldUpdateOperationsInput | string | null
    ownerReplyAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    store?: StoreUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ReviewUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    storeId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    body?: StringFieldUpdateOperationsInput | string
    ownerReply?: NullableStringFieldUpdateOperationsInput | string | null
    ownerReplyAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    storeId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    body?: StringFieldUpdateOperationsInput | string
    ownerReply?: NullableStringFieldUpdateOperationsInput | string | null
    ownerReplyAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedStoreUpdateWithoutUserInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    store?: StoreUpdateOneRequiredWithoutSavedByNestedInput
  }

  export type SavedStoreUncheckedUpdateWithoutUserInput = {
    storeId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedStoreUncheckedUpdateManyWithoutUserInput = {
    storeId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedProductUpdateWithoutUserInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutSavedByNestedInput
  }

  export type SavedProductUncheckedUpdateWithoutUserInput = {
    productId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedProductUncheckedUpdateManyWithoutUserInput = {
    productId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StoreClaimUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    proofText?: StringFieldUpdateOperationsInput | string
    proofDocs?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumClaimStatusFieldUpdateOperationsInput | $Enums.ClaimStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    store?: StoreUpdateOneRequiredWithoutClaimsNestedInput
    reviewer?: UserUpdateOneWithoutClaimsReviewedNestedInput
  }

  export type StoreClaimUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    storeId?: StringFieldUpdateOperationsInput | string
    proofText?: StringFieldUpdateOperationsInput | string
    proofDocs?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumClaimStatusFieldUpdateOperationsInput | $Enums.ClaimStatus
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StoreClaimUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    storeId?: StringFieldUpdateOperationsInput | string
    proofText?: StringFieldUpdateOperationsInput | string
    proofDocs?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumClaimStatusFieldUpdateOperationsInput | $Enums.ClaimStatus
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StoreClaimUpdateWithoutReviewerInput = {
    id?: StringFieldUpdateOperationsInput | string
    proofText?: StringFieldUpdateOperationsInput | string
    proofDocs?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumClaimStatusFieldUpdateOperationsInput | $Enums.ClaimStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    store?: StoreUpdateOneRequiredWithoutClaimsNestedInput
    user?: UserUpdateOneRequiredWithoutClaimsNestedInput
  }

  export type StoreClaimUncheckedUpdateWithoutReviewerInput = {
    id?: StringFieldUpdateOperationsInput | string
    storeId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    proofText?: StringFieldUpdateOperationsInput | string
    proofDocs?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumClaimStatusFieldUpdateOperationsInput | $Enums.ClaimStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StoreClaimUncheckedUpdateManyWithoutReviewerInput = {
    id?: StringFieldUpdateOperationsInput | string
    storeId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    proofText?: StringFieldUpdateOperationsInput | string
    proofDocs?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumClaimStatusFieldUpdateOperationsInput | $Enums.ClaimStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StoreHoursCreateManyStoreInput = {
    id?: string
    dayOfWeek: number
    openTime: string
    closeTime: string
    isClosed?: boolean
  }

  export type ProductCreateManyStoreInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    price?: number | null
    currency?: string
    category?: string | null
    imageUrl?: string | null
    inStock?: boolean
    createdAt?: Date | string
  }

  export type ReviewCreateManyStoreInput = {
    id?: string
    userId: string
    rating: number
    title?: string | null
    body: string
    ownerReply?: string | null
    ownerReplyAt?: Date | string | null
    status?: $Enums.ReviewStatus
    createdAt?: Date | string
  }

  export type SavedStoreCreateManyStoreInput = {
    userId: string
    createdAt?: Date | string
  }

  export type StoreClaimCreateManyStoreInput = {
    id?: string
    userId: string
    proofText: string
    proofDocs?: string | null
    status?: $Enums.ClaimStatus
    reviewedBy?: string | null
    createdAt?: Date | string
  }

  export type StorePhotoCreateManyStoreInput = {
    id?: string
    url: string
    caption?: string | null
    sortOrder?: number
  }

  export type StoreHoursUpdateWithoutStoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    openTime?: StringFieldUpdateOperationsInput | string
    closeTime?: StringFieldUpdateOperationsInput | string
    isClosed?: BoolFieldUpdateOperationsInput | boolean
  }

  export type StoreHoursUncheckedUpdateWithoutStoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    openTime?: StringFieldUpdateOperationsInput | string
    closeTime?: StringFieldUpdateOperationsInput | string
    isClosed?: BoolFieldUpdateOperationsInput | boolean
  }

  export type StoreHoursUncheckedUpdateManyWithoutStoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    dayOfWeek?: IntFieldUpdateOperationsInput | number
    openTime?: StringFieldUpdateOperationsInput | string
    closeTime?: StringFieldUpdateOperationsInput | string
    isClosed?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProductUpdateWithoutStoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    inStock?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    savedBy?: SavedProductUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutStoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    inStock?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    savedBy?: SavedProductUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateManyWithoutStoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    currency?: StringFieldUpdateOperationsInput | string
    category?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    inStock?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUpdateWithoutStoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    body?: StringFieldUpdateOperationsInput | string
    ownerReply?: NullableStringFieldUpdateOperationsInput | string | null
    ownerReplyAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ReviewUncheckedUpdateWithoutStoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    body?: StringFieldUpdateOperationsInput | string
    ownerReply?: NullableStringFieldUpdateOperationsInput | string | null
    ownerReplyAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyWithoutStoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    title?: NullableStringFieldUpdateOperationsInput | string | null
    body?: StringFieldUpdateOperationsInput | string
    ownerReply?: NullableStringFieldUpdateOperationsInput | string | null
    ownerReplyAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumReviewStatusFieldUpdateOperationsInput | $Enums.ReviewStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedStoreUpdateWithoutStoreInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSavedStoresNestedInput
  }

  export type SavedStoreUncheckedUpdateWithoutStoreInput = {
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedStoreUncheckedUpdateManyWithoutStoreInput = {
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StoreClaimUpdateWithoutStoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    proofText?: StringFieldUpdateOperationsInput | string
    proofDocs?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumClaimStatusFieldUpdateOperationsInput | $Enums.ClaimStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutClaimsNestedInput
    reviewer?: UserUpdateOneWithoutClaimsReviewedNestedInput
  }

  export type StoreClaimUncheckedUpdateWithoutStoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    proofText?: StringFieldUpdateOperationsInput | string
    proofDocs?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumClaimStatusFieldUpdateOperationsInput | $Enums.ClaimStatus
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StoreClaimUncheckedUpdateManyWithoutStoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    proofText?: StringFieldUpdateOperationsInput | string
    proofDocs?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumClaimStatusFieldUpdateOperationsInput | $Enums.ClaimStatus
    reviewedBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StorePhotoUpdateWithoutStoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type StorePhotoUncheckedUpdateWithoutStoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type StorePhotoUncheckedUpdateManyWithoutStoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    sortOrder?: IntFieldUpdateOperationsInput | number
  }

  export type SavedProductCreateManyProductInput = {
    userId: string
    createdAt?: Date | string
  }

  export type SavedProductUpdateWithoutProductInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSavedProductsNestedInput
  }

  export type SavedProductUncheckedUpdateWithoutProductInput = {
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SavedProductUncheckedUpdateManyWithoutProductInput = {
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}