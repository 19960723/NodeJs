
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model ArticleCategory
 * 
 */
export type ArticleCategory = $Result.DefaultSelection<Prisma.$ArticleCategoryPayload>
/**
 * Model Article
 * 
 */
export type Article = $Result.DefaultSelection<Prisma.$ArticlePayload>
/**
 * Model ArticleComment
 * 
 */
export type ArticleComment = $Result.DefaultSelection<Prisma.$ArticleCommentPayload>
/**
 * Model ArticleLike
 * 
 */
export type ArticleLike = $Result.DefaultSelection<Prisma.$ArticleLikePayload>
/**
 * Model ArticleFavorite
 * 
 */
export type ArticleFavorite = $Result.DefaultSelection<Prisma.$ArticleFavoritePayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Comment
 * 
 */
export type Comment = $Result.DefaultSelection<Prisma.$CommentPayload>
/**
 * Model Post
 * 
 */
export type Post = $Result.DefaultSelection<Prisma.$PostPayload>
/**
 * Model Category
 * 
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more ArticleCategories
 * const articleCategories = await prisma.articleCategory.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more ArticleCategories
   * const articleCategories = await prisma.articleCategory.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
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
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.articleCategory`: Exposes CRUD operations for the **ArticleCategory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ArticleCategories
    * const articleCategories = await prisma.articleCategory.findMany()
    * ```
    */
  get articleCategory(): Prisma.ArticleCategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.article`: Exposes CRUD operations for the **Article** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Articles
    * const articles = await prisma.article.findMany()
    * ```
    */
  get article(): Prisma.ArticleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.articleComment`: Exposes CRUD operations for the **ArticleComment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ArticleComments
    * const articleComments = await prisma.articleComment.findMany()
    * ```
    */
  get articleComment(): Prisma.ArticleCommentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.articleLike`: Exposes CRUD operations for the **ArticleLike** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ArticleLikes
    * const articleLikes = await prisma.articleLike.findMany()
    * ```
    */
  get articleLike(): Prisma.ArticleLikeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.articleFavorite`: Exposes CRUD operations for the **ArticleFavorite** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ArticleFavorites
    * const articleFavorites = await prisma.articleFavorite.findMany()
    * ```
    */
  get articleFavorite(): Prisma.ArticleFavoriteDelegate<ExtArgs, ClientOptions>;

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
   * `prisma.comment`: Exposes CRUD operations for the **Comment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Comments
    * const comments = await prisma.comment.findMany()
    * ```
    */
  get comment(): Prisma.CommentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.post`: Exposes CRUD operations for the **Post** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Posts
    * const posts = await prisma.post.findMany()
    * ```
    */
  get post(): Prisma.PostDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<ExtArgs, ClientOptions>;
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
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

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
   * Prisma Client JS version: 6.11.1
   * Query Engine version: f40f79ec31188888a2e33acda0ecc8fd10a853a9
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


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
      (Without<T, U> & U) | (Without<U, T> & T)
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
    ArticleCategory: 'ArticleCategory',
    Article: 'Article',
    ArticleComment: 'ArticleComment',
    ArticleLike: 'ArticleLike',
    ArticleFavorite: 'ArticleFavorite',
    User: 'User',
    Comment: 'Comment',
    Post: 'Post',
    Category: 'Category'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "articleCategory" | "article" | "articleComment" | "articleLike" | "articleFavorite" | "user" | "comment" | "post" | "category"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      ArticleCategory: {
        payload: Prisma.$ArticleCategoryPayload<ExtArgs>
        fields: Prisma.ArticleCategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ArticleCategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleCategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ArticleCategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleCategoryPayload>
          }
          findFirst: {
            args: Prisma.ArticleCategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleCategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ArticleCategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleCategoryPayload>
          }
          findMany: {
            args: Prisma.ArticleCategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleCategoryPayload>[]
          }
          create: {
            args: Prisma.ArticleCategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleCategoryPayload>
          }
          createMany: {
            args: Prisma.ArticleCategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ArticleCategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleCategoryPayload>
          }
          update: {
            args: Prisma.ArticleCategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleCategoryPayload>
          }
          deleteMany: {
            args: Prisma.ArticleCategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ArticleCategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ArticleCategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleCategoryPayload>
          }
          aggregate: {
            args: Prisma.ArticleCategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateArticleCategory>
          }
          groupBy: {
            args: Prisma.ArticleCategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<ArticleCategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.ArticleCategoryCountArgs<ExtArgs>
            result: $Utils.Optional<ArticleCategoryCountAggregateOutputType> | number
          }
        }
      }
      Article: {
        payload: Prisma.$ArticlePayload<ExtArgs>
        fields: Prisma.ArticleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ArticleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ArticleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          findFirst: {
            args: Prisma.ArticleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ArticleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          findMany: {
            args: Prisma.ArticleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>[]
          }
          create: {
            args: Prisma.ArticleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          createMany: {
            args: Prisma.ArticleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ArticleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          update: {
            args: Prisma.ArticleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          deleteMany: {
            args: Prisma.ArticleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ArticleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ArticleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          aggregate: {
            args: Prisma.ArticleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateArticle>
          }
          groupBy: {
            args: Prisma.ArticleGroupByArgs<ExtArgs>
            result: $Utils.Optional<ArticleGroupByOutputType>[]
          }
          count: {
            args: Prisma.ArticleCountArgs<ExtArgs>
            result: $Utils.Optional<ArticleCountAggregateOutputType> | number
          }
        }
      }
      ArticleComment: {
        payload: Prisma.$ArticleCommentPayload<ExtArgs>
        fields: Prisma.ArticleCommentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ArticleCommentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleCommentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ArticleCommentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleCommentPayload>
          }
          findFirst: {
            args: Prisma.ArticleCommentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleCommentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ArticleCommentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleCommentPayload>
          }
          findMany: {
            args: Prisma.ArticleCommentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleCommentPayload>[]
          }
          create: {
            args: Prisma.ArticleCommentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleCommentPayload>
          }
          createMany: {
            args: Prisma.ArticleCommentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ArticleCommentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleCommentPayload>
          }
          update: {
            args: Prisma.ArticleCommentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleCommentPayload>
          }
          deleteMany: {
            args: Prisma.ArticleCommentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ArticleCommentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ArticleCommentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleCommentPayload>
          }
          aggregate: {
            args: Prisma.ArticleCommentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateArticleComment>
          }
          groupBy: {
            args: Prisma.ArticleCommentGroupByArgs<ExtArgs>
            result: $Utils.Optional<ArticleCommentGroupByOutputType>[]
          }
          count: {
            args: Prisma.ArticleCommentCountArgs<ExtArgs>
            result: $Utils.Optional<ArticleCommentCountAggregateOutputType> | number
          }
        }
      }
      ArticleLike: {
        payload: Prisma.$ArticleLikePayload<ExtArgs>
        fields: Prisma.ArticleLikeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ArticleLikeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleLikePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ArticleLikeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleLikePayload>
          }
          findFirst: {
            args: Prisma.ArticleLikeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleLikePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ArticleLikeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleLikePayload>
          }
          findMany: {
            args: Prisma.ArticleLikeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleLikePayload>[]
          }
          create: {
            args: Prisma.ArticleLikeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleLikePayload>
          }
          createMany: {
            args: Prisma.ArticleLikeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ArticleLikeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleLikePayload>
          }
          update: {
            args: Prisma.ArticleLikeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleLikePayload>
          }
          deleteMany: {
            args: Prisma.ArticleLikeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ArticleLikeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ArticleLikeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleLikePayload>
          }
          aggregate: {
            args: Prisma.ArticleLikeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateArticleLike>
          }
          groupBy: {
            args: Prisma.ArticleLikeGroupByArgs<ExtArgs>
            result: $Utils.Optional<ArticleLikeGroupByOutputType>[]
          }
          count: {
            args: Prisma.ArticleLikeCountArgs<ExtArgs>
            result: $Utils.Optional<ArticleLikeCountAggregateOutputType> | number
          }
        }
      }
      ArticleFavorite: {
        payload: Prisma.$ArticleFavoritePayload<ExtArgs>
        fields: Prisma.ArticleFavoriteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ArticleFavoriteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleFavoritePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ArticleFavoriteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleFavoritePayload>
          }
          findFirst: {
            args: Prisma.ArticleFavoriteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleFavoritePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ArticleFavoriteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleFavoritePayload>
          }
          findMany: {
            args: Prisma.ArticleFavoriteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleFavoritePayload>[]
          }
          create: {
            args: Prisma.ArticleFavoriteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleFavoritePayload>
          }
          createMany: {
            args: Prisma.ArticleFavoriteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ArticleFavoriteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleFavoritePayload>
          }
          update: {
            args: Prisma.ArticleFavoriteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleFavoritePayload>
          }
          deleteMany: {
            args: Prisma.ArticleFavoriteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ArticleFavoriteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ArticleFavoriteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleFavoritePayload>
          }
          aggregate: {
            args: Prisma.ArticleFavoriteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateArticleFavorite>
          }
          groupBy: {
            args: Prisma.ArticleFavoriteGroupByArgs<ExtArgs>
            result: $Utils.Optional<ArticleFavoriteGroupByOutputType>[]
          }
          count: {
            args: Prisma.ArticleFavoriteCountArgs<ExtArgs>
            result: $Utils.Optional<ArticleFavoriteCountAggregateOutputType> | number
          }
        }
      }
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
      Comment: {
        payload: Prisma.$CommentPayload<ExtArgs>
        fields: Prisma.CommentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CommentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CommentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          findFirst: {
            args: Prisma.CommentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CommentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          findMany: {
            args: Prisma.CommentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
          }
          create: {
            args: Prisma.CommentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          createMany: {
            args: Prisma.CommentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CommentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          update: {
            args: Prisma.CommentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          deleteMany: {
            args: Prisma.CommentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CommentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CommentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          aggregate: {
            args: Prisma.CommentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComment>
          }
          groupBy: {
            args: Prisma.CommentGroupByArgs<ExtArgs>
            result: $Utils.Optional<CommentGroupByOutputType>[]
          }
          count: {
            args: Prisma.CommentCountArgs<ExtArgs>
            result: $Utils.Optional<CommentCountAggregateOutputType> | number
          }
        }
      }
      Post: {
        payload: Prisma.$PostPayload<ExtArgs>
        fields: Prisma.PostFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PostFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PostFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          findFirst: {
            args: Prisma.PostFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PostFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          findMany: {
            args: Prisma.PostFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          create: {
            args: Prisma.PostCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          createMany: {
            args: Prisma.PostCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PostDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          update: {
            args: Prisma.PostUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          deleteMany: {
            args: Prisma.PostDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PostUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PostUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          aggregate: {
            args: Prisma.PostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePost>
          }
          groupBy: {
            args: Prisma.PostGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostGroupByOutputType>[]
          }
          count: {
            args: Prisma.PostCountArgs<ExtArgs>
            result: $Utils.Optional<PostCountAggregateOutputType> | number
          }
        }
      }
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>
        fields: Prisma.CategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
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
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
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
  }
  export type GlobalOmitConfig = {
    articleCategory?: ArticleCategoryOmit
    article?: ArticleOmit
    articleComment?: ArticleCommentOmit
    articleLike?: ArticleLikeOmit
    articleFavorite?: ArticleFavoriteOmit
    user?: UserOmit
    comment?: CommentOmit
    post?: PostOmit
    category?: CategoryOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

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

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

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
   * Count Type ArticleCategoryCountOutputType
   */

  export type ArticleCategoryCountOutputType = {
    articles: number
  }

  export type ArticleCategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    articles?: boolean | ArticleCategoryCountOutputTypeCountArticlesArgs
  }

  // Custom InputTypes
  /**
   * ArticleCategoryCountOutputType without action
   */
  export type ArticleCategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleCategoryCountOutputType
     */
    select?: ArticleCategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ArticleCategoryCountOutputType without action
   */
  export type ArticleCategoryCountOutputTypeCountArticlesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArticleWhereInput
  }


  /**
   * Count Type ArticleCountOutputType
   */

  export type ArticleCountOutputType = {
    comments: number
    likes: number
    favorites: number
  }

  export type ArticleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comments?: boolean | ArticleCountOutputTypeCountCommentsArgs
    likes?: boolean | ArticleCountOutputTypeCountLikesArgs
    favorites?: boolean | ArticleCountOutputTypeCountFavoritesArgs
  }

  // Custom InputTypes
  /**
   * ArticleCountOutputType without action
   */
  export type ArticleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleCountOutputType
     */
    select?: ArticleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ArticleCountOutputType without action
   */
  export type ArticleCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArticleCommentWhereInput
  }

  /**
   * ArticleCountOutputType without action
   */
  export type ArticleCountOutputTypeCountLikesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArticleLikeWhereInput
  }

  /**
   * ArticleCountOutputType without action
   */
  export type ArticleCountOutputTypeCountFavoritesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArticleFavoriteWhereInput
  }


  /**
   * Count Type ArticleCommentCountOutputType
   */

  export type ArticleCommentCountOutputType = {
    replies: number
  }

  export type ArticleCommentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    replies?: boolean | ArticleCommentCountOutputTypeCountRepliesArgs
  }

  // Custom InputTypes
  /**
   * ArticleCommentCountOutputType without action
   */
  export type ArticleCommentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleCommentCountOutputType
     */
    select?: ArticleCommentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ArticleCommentCountOutputType without action
   */
  export type ArticleCommentCountOutputTypeCountRepliesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArticleCommentWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    posts: number
    comments: number
    articles: number
    articleComments: number
    articleLikes: number
    articleFavorites: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    posts?: boolean | UserCountOutputTypeCountPostsArgs
    comments?: boolean | UserCountOutputTypeCountCommentsArgs
    articles?: boolean | UserCountOutputTypeCountArticlesArgs
    articleComments?: boolean | UserCountOutputTypeCountArticleCommentsArgs
    articleLikes?: boolean | UserCountOutputTypeCountArticleLikesArgs
    articleFavorites?: boolean | UserCountOutputTypeCountArticleFavoritesArgs
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
  export type UserCountOutputTypeCountPostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountArticlesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArticleWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountArticleCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArticleCommentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountArticleLikesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArticleLikeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountArticleFavoritesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArticleFavoriteWhereInput
  }


  /**
   * Count Type PostCountOutputType
   */

  export type PostCountOutputType = {
    comments: number
    categories: number
  }

  export type PostCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comments?: boolean | PostCountOutputTypeCountCommentsArgs
    categories?: boolean | PostCountOutputTypeCountCategoriesArgs
  }

  // Custom InputTypes
  /**
   * PostCountOutputType without action
   */
  export type PostCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostCountOutputType
     */
    select?: PostCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PostCountOutputType without action
   */
  export type PostCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
  }

  /**
   * PostCountOutputType without action
   */
  export type PostCountOutputTypeCountCategoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
  }


  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    posts: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    posts?: boolean | CategoryCountOutputTypeCountPostsArgs
  }

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountPostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
  }


  /**
   * Models
   */

  /**
   * Model ArticleCategory
   */

  export type AggregateArticleCategory = {
    _count: ArticleCategoryCountAggregateOutputType | null
    _avg: ArticleCategoryAvgAggregateOutputType | null
    _sum: ArticleCategorySumAggregateOutputType | null
    _min: ArticleCategoryMinAggregateOutputType | null
    _max: ArticleCategoryMaxAggregateOutputType | null
  }

  export type ArticleCategoryAvgAggregateOutputType = {
    id: number | null
    sort: number | null
  }

  export type ArticleCategorySumAggregateOutputType = {
    id: number | null
    sort: number | null
  }

  export type ArticleCategoryMinAggregateOutputType = {
    id: number | null
    name: string | null
    sort: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ArticleCategoryMaxAggregateOutputType = {
    id: number | null
    name: string | null
    sort: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ArticleCategoryCountAggregateOutputType = {
    id: number
    name: number
    sort: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ArticleCategoryAvgAggregateInputType = {
    id?: true
    sort?: true
  }

  export type ArticleCategorySumAggregateInputType = {
    id?: true
    sort?: true
  }

  export type ArticleCategoryMinAggregateInputType = {
    id?: true
    name?: true
    sort?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ArticleCategoryMaxAggregateInputType = {
    id?: true
    name?: true
    sort?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ArticleCategoryCountAggregateInputType = {
    id?: true
    name?: true
    sort?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ArticleCategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArticleCategory to aggregate.
     */
    where?: ArticleCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArticleCategories to fetch.
     */
    orderBy?: ArticleCategoryOrderByWithRelationInput | ArticleCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ArticleCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArticleCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArticleCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ArticleCategories
    **/
    _count?: true | ArticleCategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ArticleCategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ArticleCategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ArticleCategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ArticleCategoryMaxAggregateInputType
  }

  export type GetArticleCategoryAggregateType<T extends ArticleCategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateArticleCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArticleCategory[P]>
      : GetScalarType<T[P], AggregateArticleCategory[P]>
  }




  export type ArticleCategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArticleCategoryWhereInput
    orderBy?: ArticleCategoryOrderByWithAggregationInput | ArticleCategoryOrderByWithAggregationInput[]
    by: ArticleCategoryScalarFieldEnum[] | ArticleCategoryScalarFieldEnum
    having?: ArticleCategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ArticleCategoryCountAggregateInputType | true
    _avg?: ArticleCategoryAvgAggregateInputType
    _sum?: ArticleCategorySumAggregateInputType
    _min?: ArticleCategoryMinAggregateInputType
    _max?: ArticleCategoryMaxAggregateInputType
  }

  export type ArticleCategoryGroupByOutputType = {
    id: number
    name: string
    sort: number
    createdAt: Date
    updatedAt: Date
    _count: ArticleCategoryCountAggregateOutputType | null
    _avg: ArticleCategoryAvgAggregateOutputType | null
    _sum: ArticleCategorySumAggregateOutputType | null
    _min: ArticleCategoryMinAggregateOutputType | null
    _max: ArticleCategoryMaxAggregateOutputType | null
  }

  type GetArticleCategoryGroupByPayload<T extends ArticleCategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ArticleCategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ArticleCategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ArticleCategoryGroupByOutputType[P]>
            : GetScalarType<T[P], ArticleCategoryGroupByOutputType[P]>
        }
      >
    >


  export type ArticleCategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    sort?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    articles?: boolean | ArticleCategory$articlesArgs<ExtArgs>
    _count?: boolean | ArticleCategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["articleCategory"]>



  export type ArticleCategorySelectScalar = {
    id?: boolean
    name?: boolean
    sort?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ArticleCategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "sort" | "createdAt" | "updatedAt", ExtArgs["result"]["articleCategory"]>
  export type ArticleCategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    articles?: boolean | ArticleCategory$articlesArgs<ExtArgs>
    _count?: boolean | ArticleCategoryCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ArticleCategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ArticleCategory"
    objects: {
      articles: Prisma.$ArticlePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      sort: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["articleCategory"]>
    composites: {}
  }

  type ArticleCategoryGetPayload<S extends boolean | null | undefined | ArticleCategoryDefaultArgs> = $Result.GetResult<Prisma.$ArticleCategoryPayload, S>

  type ArticleCategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ArticleCategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ArticleCategoryCountAggregateInputType | true
    }

  export interface ArticleCategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ArticleCategory'], meta: { name: 'ArticleCategory' } }
    /**
     * Find zero or one ArticleCategory that matches the filter.
     * @param {ArticleCategoryFindUniqueArgs} args - Arguments to find a ArticleCategory
     * @example
     * // Get one ArticleCategory
     * const articleCategory = await prisma.articleCategory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ArticleCategoryFindUniqueArgs>(args: SelectSubset<T, ArticleCategoryFindUniqueArgs<ExtArgs>>): Prisma__ArticleCategoryClient<$Result.GetResult<Prisma.$ArticleCategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ArticleCategory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ArticleCategoryFindUniqueOrThrowArgs} args - Arguments to find a ArticleCategory
     * @example
     * // Get one ArticleCategory
     * const articleCategory = await prisma.articleCategory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ArticleCategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, ArticleCategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ArticleCategoryClient<$Result.GetResult<Prisma.$ArticleCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ArticleCategory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleCategoryFindFirstArgs} args - Arguments to find a ArticleCategory
     * @example
     * // Get one ArticleCategory
     * const articleCategory = await prisma.articleCategory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ArticleCategoryFindFirstArgs>(args?: SelectSubset<T, ArticleCategoryFindFirstArgs<ExtArgs>>): Prisma__ArticleCategoryClient<$Result.GetResult<Prisma.$ArticleCategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ArticleCategory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleCategoryFindFirstOrThrowArgs} args - Arguments to find a ArticleCategory
     * @example
     * // Get one ArticleCategory
     * const articleCategory = await prisma.articleCategory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ArticleCategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, ArticleCategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__ArticleCategoryClient<$Result.GetResult<Prisma.$ArticleCategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ArticleCategories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleCategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ArticleCategories
     * const articleCategories = await prisma.articleCategory.findMany()
     * 
     * // Get first 10 ArticleCategories
     * const articleCategories = await prisma.articleCategory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const articleCategoryWithIdOnly = await prisma.articleCategory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ArticleCategoryFindManyArgs>(args?: SelectSubset<T, ArticleCategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticleCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ArticleCategory.
     * @param {ArticleCategoryCreateArgs} args - Arguments to create a ArticleCategory.
     * @example
     * // Create one ArticleCategory
     * const ArticleCategory = await prisma.articleCategory.create({
     *   data: {
     *     // ... data to create a ArticleCategory
     *   }
     * })
     * 
     */
    create<T extends ArticleCategoryCreateArgs>(args: SelectSubset<T, ArticleCategoryCreateArgs<ExtArgs>>): Prisma__ArticleCategoryClient<$Result.GetResult<Prisma.$ArticleCategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ArticleCategories.
     * @param {ArticleCategoryCreateManyArgs} args - Arguments to create many ArticleCategories.
     * @example
     * // Create many ArticleCategories
     * const articleCategory = await prisma.articleCategory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ArticleCategoryCreateManyArgs>(args?: SelectSubset<T, ArticleCategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ArticleCategory.
     * @param {ArticleCategoryDeleteArgs} args - Arguments to delete one ArticleCategory.
     * @example
     * // Delete one ArticleCategory
     * const ArticleCategory = await prisma.articleCategory.delete({
     *   where: {
     *     // ... filter to delete one ArticleCategory
     *   }
     * })
     * 
     */
    delete<T extends ArticleCategoryDeleteArgs>(args: SelectSubset<T, ArticleCategoryDeleteArgs<ExtArgs>>): Prisma__ArticleCategoryClient<$Result.GetResult<Prisma.$ArticleCategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ArticleCategory.
     * @param {ArticleCategoryUpdateArgs} args - Arguments to update one ArticleCategory.
     * @example
     * // Update one ArticleCategory
     * const articleCategory = await prisma.articleCategory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ArticleCategoryUpdateArgs>(args: SelectSubset<T, ArticleCategoryUpdateArgs<ExtArgs>>): Prisma__ArticleCategoryClient<$Result.GetResult<Prisma.$ArticleCategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ArticleCategories.
     * @param {ArticleCategoryDeleteManyArgs} args - Arguments to filter ArticleCategories to delete.
     * @example
     * // Delete a few ArticleCategories
     * const { count } = await prisma.articleCategory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ArticleCategoryDeleteManyArgs>(args?: SelectSubset<T, ArticleCategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ArticleCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleCategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ArticleCategories
     * const articleCategory = await prisma.articleCategory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ArticleCategoryUpdateManyArgs>(args: SelectSubset<T, ArticleCategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ArticleCategory.
     * @param {ArticleCategoryUpsertArgs} args - Arguments to update or create a ArticleCategory.
     * @example
     * // Update or create a ArticleCategory
     * const articleCategory = await prisma.articleCategory.upsert({
     *   create: {
     *     // ... data to create a ArticleCategory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ArticleCategory we want to update
     *   }
     * })
     */
    upsert<T extends ArticleCategoryUpsertArgs>(args: SelectSubset<T, ArticleCategoryUpsertArgs<ExtArgs>>): Prisma__ArticleCategoryClient<$Result.GetResult<Prisma.$ArticleCategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ArticleCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleCategoryCountArgs} args - Arguments to filter ArticleCategories to count.
     * @example
     * // Count the number of ArticleCategories
     * const count = await prisma.articleCategory.count({
     *   where: {
     *     // ... the filter for the ArticleCategories we want to count
     *   }
     * })
    **/
    count<T extends ArticleCategoryCountArgs>(
      args?: Subset<T, ArticleCategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ArticleCategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ArticleCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleCategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ArticleCategoryAggregateArgs>(args: Subset<T, ArticleCategoryAggregateArgs>): Prisma.PrismaPromise<GetArticleCategoryAggregateType<T>>

    /**
     * Group by ArticleCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleCategoryGroupByArgs} args - Group by arguments.
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
      T extends ArticleCategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ArticleCategoryGroupByArgs['orderBy'] }
        : { orderBy?: ArticleCategoryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ArticleCategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetArticleCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ArticleCategory model
   */
  readonly fields: ArticleCategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ArticleCategory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ArticleCategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    articles<T extends ArticleCategory$articlesArgs<ExtArgs> = {}>(args?: Subset<T, ArticleCategory$articlesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the ArticleCategory model
   */
  interface ArticleCategoryFieldRefs {
    readonly id: FieldRef<"ArticleCategory", 'Int'>
    readonly name: FieldRef<"ArticleCategory", 'String'>
    readonly sort: FieldRef<"ArticleCategory", 'Int'>
    readonly createdAt: FieldRef<"ArticleCategory", 'DateTime'>
    readonly updatedAt: FieldRef<"ArticleCategory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ArticleCategory findUnique
   */
  export type ArticleCategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleCategory
     */
    select?: ArticleCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleCategory
     */
    omit?: ArticleCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ArticleCategory to fetch.
     */
    where: ArticleCategoryWhereUniqueInput
  }

  /**
   * ArticleCategory findUniqueOrThrow
   */
  export type ArticleCategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleCategory
     */
    select?: ArticleCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleCategory
     */
    omit?: ArticleCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ArticleCategory to fetch.
     */
    where: ArticleCategoryWhereUniqueInput
  }

  /**
   * ArticleCategory findFirst
   */
  export type ArticleCategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleCategory
     */
    select?: ArticleCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleCategory
     */
    omit?: ArticleCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ArticleCategory to fetch.
     */
    where?: ArticleCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArticleCategories to fetch.
     */
    orderBy?: ArticleCategoryOrderByWithRelationInput | ArticleCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArticleCategories.
     */
    cursor?: ArticleCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArticleCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArticleCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArticleCategories.
     */
    distinct?: ArticleCategoryScalarFieldEnum | ArticleCategoryScalarFieldEnum[]
  }

  /**
   * ArticleCategory findFirstOrThrow
   */
  export type ArticleCategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleCategory
     */
    select?: ArticleCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleCategory
     */
    omit?: ArticleCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ArticleCategory to fetch.
     */
    where?: ArticleCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArticleCategories to fetch.
     */
    orderBy?: ArticleCategoryOrderByWithRelationInput | ArticleCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArticleCategories.
     */
    cursor?: ArticleCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArticleCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArticleCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArticleCategories.
     */
    distinct?: ArticleCategoryScalarFieldEnum | ArticleCategoryScalarFieldEnum[]
  }

  /**
   * ArticleCategory findMany
   */
  export type ArticleCategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleCategory
     */
    select?: ArticleCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleCategory
     */
    omit?: ArticleCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ArticleCategories to fetch.
     */
    where?: ArticleCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArticleCategories to fetch.
     */
    orderBy?: ArticleCategoryOrderByWithRelationInput | ArticleCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ArticleCategories.
     */
    cursor?: ArticleCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArticleCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArticleCategories.
     */
    skip?: number
    distinct?: ArticleCategoryScalarFieldEnum | ArticleCategoryScalarFieldEnum[]
  }

  /**
   * ArticleCategory create
   */
  export type ArticleCategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleCategory
     */
    select?: ArticleCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleCategory
     */
    omit?: ArticleCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleCategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a ArticleCategory.
     */
    data: XOR<ArticleCategoryCreateInput, ArticleCategoryUncheckedCreateInput>
  }

  /**
   * ArticleCategory createMany
   */
  export type ArticleCategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ArticleCategories.
     */
    data: ArticleCategoryCreateManyInput | ArticleCategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ArticleCategory update
   */
  export type ArticleCategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleCategory
     */
    select?: ArticleCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleCategory
     */
    omit?: ArticleCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleCategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a ArticleCategory.
     */
    data: XOR<ArticleCategoryUpdateInput, ArticleCategoryUncheckedUpdateInput>
    /**
     * Choose, which ArticleCategory to update.
     */
    where: ArticleCategoryWhereUniqueInput
  }

  /**
   * ArticleCategory updateMany
   */
  export type ArticleCategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ArticleCategories.
     */
    data: XOR<ArticleCategoryUpdateManyMutationInput, ArticleCategoryUncheckedUpdateManyInput>
    /**
     * Filter which ArticleCategories to update
     */
    where?: ArticleCategoryWhereInput
    /**
     * Limit how many ArticleCategories to update.
     */
    limit?: number
  }

  /**
   * ArticleCategory upsert
   */
  export type ArticleCategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleCategory
     */
    select?: ArticleCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleCategory
     */
    omit?: ArticleCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleCategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the ArticleCategory to update in case it exists.
     */
    where: ArticleCategoryWhereUniqueInput
    /**
     * In case the ArticleCategory found by the `where` argument doesn't exist, create a new ArticleCategory with this data.
     */
    create: XOR<ArticleCategoryCreateInput, ArticleCategoryUncheckedCreateInput>
    /**
     * In case the ArticleCategory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ArticleCategoryUpdateInput, ArticleCategoryUncheckedUpdateInput>
  }

  /**
   * ArticleCategory delete
   */
  export type ArticleCategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleCategory
     */
    select?: ArticleCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleCategory
     */
    omit?: ArticleCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleCategoryInclude<ExtArgs> | null
    /**
     * Filter which ArticleCategory to delete.
     */
    where: ArticleCategoryWhereUniqueInput
  }

  /**
   * ArticleCategory deleteMany
   */
  export type ArticleCategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArticleCategories to delete
     */
    where?: ArticleCategoryWhereInput
    /**
     * Limit how many ArticleCategories to delete.
     */
    limit?: number
  }

  /**
   * ArticleCategory.articles
   */
  export type ArticleCategory$articlesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    where?: ArticleWhereInput
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    cursor?: ArticleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ArticleScalarFieldEnum | ArticleScalarFieldEnum[]
  }

  /**
   * ArticleCategory without action
   */
  export type ArticleCategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleCategory
     */
    select?: ArticleCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleCategory
     */
    omit?: ArticleCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleCategoryInclude<ExtArgs> | null
  }


  /**
   * Model Article
   */

  export type AggregateArticle = {
    _count: ArticleCountAggregateOutputType | null
    _avg: ArticleAvgAggregateOutputType | null
    _sum: ArticleSumAggregateOutputType | null
    _min: ArticleMinAggregateOutputType | null
    _max: ArticleMaxAggregateOutputType | null
  }

  export type ArticleAvgAggregateOutputType = {
    id: number | null
    authorId: number | null
    categoryId: number | null
    views: number | null
    likesCount: number | null
    favCount: number | null
  }

  export type ArticleSumAggregateOutputType = {
    id: number | null
    authorId: number | null
    categoryId: number | null
    views: number | null
    likesCount: number | null
    favCount: number | null
  }

  export type ArticleMinAggregateOutputType = {
    id: number | null
    title: string | null
    content: string | null
    coverImage: string | null
    authorId: number | null
    categoryId: number | null
    views: number | null
    likesCount: number | null
    favCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ArticleMaxAggregateOutputType = {
    id: number | null
    title: string | null
    content: string | null
    coverImage: string | null
    authorId: number | null
    categoryId: number | null
    views: number | null
    likesCount: number | null
    favCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ArticleCountAggregateOutputType = {
    id: number
    title: number
    content: number
    coverImage: number
    authorId: number
    categoryId: number
    views: number
    likesCount: number
    favCount: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ArticleAvgAggregateInputType = {
    id?: true
    authorId?: true
    categoryId?: true
    views?: true
    likesCount?: true
    favCount?: true
  }

  export type ArticleSumAggregateInputType = {
    id?: true
    authorId?: true
    categoryId?: true
    views?: true
    likesCount?: true
    favCount?: true
  }

  export type ArticleMinAggregateInputType = {
    id?: true
    title?: true
    content?: true
    coverImage?: true
    authorId?: true
    categoryId?: true
    views?: true
    likesCount?: true
    favCount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ArticleMaxAggregateInputType = {
    id?: true
    title?: true
    content?: true
    coverImage?: true
    authorId?: true
    categoryId?: true
    views?: true
    likesCount?: true
    favCount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ArticleCountAggregateInputType = {
    id?: true
    title?: true
    content?: true
    coverImage?: true
    authorId?: true
    categoryId?: true
    views?: true
    likesCount?: true
    favCount?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ArticleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Article to aggregate.
     */
    where?: ArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Articles to fetch.
     */
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Articles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Articles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Articles
    **/
    _count?: true | ArticleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ArticleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ArticleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ArticleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ArticleMaxAggregateInputType
  }

  export type GetArticleAggregateType<T extends ArticleAggregateArgs> = {
        [P in keyof T & keyof AggregateArticle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArticle[P]>
      : GetScalarType<T[P], AggregateArticle[P]>
  }




  export type ArticleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArticleWhereInput
    orderBy?: ArticleOrderByWithAggregationInput | ArticleOrderByWithAggregationInput[]
    by: ArticleScalarFieldEnum[] | ArticleScalarFieldEnum
    having?: ArticleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ArticleCountAggregateInputType | true
    _avg?: ArticleAvgAggregateInputType
    _sum?: ArticleSumAggregateInputType
    _min?: ArticleMinAggregateInputType
    _max?: ArticleMaxAggregateInputType
  }

  export type ArticleGroupByOutputType = {
    id: number
    title: string
    content: string
    coverImage: string | null
    authorId: number
    categoryId: number
    views: number
    likesCount: number
    favCount: number
    createdAt: Date
    updatedAt: Date
    _count: ArticleCountAggregateOutputType | null
    _avg: ArticleAvgAggregateOutputType | null
    _sum: ArticleSumAggregateOutputType | null
    _min: ArticleMinAggregateOutputType | null
    _max: ArticleMaxAggregateOutputType | null
  }

  type GetArticleGroupByPayload<T extends ArticleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ArticleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ArticleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ArticleGroupByOutputType[P]>
            : GetScalarType<T[P], ArticleGroupByOutputType[P]>
        }
      >
    >


  export type ArticleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    coverImage?: boolean
    authorId?: boolean
    categoryId?: boolean
    views?: boolean
    likesCount?: boolean
    favCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    category?: boolean | ArticleCategoryDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
    comments?: boolean | Article$commentsArgs<ExtArgs>
    likes?: boolean | Article$likesArgs<ExtArgs>
    favorites?: boolean | Article$favoritesArgs<ExtArgs>
    _count?: boolean | ArticleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["article"]>



  export type ArticleSelectScalar = {
    id?: boolean
    title?: boolean
    content?: boolean
    coverImage?: boolean
    authorId?: boolean
    categoryId?: boolean
    views?: boolean
    likesCount?: boolean
    favCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ArticleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "content" | "coverImage" | "authorId" | "categoryId" | "views" | "likesCount" | "favCount" | "createdAt" | "updatedAt", ExtArgs["result"]["article"]>
  export type ArticleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | ArticleCategoryDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
    comments?: boolean | Article$commentsArgs<ExtArgs>
    likes?: boolean | Article$likesArgs<ExtArgs>
    favorites?: boolean | Article$favoritesArgs<ExtArgs>
    _count?: boolean | ArticleCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ArticlePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Article"
    objects: {
      category: Prisma.$ArticleCategoryPayload<ExtArgs>
      author: Prisma.$UserPayload<ExtArgs>
      comments: Prisma.$ArticleCommentPayload<ExtArgs>[]
      likes: Prisma.$ArticleLikePayload<ExtArgs>[]
      favorites: Prisma.$ArticleFavoritePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      content: string
      coverImage: string | null
      authorId: number
      categoryId: number
      views: number
      likesCount: number
      favCount: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["article"]>
    composites: {}
  }

  type ArticleGetPayload<S extends boolean | null | undefined | ArticleDefaultArgs> = $Result.GetResult<Prisma.$ArticlePayload, S>

  type ArticleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ArticleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ArticleCountAggregateInputType | true
    }

  export interface ArticleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Article'], meta: { name: 'Article' } }
    /**
     * Find zero or one Article that matches the filter.
     * @param {ArticleFindUniqueArgs} args - Arguments to find a Article
     * @example
     * // Get one Article
     * const article = await prisma.article.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ArticleFindUniqueArgs>(args: SelectSubset<T, ArticleFindUniqueArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Article that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ArticleFindUniqueOrThrowArgs} args - Arguments to find a Article
     * @example
     * // Get one Article
     * const article = await prisma.article.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ArticleFindUniqueOrThrowArgs>(args: SelectSubset<T, ArticleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Article that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleFindFirstArgs} args - Arguments to find a Article
     * @example
     * // Get one Article
     * const article = await prisma.article.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ArticleFindFirstArgs>(args?: SelectSubset<T, ArticleFindFirstArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Article that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleFindFirstOrThrowArgs} args - Arguments to find a Article
     * @example
     * // Get one Article
     * const article = await prisma.article.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ArticleFindFirstOrThrowArgs>(args?: SelectSubset<T, ArticleFindFirstOrThrowArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Articles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Articles
     * const articles = await prisma.article.findMany()
     * 
     * // Get first 10 Articles
     * const articles = await prisma.article.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const articleWithIdOnly = await prisma.article.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ArticleFindManyArgs>(args?: SelectSubset<T, ArticleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Article.
     * @param {ArticleCreateArgs} args - Arguments to create a Article.
     * @example
     * // Create one Article
     * const Article = await prisma.article.create({
     *   data: {
     *     // ... data to create a Article
     *   }
     * })
     * 
     */
    create<T extends ArticleCreateArgs>(args: SelectSubset<T, ArticleCreateArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Articles.
     * @param {ArticleCreateManyArgs} args - Arguments to create many Articles.
     * @example
     * // Create many Articles
     * const article = await prisma.article.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ArticleCreateManyArgs>(args?: SelectSubset<T, ArticleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Article.
     * @param {ArticleDeleteArgs} args - Arguments to delete one Article.
     * @example
     * // Delete one Article
     * const Article = await prisma.article.delete({
     *   where: {
     *     // ... filter to delete one Article
     *   }
     * })
     * 
     */
    delete<T extends ArticleDeleteArgs>(args: SelectSubset<T, ArticleDeleteArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Article.
     * @param {ArticleUpdateArgs} args - Arguments to update one Article.
     * @example
     * // Update one Article
     * const article = await prisma.article.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ArticleUpdateArgs>(args: SelectSubset<T, ArticleUpdateArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Articles.
     * @param {ArticleDeleteManyArgs} args - Arguments to filter Articles to delete.
     * @example
     * // Delete a few Articles
     * const { count } = await prisma.article.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ArticleDeleteManyArgs>(args?: SelectSubset<T, ArticleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Articles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Articles
     * const article = await prisma.article.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ArticleUpdateManyArgs>(args: SelectSubset<T, ArticleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Article.
     * @param {ArticleUpsertArgs} args - Arguments to update or create a Article.
     * @example
     * // Update or create a Article
     * const article = await prisma.article.upsert({
     *   create: {
     *     // ... data to create a Article
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Article we want to update
     *   }
     * })
     */
    upsert<T extends ArticleUpsertArgs>(args: SelectSubset<T, ArticleUpsertArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Articles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleCountArgs} args - Arguments to filter Articles to count.
     * @example
     * // Count the number of Articles
     * const count = await prisma.article.count({
     *   where: {
     *     // ... the filter for the Articles we want to count
     *   }
     * })
    **/
    count<T extends ArticleCountArgs>(
      args?: Subset<T, ArticleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ArticleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Article.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ArticleAggregateArgs>(args: Subset<T, ArticleAggregateArgs>): Prisma.PrismaPromise<GetArticleAggregateType<T>>

    /**
     * Group by Article.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleGroupByArgs} args - Group by arguments.
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
      T extends ArticleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ArticleGroupByArgs['orderBy'] }
        : { orderBy?: ArticleGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ArticleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetArticleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Article model
   */
  readonly fields: ArticleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Article.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ArticleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    category<T extends ArticleCategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ArticleCategoryDefaultArgs<ExtArgs>>): Prisma__ArticleCategoryClient<$Result.GetResult<Prisma.$ArticleCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    author<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    comments<T extends Article$commentsArgs<ExtArgs> = {}>(args?: Subset<T, Article$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticleCommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    likes<T extends Article$likesArgs<ExtArgs> = {}>(args?: Subset<T, Article$likesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticleLikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    favorites<T extends Article$favoritesArgs<ExtArgs> = {}>(args?: Subset<T, Article$favoritesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticleFavoritePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Article model
   */
  interface ArticleFieldRefs {
    readonly id: FieldRef<"Article", 'Int'>
    readonly title: FieldRef<"Article", 'String'>
    readonly content: FieldRef<"Article", 'String'>
    readonly coverImage: FieldRef<"Article", 'String'>
    readonly authorId: FieldRef<"Article", 'Int'>
    readonly categoryId: FieldRef<"Article", 'Int'>
    readonly views: FieldRef<"Article", 'Int'>
    readonly likesCount: FieldRef<"Article", 'Int'>
    readonly favCount: FieldRef<"Article", 'Int'>
    readonly createdAt: FieldRef<"Article", 'DateTime'>
    readonly updatedAt: FieldRef<"Article", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Article findUnique
   */
  export type ArticleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter, which Article to fetch.
     */
    where: ArticleWhereUniqueInput
  }

  /**
   * Article findUniqueOrThrow
   */
  export type ArticleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter, which Article to fetch.
     */
    where: ArticleWhereUniqueInput
  }

  /**
   * Article findFirst
   */
  export type ArticleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter, which Article to fetch.
     */
    where?: ArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Articles to fetch.
     */
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Articles.
     */
    cursor?: ArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Articles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Articles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Articles.
     */
    distinct?: ArticleScalarFieldEnum | ArticleScalarFieldEnum[]
  }

  /**
   * Article findFirstOrThrow
   */
  export type ArticleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter, which Article to fetch.
     */
    where?: ArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Articles to fetch.
     */
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Articles.
     */
    cursor?: ArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Articles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Articles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Articles.
     */
    distinct?: ArticleScalarFieldEnum | ArticleScalarFieldEnum[]
  }

  /**
   * Article findMany
   */
  export type ArticleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter, which Articles to fetch.
     */
    where?: ArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Articles to fetch.
     */
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Articles.
     */
    cursor?: ArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Articles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Articles.
     */
    skip?: number
    distinct?: ArticleScalarFieldEnum | ArticleScalarFieldEnum[]
  }

  /**
   * Article create
   */
  export type ArticleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * The data needed to create a Article.
     */
    data: XOR<ArticleCreateInput, ArticleUncheckedCreateInput>
  }

  /**
   * Article createMany
   */
  export type ArticleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Articles.
     */
    data: ArticleCreateManyInput | ArticleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Article update
   */
  export type ArticleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * The data needed to update a Article.
     */
    data: XOR<ArticleUpdateInput, ArticleUncheckedUpdateInput>
    /**
     * Choose, which Article to update.
     */
    where: ArticleWhereUniqueInput
  }

  /**
   * Article updateMany
   */
  export type ArticleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Articles.
     */
    data: XOR<ArticleUpdateManyMutationInput, ArticleUncheckedUpdateManyInput>
    /**
     * Filter which Articles to update
     */
    where?: ArticleWhereInput
    /**
     * Limit how many Articles to update.
     */
    limit?: number
  }

  /**
   * Article upsert
   */
  export type ArticleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * The filter to search for the Article to update in case it exists.
     */
    where: ArticleWhereUniqueInput
    /**
     * In case the Article found by the `where` argument doesn't exist, create a new Article with this data.
     */
    create: XOR<ArticleCreateInput, ArticleUncheckedCreateInput>
    /**
     * In case the Article was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ArticleUpdateInput, ArticleUncheckedUpdateInput>
  }

  /**
   * Article delete
   */
  export type ArticleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter which Article to delete.
     */
    where: ArticleWhereUniqueInput
  }

  /**
   * Article deleteMany
   */
  export type ArticleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Articles to delete
     */
    where?: ArticleWhereInput
    /**
     * Limit how many Articles to delete.
     */
    limit?: number
  }

  /**
   * Article.comments
   */
  export type Article$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleComment
     */
    select?: ArticleCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleComment
     */
    omit?: ArticleCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleCommentInclude<ExtArgs> | null
    where?: ArticleCommentWhereInput
    orderBy?: ArticleCommentOrderByWithRelationInput | ArticleCommentOrderByWithRelationInput[]
    cursor?: ArticleCommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ArticleCommentScalarFieldEnum | ArticleCommentScalarFieldEnum[]
  }

  /**
   * Article.likes
   */
  export type Article$likesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleLike
     */
    select?: ArticleLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleLike
     */
    omit?: ArticleLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleLikeInclude<ExtArgs> | null
    where?: ArticleLikeWhereInput
    orderBy?: ArticleLikeOrderByWithRelationInput | ArticleLikeOrderByWithRelationInput[]
    cursor?: ArticleLikeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ArticleLikeScalarFieldEnum | ArticleLikeScalarFieldEnum[]
  }

  /**
   * Article.favorites
   */
  export type Article$favoritesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleFavorite
     */
    select?: ArticleFavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleFavorite
     */
    omit?: ArticleFavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleFavoriteInclude<ExtArgs> | null
    where?: ArticleFavoriteWhereInput
    orderBy?: ArticleFavoriteOrderByWithRelationInput | ArticleFavoriteOrderByWithRelationInput[]
    cursor?: ArticleFavoriteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ArticleFavoriteScalarFieldEnum | ArticleFavoriteScalarFieldEnum[]
  }

  /**
   * Article without action
   */
  export type ArticleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
  }


  /**
   * Model ArticleComment
   */

  export type AggregateArticleComment = {
    _count: ArticleCommentCountAggregateOutputType | null
    _avg: ArticleCommentAvgAggregateOutputType | null
    _sum: ArticleCommentSumAggregateOutputType | null
    _min: ArticleCommentMinAggregateOutputType | null
    _max: ArticleCommentMaxAggregateOutputType | null
  }

  export type ArticleCommentAvgAggregateOutputType = {
    id: number | null
    articleId: number | null
    userId: number | null
    parentId: number | null
  }

  export type ArticleCommentSumAggregateOutputType = {
    id: number | null
    articleId: number | null
    userId: number | null
    parentId: number | null
  }

  export type ArticleCommentMinAggregateOutputType = {
    id: number | null
    articleId: number | null
    userId: number | null
    parentId: number | null
    content: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ArticleCommentMaxAggregateOutputType = {
    id: number | null
    articleId: number | null
    userId: number | null
    parentId: number | null
    content: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ArticleCommentCountAggregateOutputType = {
    id: number
    articleId: number
    userId: number
    parentId: number
    content: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ArticleCommentAvgAggregateInputType = {
    id?: true
    articleId?: true
    userId?: true
    parentId?: true
  }

  export type ArticleCommentSumAggregateInputType = {
    id?: true
    articleId?: true
    userId?: true
    parentId?: true
  }

  export type ArticleCommentMinAggregateInputType = {
    id?: true
    articleId?: true
    userId?: true
    parentId?: true
    content?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ArticleCommentMaxAggregateInputType = {
    id?: true
    articleId?: true
    userId?: true
    parentId?: true
    content?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ArticleCommentCountAggregateInputType = {
    id?: true
    articleId?: true
    userId?: true
    parentId?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ArticleCommentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArticleComment to aggregate.
     */
    where?: ArticleCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArticleComments to fetch.
     */
    orderBy?: ArticleCommentOrderByWithRelationInput | ArticleCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ArticleCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArticleComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArticleComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ArticleComments
    **/
    _count?: true | ArticleCommentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ArticleCommentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ArticleCommentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ArticleCommentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ArticleCommentMaxAggregateInputType
  }

  export type GetArticleCommentAggregateType<T extends ArticleCommentAggregateArgs> = {
        [P in keyof T & keyof AggregateArticleComment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArticleComment[P]>
      : GetScalarType<T[P], AggregateArticleComment[P]>
  }




  export type ArticleCommentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArticleCommentWhereInput
    orderBy?: ArticleCommentOrderByWithAggregationInput | ArticleCommentOrderByWithAggregationInput[]
    by: ArticleCommentScalarFieldEnum[] | ArticleCommentScalarFieldEnum
    having?: ArticleCommentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ArticleCommentCountAggregateInputType | true
    _avg?: ArticleCommentAvgAggregateInputType
    _sum?: ArticleCommentSumAggregateInputType
    _min?: ArticleCommentMinAggregateInputType
    _max?: ArticleCommentMaxAggregateInputType
  }

  export type ArticleCommentGroupByOutputType = {
    id: number
    articleId: number
    userId: number
    parentId: number | null
    content: string
    createdAt: Date
    updatedAt: Date
    _count: ArticleCommentCountAggregateOutputType | null
    _avg: ArticleCommentAvgAggregateOutputType | null
    _sum: ArticleCommentSumAggregateOutputType | null
    _min: ArticleCommentMinAggregateOutputType | null
    _max: ArticleCommentMaxAggregateOutputType | null
  }

  type GetArticleCommentGroupByPayload<T extends ArticleCommentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ArticleCommentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ArticleCommentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ArticleCommentGroupByOutputType[P]>
            : GetScalarType<T[P], ArticleCommentGroupByOutputType[P]>
        }
      >
    >


  export type ArticleCommentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    articleId?: boolean
    userId?: boolean
    parentId?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    article?: boolean | ArticleDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    parent?: boolean | ArticleComment$parentArgs<ExtArgs>
    replies?: boolean | ArticleComment$repliesArgs<ExtArgs>
    _count?: boolean | ArticleCommentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["articleComment"]>



  export type ArticleCommentSelectScalar = {
    id?: boolean
    articleId?: boolean
    userId?: boolean
    parentId?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ArticleCommentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "articleId" | "userId" | "parentId" | "content" | "createdAt" | "updatedAt", ExtArgs["result"]["articleComment"]>
  export type ArticleCommentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    article?: boolean | ArticleDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    parent?: boolean | ArticleComment$parentArgs<ExtArgs>
    replies?: boolean | ArticleComment$repliesArgs<ExtArgs>
    _count?: boolean | ArticleCommentCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ArticleCommentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ArticleComment"
    objects: {
      article: Prisma.$ArticlePayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
      parent: Prisma.$ArticleCommentPayload<ExtArgs> | null
      replies: Prisma.$ArticleCommentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      articleId: number
      userId: number
      parentId: number | null
      content: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["articleComment"]>
    composites: {}
  }

  type ArticleCommentGetPayload<S extends boolean | null | undefined | ArticleCommentDefaultArgs> = $Result.GetResult<Prisma.$ArticleCommentPayload, S>

  type ArticleCommentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ArticleCommentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ArticleCommentCountAggregateInputType | true
    }

  export interface ArticleCommentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ArticleComment'], meta: { name: 'ArticleComment' } }
    /**
     * Find zero or one ArticleComment that matches the filter.
     * @param {ArticleCommentFindUniqueArgs} args - Arguments to find a ArticleComment
     * @example
     * // Get one ArticleComment
     * const articleComment = await prisma.articleComment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ArticleCommentFindUniqueArgs>(args: SelectSubset<T, ArticleCommentFindUniqueArgs<ExtArgs>>): Prisma__ArticleCommentClient<$Result.GetResult<Prisma.$ArticleCommentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ArticleComment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ArticleCommentFindUniqueOrThrowArgs} args - Arguments to find a ArticleComment
     * @example
     * // Get one ArticleComment
     * const articleComment = await prisma.articleComment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ArticleCommentFindUniqueOrThrowArgs>(args: SelectSubset<T, ArticleCommentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ArticleCommentClient<$Result.GetResult<Prisma.$ArticleCommentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ArticleComment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleCommentFindFirstArgs} args - Arguments to find a ArticleComment
     * @example
     * // Get one ArticleComment
     * const articleComment = await prisma.articleComment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ArticleCommentFindFirstArgs>(args?: SelectSubset<T, ArticleCommentFindFirstArgs<ExtArgs>>): Prisma__ArticleCommentClient<$Result.GetResult<Prisma.$ArticleCommentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ArticleComment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleCommentFindFirstOrThrowArgs} args - Arguments to find a ArticleComment
     * @example
     * // Get one ArticleComment
     * const articleComment = await prisma.articleComment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ArticleCommentFindFirstOrThrowArgs>(args?: SelectSubset<T, ArticleCommentFindFirstOrThrowArgs<ExtArgs>>): Prisma__ArticleCommentClient<$Result.GetResult<Prisma.$ArticleCommentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ArticleComments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleCommentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ArticleComments
     * const articleComments = await prisma.articleComment.findMany()
     * 
     * // Get first 10 ArticleComments
     * const articleComments = await prisma.articleComment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const articleCommentWithIdOnly = await prisma.articleComment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ArticleCommentFindManyArgs>(args?: SelectSubset<T, ArticleCommentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticleCommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ArticleComment.
     * @param {ArticleCommentCreateArgs} args - Arguments to create a ArticleComment.
     * @example
     * // Create one ArticleComment
     * const ArticleComment = await prisma.articleComment.create({
     *   data: {
     *     // ... data to create a ArticleComment
     *   }
     * })
     * 
     */
    create<T extends ArticleCommentCreateArgs>(args: SelectSubset<T, ArticleCommentCreateArgs<ExtArgs>>): Prisma__ArticleCommentClient<$Result.GetResult<Prisma.$ArticleCommentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ArticleComments.
     * @param {ArticleCommentCreateManyArgs} args - Arguments to create many ArticleComments.
     * @example
     * // Create many ArticleComments
     * const articleComment = await prisma.articleComment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ArticleCommentCreateManyArgs>(args?: SelectSubset<T, ArticleCommentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ArticleComment.
     * @param {ArticleCommentDeleteArgs} args - Arguments to delete one ArticleComment.
     * @example
     * // Delete one ArticleComment
     * const ArticleComment = await prisma.articleComment.delete({
     *   where: {
     *     // ... filter to delete one ArticleComment
     *   }
     * })
     * 
     */
    delete<T extends ArticleCommentDeleteArgs>(args: SelectSubset<T, ArticleCommentDeleteArgs<ExtArgs>>): Prisma__ArticleCommentClient<$Result.GetResult<Prisma.$ArticleCommentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ArticleComment.
     * @param {ArticleCommentUpdateArgs} args - Arguments to update one ArticleComment.
     * @example
     * // Update one ArticleComment
     * const articleComment = await prisma.articleComment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ArticleCommentUpdateArgs>(args: SelectSubset<T, ArticleCommentUpdateArgs<ExtArgs>>): Prisma__ArticleCommentClient<$Result.GetResult<Prisma.$ArticleCommentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ArticleComments.
     * @param {ArticleCommentDeleteManyArgs} args - Arguments to filter ArticleComments to delete.
     * @example
     * // Delete a few ArticleComments
     * const { count } = await prisma.articleComment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ArticleCommentDeleteManyArgs>(args?: SelectSubset<T, ArticleCommentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ArticleComments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleCommentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ArticleComments
     * const articleComment = await prisma.articleComment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ArticleCommentUpdateManyArgs>(args: SelectSubset<T, ArticleCommentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ArticleComment.
     * @param {ArticleCommentUpsertArgs} args - Arguments to update or create a ArticleComment.
     * @example
     * // Update or create a ArticleComment
     * const articleComment = await prisma.articleComment.upsert({
     *   create: {
     *     // ... data to create a ArticleComment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ArticleComment we want to update
     *   }
     * })
     */
    upsert<T extends ArticleCommentUpsertArgs>(args: SelectSubset<T, ArticleCommentUpsertArgs<ExtArgs>>): Prisma__ArticleCommentClient<$Result.GetResult<Prisma.$ArticleCommentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ArticleComments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleCommentCountArgs} args - Arguments to filter ArticleComments to count.
     * @example
     * // Count the number of ArticleComments
     * const count = await prisma.articleComment.count({
     *   where: {
     *     // ... the filter for the ArticleComments we want to count
     *   }
     * })
    **/
    count<T extends ArticleCommentCountArgs>(
      args?: Subset<T, ArticleCommentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ArticleCommentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ArticleComment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleCommentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ArticleCommentAggregateArgs>(args: Subset<T, ArticleCommentAggregateArgs>): Prisma.PrismaPromise<GetArticleCommentAggregateType<T>>

    /**
     * Group by ArticleComment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleCommentGroupByArgs} args - Group by arguments.
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
      T extends ArticleCommentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ArticleCommentGroupByArgs['orderBy'] }
        : { orderBy?: ArticleCommentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ArticleCommentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetArticleCommentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ArticleComment model
   */
  readonly fields: ArticleCommentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ArticleComment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ArticleCommentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    article<T extends ArticleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ArticleDefaultArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    parent<T extends ArticleComment$parentArgs<ExtArgs> = {}>(args?: Subset<T, ArticleComment$parentArgs<ExtArgs>>): Prisma__ArticleCommentClient<$Result.GetResult<Prisma.$ArticleCommentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    replies<T extends ArticleComment$repliesArgs<ExtArgs> = {}>(args?: Subset<T, ArticleComment$repliesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticleCommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the ArticleComment model
   */
  interface ArticleCommentFieldRefs {
    readonly id: FieldRef<"ArticleComment", 'Int'>
    readonly articleId: FieldRef<"ArticleComment", 'Int'>
    readonly userId: FieldRef<"ArticleComment", 'Int'>
    readonly parentId: FieldRef<"ArticleComment", 'Int'>
    readonly content: FieldRef<"ArticleComment", 'String'>
    readonly createdAt: FieldRef<"ArticleComment", 'DateTime'>
    readonly updatedAt: FieldRef<"ArticleComment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ArticleComment findUnique
   */
  export type ArticleCommentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleComment
     */
    select?: ArticleCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleComment
     */
    omit?: ArticleCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleCommentInclude<ExtArgs> | null
    /**
     * Filter, which ArticleComment to fetch.
     */
    where: ArticleCommentWhereUniqueInput
  }

  /**
   * ArticleComment findUniqueOrThrow
   */
  export type ArticleCommentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleComment
     */
    select?: ArticleCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleComment
     */
    omit?: ArticleCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleCommentInclude<ExtArgs> | null
    /**
     * Filter, which ArticleComment to fetch.
     */
    where: ArticleCommentWhereUniqueInput
  }

  /**
   * ArticleComment findFirst
   */
  export type ArticleCommentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleComment
     */
    select?: ArticleCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleComment
     */
    omit?: ArticleCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleCommentInclude<ExtArgs> | null
    /**
     * Filter, which ArticleComment to fetch.
     */
    where?: ArticleCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArticleComments to fetch.
     */
    orderBy?: ArticleCommentOrderByWithRelationInput | ArticleCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArticleComments.
     */
    cursor?: ArticleCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArticleComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArticleComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArticleComments.
     */
    distinct?: ArticleCommentScalarFieldEnum | ArticleCommentScalarFieldEnum[]
  }

  /**
   * ArticleComment findFirstOrThrow
   */
  export type ArticleCommentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleComment
     */
    select?: ArticleCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleComment
     */
    omit?: ArticleCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleCommentInclude<ExtArgs> | null
    /**
     * Filter, which ArticleComment to fetch.
     */
    where?: ArticleCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArticleComments to fetch.
     */
    orderBy?: ArticleCommentOrderByWithRelationInput | ArticleCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArticleComments.
     */
    cursor?: ArticleCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArticleComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArticleComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArticleComments.
     */
    distinct?: ArticleCommentScalarFieldEnum | ArticleCommentScalarFieldEnum[]
  }

  /**
   * ArticleComment findMany
   */
  export type ArticleCommentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleComment
     */
    select?: ArticleCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleComment
     */
    omit?: ArticleCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleCommentInclude<ExtArgs> | null
    /**
     * Filter, which ArticleComments to fetch.
     */
    where?: ArticleCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArticleComments to fetch.
     */
    orderBy?: ArticleCommentOrderByWithRelationInput | ArticleCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ArticleComments.
     */
    cursor?: ArticleCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArticleComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArticleComments.
     */
    skip?: number
    distinct?: ArticleCommentScalarFieldEnum | ArticleCommentScalarFieldEnum[]
  }

  /**
   * ArticleComment create
   */
  export type ArticleCommentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleComment
     */
    select?: ArticleCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleComment
     */
    omit?: ArticleCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleCommentInclude<ExtArgs> | null
    /**
     * The data needed to create a ArticleComment.
     */
    data: XOR<ArticleCommentCreateInput, ArticleCommentUncheckedCreateInput>
  }

  /**
   * ArticleComment createMany
   */
  export type ArticleCommentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ArticleComments.
     */
    data: ArticleCommentCreateManyInput | ArticleCommentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ArticleComment update
   */
  export type ArticleCommentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleComment
     */
    select?: ArticleCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleComment
     */
    omit?: ArticleCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleCommentInclude<ExtArgs> | null
    /**
     * The data needed to update a ArticleComment.
     */
    data: XOR<ArticleCommentUpdateInput, ArticleCommentUncheckedUpdateInput>
    /**
     * Choose, which ArticleComment to update.
     */
    where: ArticleCommentWhereUniqueInput
  }

  /**
   * ArticleComment updateMany
   */
  export type ArticleCommentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ArticleComments.
     */
    data: XOR<ArticleCommentUpdateManyMutationInput, ArticleCommentUncheckedUpdateManyInput>
    /**
     * Filter which ArticleComments to update
     */
    where?: ArticleCommentWhereInput
    /**
     * Limit how many ArticleComments to update.
     */
    limit?: number
  }

  /**
   * ArticleComment upsert
   */
  export type ArticleCommentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleComment
     */
    select?: ArticleCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleComment
     */
    omit?: ArticleCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleCommentInclude<ExtArgs> | null
    /**
     * The filter to search for the ArticleComment to update in case it exists.
     */
    where: ArticleCommentWhereUniqueInput
    /**
     * In case the ArticleComment found by the `where` argument doesn't exist, create a new ArticleComment with this data.
     */
    create: XOR<ArticleCommentCreateInput, ArticleCommentUncheckedCreateInput>
    /**
     * In case the ArticleComment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ArticleCommentUpdateInput, ArticleCommentUncheckedUpdateInput>
  }

  /**
   * ArticleComment delete
   */
  export type ArticleCommentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleComment
     */
    select?: ArticleCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleComment
     */
    omit?: ArticleCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleCommentInclude<ExtArgs> | null
    /**
     * Filter which ArticleComment to delete.
     */
    where: ArticleCommentWhereUniqueInput
  }

  /**
   * ArticleComment deleteMany
   */
  export type ArticleCommentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArticleComments to delete
     */
    where?: ArticleCommentWhereInput
    /**
     * Limit how many ArticleComments to delete.
     */
    limit?: number
  }

  /**
   * ArticleComment.parent
   */
  export type ArticleComment$parentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleComment
     */
    select?: ArticleCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleComment
     */
    omit?: ArticleCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleCommentInclude<ExtArgs> | null
    where?: ArticleCommentWhereInput
  }

  /**
   * ArticleComment.replies
   */
  export type ArticleComment$repliesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleComment
     */
    select?: ArticleCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleComment
     */
    omit?: ArticleCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleCommentInclude<ExtArgs> | null
    where?: ArticleCommentWhereInput
    orderBy?: ArticleCommentOrderByWithRelationInput | ArticleCommentOrderByWithRelationInput[]
    cursor?: ArticleCommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ArticleCommentScalarFieldEnum | ArticleCommentScalarFieldEnum[]
  }

  /**
   * ArticleComment without action
   */
  export type ArticleCommentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleComment
     */
    select?: ArticleCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleComment
     */
    omit?: ArticleCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleCommentInclude<ExtArgs> | null
  }


  /**
   * Model ArticleLike
   */

  export type AggregateArticleLike = {
    _count: ArticleLikeCountAggregateOutputType | null
    _avg: ArticleLikeAvgAggregateOutputType | null
    _sum: ArticleLikeSumAggregateOutputType | null
    _min: ArticleLikeMinAggregateOutputType | null
    _max: ArticleLikeMaxAggregateOutputType | null
  }

  export type ArticleLikeAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    articleId: number | null
  }

  export type ArticleLikeSumAggregateOutputType = {
    id: number | null
    userId: number | null
    articleId: number | null
  }

  export type ArticleLikeMinAggregateOutputType = {
    id: number | null
    userId: number | null
    articleId: number | null
    createdAt: Date | null
  }

  export type ArticleLikeMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    articleId: number | null
    createdAt: Date | null
  }

  export type ArticleLikeCountAggregateOutputType = {
    id: number
    userId: number
    articleId: number
    createdAt: number
    _all: number
  }


  export type ArticleLikeAvgAggregateInputType = {
    id?: true
    userId?: true
    articleId?: true
  }

  export type ArticleLikeSumAggregateInputType = {
    id?: true
    userId?: true
    articleId?: true
  }

  export type ArticleLikeMinAggregateInputType = {
    id?: true
    userId?: true
    articleId?: true
    createdAt?: true
  }

  export type ArticleLikeMaxAggregateInputType = {
    id?: true
    userId?: true
    articleId?: true
    createdAt?: true
  }

  export type ArticleLikeCountAggregateInputType = {
    id?: true
    userId?: true
    articleId?: true
    createdAt?: true
    _all?: true
  }

  export type ArticleLikeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArticleLike to aggregate.
     */
    where?: ArticleLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArticleLikes to fetch.
     */
    orderBy?: ArticleLikeOrderByWithRelationInput | ArticleLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ArticleLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArticleLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArticleLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ArticleLikes
    **/
    _count?: true | ArticleLikeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ArticleLikeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ArticleLikeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ArticleLikeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ArticleLikeMaxAggregateInputType
  }

  export type GetArticleLikeAggregateType<T extends ArticleLikeAggregateArgs> = {
        [P in keyof T & keyof AggregateArticleLike]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArticleLike[P]>
      : GetScalarType<T[P], AggregateArticleLike[P]>
  }




  export type ArticleLikeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArticleLikeWhereInput
    orderBy?: ArticleLikeOrderByWithAggregationInput | ArticleLikeOrderByWithAggregationInput[]
    by: ArticleLikeScalarFieldEnum[] | ArticleLikeScalarFieldEnum
    having?: ArticleLikeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ArticleLikeCountAggregateInputType | true
    _avg?: ArticleLikeAvgAggregateInputType
    _sum?: ArticleLikeSumAggregateInputType
    _min?: ArticleLikeMinAggregateInputType
    _max?: ArticleLikeMaxAggregateInputType
  }

  export type ArticleLikeGroupByOutputType = {
    id: number
    userId: number
    articleId: number
    createdAt: Date
    _count: ArticleLikeCountAggregateOutputType | null
    _avg: ArticleLikeAvgAggregateOutputType | null
    _sum: ArticleLikeSumAggregateOutputType | null
    _min: ArticleLikeMinAggregateOutputType | null
    _max: ArticleLikeMaxAggregateOutputType | null
  }

  type GetArticleLikeGroupByPayload<T extends ArticleLikeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ArticleLikeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ArticleLikeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ArticleLikeGroupByOutputType[P]>
            : GetScalarType<T[P], ArticleLikeGroupByOutputType[P]>
        }
      >
    >


  export type ArticleLikeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    articleId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    article?: boolean | ArticleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["articleLike"]>



  export type ArticleLikeSelectScalar = {
    id?: boolean
    userId?: boolean
    articleId?: boolean
    createdAt?: boolean
  }

  export type ArticleLikeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "articleId" | "createdAt", ExtArgs["result"]["articleLike"]>
  export type ArticleLikeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    article?: boolean | ArticleDefaultArgs<ExtArgs>
  }

  export type $ArticleLikePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ArticleLike"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      article: Prisma.$ArticlePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      articleId: number
      createdAt: Date
    }, ExtArgs["result"]["articleLike"]>
    composites: {}
  }

  type ArticleLikeGetPayload<S extends boolean | null | undefined | ArticleLikeDefaultArgs> = $Result.GetResult<Prisma.$ArticleLikePayload, S>

  type ArticleLikeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ArticleLikeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ArticleLikeCountAggregateInputType | true
    }

  export interface ArticleLikeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ArticleLike'], meta: { name: 'ArticleLike' } }
    /**
     * Find zero or one ArticleLike that matches the filter.
     * @param {ArticleLikeFindUniqueArgs} args - Arguments to find a ArticleLike
     * @example
     * // Get one ArticleLike
     * const articleLike = await prisma.articleLike.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ArticleLikeFindUniqueArgs>(args: SelectSubset<T, ArticleLikeFindUniqueArgs<ExtArgs>>): Prisma__ArticleLikeClient<$Result.GetResult<Prisma.$ArticleLikePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ArticleLike that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ArticleLikeFindUniqueOrThrowArgs} args - Arguments to find a ArticleLike
     * @example
     * // Get one ArticleLike
     * const articleLike = await prisma.articleLike.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ArticleLikeFindUniqueOrThrowArgs>(args: SelectSubset<T, ArticleLikeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ArticleLikeClient<$Result.GetResult<Prisma.$ArticleLikePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ArticleLike that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleLikeFindFirstArgs} args - Arguments to find a ArticleLike
     * @example
     * // Get one ArticleLike
     * const articleLike = await prisma.articleLike.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ArticleLikeFindFirstArgs>(args?: SelectSubset<T, ArticleLikeFindFirstArgs<ExtArgs>>): Prisma__ArticleLikeClient<$Result.GetResult<Prisma.$ArticleLikePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ArticleLike that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleLikeFindFirstOrThrowArgs} args - Arguments to find a ArticleLike
     * @example
     * // Get one ArticleLike
     * const articleLike = await prisma.articleLike.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ArticleLikeFindFirstOrThrowArgs>(args?: SelectSubset<T, ArticleLikeFindFirstOrThrowArgs<ExtArgs>>): Prisma__ArticleLikeClient<$Result.GetResult<Prisma.$ArticleLikePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ArticleLikes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleLikeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ArticleLikes
     * const articleLikes = await prisma.articleLike.findMany()
     * 
     * // Get first 10 ArticleLikes
     * const articleLikes = await prisma.articleLike.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const articleLikeWithIdOnly = await prisma.articleLike.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ArticleLikeFindManyArgs>(args?: SelectSubset<T, ArticleLikeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticleLikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ArticleLike.
     * @param {ArticleLikeCreateArgs} args - Arguments to create a ArticleLike.
     * @example
     * // Create one ArticleLike
     * const ArticleLike = await prisma.articleLike.create({
     *   data: {
     *     // ... data to create a ArticleLike
     *   }
     * })
     * 
     */
    create<T extends ArticleLikeCreateArgs>(args: SelectSubset<T, ArticleLikeCreateArgs<ExtArgs>>): Prisma__ArticleLikeClient<$Result.GetResult<Prisma.$ArticleLikePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ArticleLikes.
     * @param {ArticleLikeCreateManyArgs} args - Arguments to create many ArticleLikes.
     * @example
     * // Create many ArticleLikes
     * const articleLike = await prisma.articleLike.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ArticleLikeCreateManyArgs>(args?: SelectSubset<T, ArticleLikeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ArticleLike.
     * @param {ArticleLikeDeleteArgs} args - Arguments to delete one ArticleLike.
     * @example
     * // Delete one ArticleLike
     * const ArticleLike = await prisma.articleLike.delete({
     *   where: {
     *     // ... filter to delete one ArticleLike
     *   }
     * })
     * 
     */
    delete<T extends ArticleLikeDeleteArgs>(args: SelectSubset<T, ArticleLikeDeleteArgs<ExtArgs>>): Prisma__ArticleLikeClient<$Result.GetResult<Prisma.$ArticleLikePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ArticleLike.
     * @param {ArticleLikeUpdateArgs} args - Arguments to update one ArticleLike.
     * @example
     * // Update one ArticleLike
     * const articleLike = await prisma.articleLike.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ArticleLikeUpdateArgs>(args: SelectSubset<T, ArticleLikeUpdateArgs<ExtArgs>>): Prisma__ArticleLikeClient<$Result.GetResult<Prisma.$ArticleLikePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ArticleLikes.
     * @param {ArticleLikeDeleteManyArgs} args - Arguments to filter ArticleLikes to delete.
     * @example
     * // Delete a few ArticleLikes
     * const { count } = await prisma.articleLike.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ArticleLikeDeleteManyArgs>(args?: SelectSubset<T, ArticleLikeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ArticleLikes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleLikeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ArticleLikes
     * const articleLike = await prisma.articleLike.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ArticleLikeUpdateManyArgs>(args: SelectSubset<T, ArticleLikeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ArticleLike.
     * @param {ArticleLikeUpsertArgs} args - Arguments to update or create a ArticleLike.
     * @example
     * // Update or create a ArticleLike
     * const articleLike = await prisma.articleLike.upsert({
     *   create: {
     *     // ... data to create a ArticleLike
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ArticleLike we want to update
     *   }
     * })
     */
    upsert<T extends ArticleLikeUpsertArgs>(args: SelectSubset<T, ArticleLikeUpsertArgs<ExtArgs>>): Prisma__ArticleLikeClient<$Result.GetResult<Prisma.$ArticleLikePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ArticleLikes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleLikeCountArgs} args - Arguments to filter ArticleLikes to count.
     * @example
     * // Count the number of ArticleLikes
     * const count = await prisma.articleLike.count({
     *   where: {
     *     // ... the filter for the ArticleLikes we want to count
     *   }
     * })
    **/
    count<T extends ArticleLikeCountArgs>(
      args?: Subset<T, ArticleLikeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ArticleLikeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ArticleLike.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleLikeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ArticleLikeAggregateArgs>(args: Subset<T, ArticleLikeAggregateArgs>): Prisma.PrismaPromise<GetArticleLikeAggregateType<T>>

    /**
     * Group by ArticleLike.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleLikeGroupByArgs} args - Group by arguments.
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
      T extends ArticleLikeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ArticleLikeGroupByArgs['orderBy'] }
        : { orderBy?: ArticleLikeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ArticleLikeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetArticleLikeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ArticleLike model
   */
  readonly fields: ArticleLikeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ArticleLike.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ArticleLikeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    article<T extends ArticleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ArticleDefaultArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ArticleLike model
   */
  interface ArticleLikeFieldRefs {
    readonly id: FieldRef<"ArticleLike", 'Int'>
    readonly userId: FieldRef<"ArticleLike", 'Int'>
    readonly articleId: FieldRef<"ArticleLike", 'Int'>
    readonly createdAt: FieldRef<"ArticleLike", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ArticleLike findUnique
   */
  export type ArticleLikeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleLike
     */
    select?: ArticleLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleLike
     */
    omit?: ArticleLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleLikeInclude<ExtArgs> | null
    /**
     * Filter, which ArticleLike to fetch.
     */
    where: ArticleLikeWhereUniqueInput
  }

  /**
   * ArticleLike findUniqueOrThrow
   */
  export type ArticleLikeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleLike
     */
    select?: ArticleLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleLike
     */
    omit?: ArticleLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleLikeInclude<ExtArgs> | null
    /**
     * Filter, which ArticleLike to fetch.
     */
    where: ArticleLikeWhereUniqueInput
  }

  /**
   * ArticleLike findFirst
   */
  export type ArticleLikeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleLike
     */
    select?: ArticleLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleLike
     */
    omit?: ArticleLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleLikeInclude<ExtArgs> | null
    /**
     * Filter, which ArticleLike to fetch.
     */
    where?: ArticleLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArticleLikes to fetch.
     */
    orderBy?: ArticleLikeOrderByWithRelationInput | ArticleLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArticleLikes.
     */
    cursor?: ArticleLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArticleLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArticleLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArticleLikes.
     */
    distinct?: ArticleLikeScalarFieldEnum | ArticleLikeScalarFieldEnum[]
  }

  /**
   * ArticleLike findFirstOrThrow
   */
  export type ArticleLikeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleLike
     */
    select?: ArticleLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleLike
     */
    omit?: ArticleLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleLikeInclude<ExtArgs> | null
    /**
     * Filter, which ArticleLike to fetch.
     */
    where?: ArticleLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArticleLikes to fetch.
     */
    orderBy?: ArticleLikeOrderByWithRelationInput | ArticleLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArticleLikes.
     */
    cursor?: ArticleLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArticleLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArticleLikes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArticleLikes.
     */
    distinct?: ArticleLikeScalarFieldEnum | ArticleLikeScalarFieldEnum[]
  }

  /**
   * ArticleLike findMany
   */
  export type ArticleLikeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleLike
     */
    select?: ArticleLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleLike
     */
    omit?: ArticleLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleLikeInclude<ExtArgs> | null
    /**
     * Filter, which ArticleLikes to fetch.
     */
    where?: ArticleLikeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArticleLikes to fetch.
     */
    orderBy?: ArticleLikeOrderByWithRelationInput | ArticleLikeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ArticleLikes.
     */
    cursor?: ArticleLikeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArticleLikes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArticleLikes.
     */
    skip?: number
    distinct?: ArticleLikeScalarFieldEnum | ArticleLikeScalarFieldEnum[]
  }

  /**
   * ArticleLike create
   */
  export type ArticleLikeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleLike
     */
    select?: ArticleLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleLike
     */
    omit?: ArticleLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleLikeInclude<ExtArgs> | null
    /**
     * The data needed to create a ArticleLike.
     */
    data: XOR<ArticleLikeCreateInput, ArticleLikeUncheckedCreateInput>
  }

  /**
   * ArticleLike createMany
   */
  export type ArticleLikeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ArticleLikes.
     */
    data: ArticleLikeCreateManyInput | ArticleLikeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ArticleLike update
   */
  export type ArticleLikeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleLike
     */
    select?: ArticleLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleLike
     */
    omit?: ArticleLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleLikeInclude<ExtArgs> | null
    /**
     * The data needed to update a ArticleLike.
     */
    data: XOR<ArticleLikeUpdateInput, ArticleLikeUncheckedUpdateInput>
    /**
     * Choose, which ArticleLike to update.
     */
    where: ArticleLikeWhereUniqueInput
  }

  /**
   * ArticleLike updateMany
   */
  export type ArticleLikeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ArticleLikes.
     */
    data: XOR<ArticleLikeUpdateManyMutationInput, ArticleLikeUncheckedUpdateManyInput>
    /**
     * Filter which ArticleLikes to update
     */
    where?: ArticleLikeWhereInput
    /**
     * Limit how many ArticleLikes to update.
     */
    limit?: number
  }

  /**
   * ArticleLike upsert
   */
  export type ArticleLikeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleLike
     */
    select?: ArticleLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleLike
     */
    omit?: ArticleLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleLikeInclude<ExtArgs> | null
    /**
     * The filter to search for the ArticleLike to update in case it exists.
     */
    where: ArticleLikeWhereUniqueInput
    /**
     * In case the ArticleLike found by the `where` argument doesn't exist, create a new ArticleLike with this data.
     */
    create: XOR<ArticleLikeCreateInput, ArticleLikeUncheckedCreateInput>
    /**
     * In case the ArticleLike was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ArticleLikeUpdateInput, ArticleLikeUncheckedUpdateInput>
  }

  /**
   * ArticleLike delete
   */
  export type ArticleLikeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleLike
     */
    select?: ArticleLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleLike
     */
    omit?: ArticleLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleLikeInclude<ExtArgs> | null
    /**
     * Filter which ArticleLike to delete.
     */
    where: ArticleLikeWhereUniqueInput
  }

  /**
   * ArticleLike deleteMany
   */
  export type ArticleLikeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArticleLikes to delete
     */
    where?: ArticleLikeWhereInput
    /**
     * Limit how many ArticleLikes to delete.
     */
    limit?: number
  }

  /**
   * ArticleLike without action
   */
  export type ArticleLikeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleLike
     */
    select?: ArticleLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleLike
     */
    omit?: ArticleLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleLikeInclude<ExtArgs> | null
  }


  /**
   * Model ArticleFavorite
   */

  export type AggregateArticleFavorite = {
    _count: ArticleFavoriteCountAggregateOutputType | null
    _avg: ArticleFavoriteAvgAggregateOutputType | null
    _sum: ArticleFavoriteSumAggregateOutputType | null
    _min: ArticleFavoriteMinAggregateOutputType | null
    _max: ArticleFavoriteMaxAggregateOutputType | null
  }

  export type ArticleFavoriteAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    articleId: number | null
  }

  export type ArticleFavoriteSumAggregateOutputType = {
    id: number | null
    userId: number | null
    articleId: number | null
  }

  export type ArticleFavoriteMinAggregateOutputType = {
    id: number | null
    userId: number | null
    articleId: number | null
    createdAt: Date | null
  }

  export type ArticleFavoriteMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    articleId: number | null
    createdAt: Date | null
  }

  export type ArticleFavoriteCountAggregateOutputType = {
    id: number
    userId: number
    articleId: number
    createdAt: number
    _all: number
  }


  export type ArticleFavoriteAvgAggregateInputType = {
    id?: true
    userId?: true
    articleId?: true
  }

  export type ArticleFavoriteSumAggregateInputType = {
    id?: true
    userId?: true
    articleId?: true
  }

  export type ArticleFavoriteMinAggregateInputType = {
    id?: true
    userId?: true
    articleId?: true
    createdAt?: true
  }

  export type ArticleFavoriteMaxAggregateInputType = {
    id?: true
    userId?: true
    articleId?: true
    createdAt?: true
  }

  export type ArticleFavoriteCountAggregateInputType = {
    id?: true
    userId?: true
    articleId?: true
    createdAt?: true
    _all?: true
  }

  export type ArticleFavoriteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArticleFavorite to aggregate.
     */
    where?: ArticleFavoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArticleFavorites to fetch.
     */
    orderBy?: ArticleFavoriteOrderByWithRelationInput | ArticleFavoriteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ArticleFavoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArticleFavorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArticleFavorites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ArticleFavorites
    **/
    _count?: true | ArticleFavoriteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ArticleFavoriteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ArticleFavoriteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ArticleFavoriteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ArticleFavoriteMaxAggregateInputType
  }

  export type GetArticleFavoriteAggregateType<T extends ArticleFavoriteAggregateArgs> = {
        [P in keyof T & keyof AggregateArticleFavorite]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArticleFavorite[P]>
      : GetScalarType<T[P], AggregateArticleFavorite[P]>
  }




  export type ArticleFavoriteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArticleFavoriteWhereInput
    orderBy?: ArticleFavoriteOrderByWithAggregationInput | ArticleFavoriteOrderByWithAggregationInput[]
    by: ArticleFavoriteScalarFieldEnum[] | ArticleFavoriteScalarFieldEnum
    having?: ArticleFavoriteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ArticleFavoriteCountAggregateInputType | true
    _avg?: ArticleFavoriteAvgAggregateInputType
    _sum?: ArticleFavoriteSumAggregateInputType
    _min?: ArticleFavoriteMinAggregateInputType
    _max?: ArticleFavoriteMaxAggregateInputType
  }

  export type ArticleFavoriteGroupByOutputType = {
    id: number
    userId: number
    articleId: number
    createdAt: Date
    _count: ArticleFavoriteCountAggregateOutputType | null
    _avg: ArticleFavoriteAvgAggregateOutputType | null
    _sum: ArticleFavoriteSumAggregateOutputType | null
    _min: ArticleFavoriteMinAggregateOutputType | null
    _max: ArticleFavoriteMaxAggregateOutputType | null
  }

  type GetArticleFavoriteGroupByPayload<T extends ArticleFavoriteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ArticleFavoriteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ArticleFavoriteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ArticleFavoriteGroupByOutputType[P]>
            : GetScalarType<T[P], ArticleFavoriteGroupByOutputType[P]>
        }
      >
    >


  export type ArticleFavoriteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    articleId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    article?: boolean | ArticleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["articleFavorite"]>



  export type ArticleFavoriteSelectScalar = {
    id?: boolean
    userId?: boolean
    articleId?: boolean
    createdAt?: boolean
  }

  export type ArticleFavoriteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "articleId" | "createdAt", ExtArgs["result"]["articleFavorite"]>
  export type ArticleFavoriteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    article?: boolean | ArticleDefaultArgs<ExtArgs>
  }

  export type $ArticleFavoritePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ArticleFavorite"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      article: Prisma.$ArticlePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      articleId: number
      createdAt: Date
    }, ExtArgs["result"]["articleFavorite"]>
    composites: {}
  }

  type ArticleFavoriteGetPayload<S extends boolean | null | undefined | ArticleFavoriteDefaultArgs> = $Result.GetResult<Prisma.$ArticleFavoritePayload, S>

  type ArticleFavoriteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ArticleFavoriteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ArticleFavoriteCountAggregateInputType | true
    }

  export interface ArticleFavoriteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ArticleFavorite'], meta: { name: 'ArticleFavorite' } }
    /**
     * Find zero or one ArticleFavorite that matches the filter.
     * @param {ArticleFavoriteFindUniqueArgs} args - Arguments to find a ArticleFavorite
     * @example
     * // Get one ArticleFavorite
     * const articleFavorite = await prisma.articleFavorite.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ArticleFavoriteFindUniqueArgs>(args: SelectSubset<T, ArticleFavoriteFindUniqueArgs<ExtArgs>>): Prisma__ArticleFavoriteClient<$Result.GetResult<Prisma.$ArticleFavoritePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ArticleFavorite that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ArticleFavoriteFindUniqueOrThrowArgs} args - Arguments to find a ArticleFavorite
     * @example
     * // Get one ArticleFavorite
     * const articleFavorite = await prisma.articleFavorite.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ArticleFavoriteFindUniqueOrThrowArgs>(args: SelectSubset<T, ArticleFavoriteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ArticleFavoriteClient<$Result.GetResult<Prisma.$ArticleFavoritePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ArticleFavorite that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleFavoriteFindFirstArgs} args - Arguments to find a ArticleFavorite
     * @example
     * // Get one ArticleFavorite
     * const articleFavorite = await prisma.articleFavorite.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ArticleFavoriteFindFirstArgs>(args?: SelectSubset<T, ArticleFavoriteFindFirstArgs<ExtArgs>>): Prisma__ArticleFavoriteClient<$Result.GetResult<Prisma.$ArticleFavoritePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ArticleFavorite that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleFavoriteFindFirstOrThrowArgs} args - Arguments to find a ArticleFavorite
     * @example
     * // Get one ArticleFavorite
     * const articleFavorite = await prisma.articleFavorite.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ArticleFavoriteFindFirstOrThrowArgs>(args?: SelectSubset<T, ArticleFavoriteFindFirstOrThrowArgs<ExtArgs>>): Prisma__ArticleFavoriteClient<$Result.GetResult<Prisma.$ArticleFavoritePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ArticleFavorites that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleFavoriteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ArticleFavorites
     * const articleFavorites = await prisma.articleFavorite.findMany()
     * 
     * // Get first 10 ArticleFavorites
     * const articleFavorites = await prisma.articleFavorite.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const articleFavoriteWithIdOnly = await prisma.articleFavorite.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ArticleFavoriteFindManyArgs>(args?: SelectSubset<T, ArticleFavoriteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticleFavoritePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ArticleFavorite.
     * @param {ArticleFavoriteCreateArgs} args - Arguments to create a ArticleFavorite.
     * @example
     * // Create one ArticleFavorite
     * const ArticleFavorite = await prisma.articleFavorite.create({
     *   data: {
     *     // ... data to create a ArticleFavorite
     *   }
     * })
     * 
     */
    create<T extends ArticleFavoriteCreateArgs>(args: SelectSubset<T, ArticleFavoriteCreateArgs<ExtArgs>>): Prisma__ArticleFavoriteClient<$Result.GetResult<Prisma.$ArticleFavoritePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ArticleFavorites.
     * @param {ArticleFavoriteCreateManyArgs} args - Arguments to create many ArticleFavorites.
     * @example
     * // Create many ArticleFavorites
     * const articleFavorite = await prisma.articleFavorite.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ArticleFavoriteCreateManyArgs>(args?: SelectSubset<T, ArticleFavoriteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ArticleFavorite.
     * @param {ArticleFavoriteDeleteArgs} args - Arguments to delete one ArticleFavorite.
     * @example
     * // Delete one ArticleFavorite
     * const ArticleFavorite = await prisma.articleFavorite.delete({
     *   where: {
     *     // ... filter to delete one ArticleFavorite
     *   }
     * })
     * 
     */
    delete<T extends ArticleFavoriteDeleteArgs>(args: SelectSubset<T, ArticleFavoriteDeleteArgs<ExtArgs>>): Prisma__ArticleFavoriteClient<$Result.GetResult<Prisma.$ArticleFavoritePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ArticleFavorite.
     * @param {ArticleFavoriteUpdateArgs} args - Arguments to update one ArticleFavorite.
     * @example
     * // Update one ArticleFavorite
     * const articleFavorite = await prisma.articleFavorite.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ArticleFavoriteUpdateArgs>(args: SelectSubset<T, ArticleFavoriteUpdateArgs<ExtArgs>>): Prisma__ArticleFavoriteClient<$Result.GetResult<Prisma.$ArticleFavoritePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ArticleFavorites.
     * @param {ArticleFavoriteDeleteManyArgs} args - Arguments to filter ArticleFavorites to delete.
     * @example
     * // Delete a few ArticleFavorites
     * const { count } = await prisma.articleFavorite.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ArticleFavoriteDeleteManyArgs>(args?: SelectSubset<T, ArticleFavoriteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ArticleFavorites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleFavoriteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ArticleFavorites
     * const articleFavorite = await prisma.articleFavorite.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ArticleFavoriteUpdateManyArgs>(args: SelectSubset<T, ArticleFavoriteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ArticleFavorite.
     * @param {ArticleFavoriteUpsertArgs} args - Arguments to update or create a ArticleFavorite.
     * @example
     * // Update or create a ArticleFavorite
     * const articleFavorite = await prisma.articleFavorite.upsert({
     *   create: {
     *     // ... data to create a ArticleFavorite
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ArticleFavorite we want to update
     *   }
     * })
     */
    upsert<T extends ArticleFavoriteUpsertArgs>(args: SelectSubset<T, ArticleFavoriteUpsertArgs<ExtArgs>>): Prisma__ArticleFavoriteClient<$Result.GetResult<Prisma.$ArticleFavoritePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ArticleFavorites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleFavoriteCountArgs} args - Arguments to filter ArticleFavorites to count.
     * @example
     * // Count the number of ArticleFavorites
     * const count = await prisma.articleFavorite.count({
     *   where: {
     *     // ... the filter for the ArticleFavorites we want to count
     *   }
     * })
    **/
    count<T extends ArticleFavoriteCountArgs>(
      args?: Subset<T, ArticleFavoriteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ArticleFavoriteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ArticleFavorite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleFavoriteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ArticleFavoriteAggregateArgs>(args: Subset<T, ArticleFavoriteAggregateArgs>): Prisma.PrismaPromise<GetArticleFavoriteAggregateType<T>>

    /**
     * Group by ArticleFavorite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleFavoriteGroupByArgs} args - Group by arguments.
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
      T extends ArticleFavoriteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ArticleFavoriteGroupByArgs['orderBy'] }
        : { orderBy?: ArticleFavoriteGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ArticleFavoriteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetArticleFavoriteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ArticleFavorite model
   */
  readonly fields: ArticleFavoriteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ArticleFavorite.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ArticleFavoriteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    article<T extends ArticleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ArticleDefaultArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the ArticleFavorite model
   */
  interface ArticleFavoriteFieldRefs {
    readonly id: FieldRef<"ArticleFavorite", 'Int'>
    readonly userId: FieldRef<"ArticleFavorite", 'Int'>
    readonly articleId: FieldRef<"ArticleFavorite", 'Int'>
    readonly createdAt: FieldRef<"ArticleFavorite", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ArticleFavorite findUnique
   */
  export type ArticleFavoriteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleFavorite
     */
    select?: ArticleFavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleFavorite
     */
    omit?: ArticleFavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleFavoriteInclude<ExtArgs> | null
    /**
     * Filter, which ArticleFavorite to fetch.
     */
    where: ArticleFavoriteWhereUniqueInput
  }

  /**
   * ArticleFavorite findUniqueOrThrow
   */
  export type ArticleFavoriteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleFavorite
     */
    select?: ArticleFavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleFavorite
     */
    omit?: ArticleFavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleFavoriteInclude<ExtArgs> | null
    /**
     * Filter, which ArticleFavorite to fetch.
     */
    where: ArticleFavoriteWhereUniqueInput
  }

  /**
   * ArticleFavorite findFirst
   */
  export type ArticleFavoriteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleFavorite
     */
    select?: ArticleFavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleFavorite
     */
    omit?: ArticleFavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleFavoriteInclude<ExtArgs> | null
    /**
     * Filter, which ArticleFavorite to fetch.
     */
    where?: ArticleFavoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArticleFavorites to fetch.
     */
    orderBy?: ArticleFavoriteOrderByWithRelationInput | ArticleFavoriteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArticleFavorites.
     */
    cursor?: ArticleFavoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArticleFavorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArticleFavorites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArticleFavorites.
     */
    distinct?: ArticleFavoriteScalarFieldEnum | ArticleFavoriteScalarFieldEnum[]
  }

  /**
   * ArticleFavorite findFirstOrThrow
   */
  export type ArticleFavoriteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleFavorite
     */
    select?: ArticleFavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleFavorite
     */
    omit?: ArticleFavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleFavoriteInclude<ExtArgs> | null
    /**
     * Filter, which ArticleFavorite to fetch.
     */
    where?: ArticleFavoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArticleFavorites to fetch.
     */
    orderBy?: ArticleFavoriteOrderByWithRelationInput | ArticleFavoriteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArticleFavorites.
     */
    cursor?: ArticleFavoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArticleFavorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArticleFavorites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArticleFavorites.
     */
    distinct?: ArticleFavoriteScalarFieldEnum | ArticleFavoriteScalarFieldEnum[]
  }

  /**
   * ArticleFavorite findMany
   */
  export type ArticleFavoriteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleFavorite
     */
    select?: ArticleFavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleFavorite
     */
    omit?: ArticleFavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleFavoriteInclude<ExtArgs> | null
    /**
     * Filter, which ArticleFavorites to fetch.
     */
    where?: ArticleFavoriteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArticleFavorites to fetch.
     */
    orderBy?: ArticleFavoriteOrderByWithRelationInput | ArticleFavoriteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ArticleFavorites.
     */
    cursor?: ArticleFavoriteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArticleFavorites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArticleFavorites.
     */
    skip?: number
    distinct?: ArticleFavoriteScalarFieldEnum | ArticleFavoriteScalarFieldEnum[]
  }

  /**
   * ArticleFavorite create
   */
  export type ArticleFavoriteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleFavorite
     */
    select?: ArticleFavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleFavorite
     */
    omit?: ArticleFavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleFavoriteInclude<ExtArgs> | null
    /**
     * The data needed to create a ArticleFavorite.
     */
    data: XOR<ArticleFavoriteCreateInput, ArticleFavoriteUncheckedCreateInput>
  }

  /**
   * ArticleFavorite createMany
   */
  export type ArticleFavoriteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ArticleFavorites.
     */
    data: ArticleFavoriteCreateManyInput | ArticleFavoriteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ArticleFavorite update
   */
  export type ArticleFavoriteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleFavorite
     */
    select?: ArticleFavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleFavorite
     */
    omit?: ArticleFavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleFavoriteInclude<ExtArgs> | null
    /**
     * The data needed to update a ArticleFavorite.
     */
    data: XOR<ArticleFavoriteUpdateInput, ArticleFavoriteUncheckedUpdateInput>
    /**
     * Choose, which ArticleFavorite to update.
     */
    where: ArticleFavoriteWhereUniqueInput
  }

  /**
   * ArticleFavorite updateMany
   */
  export type ArticleFavoriteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ArticleFavorites.
     */
    data: XOR<ArticleFavoriteUpdateManyMutationInput, ArticleFavoriteUncheckedUpdateManyInput>
    /**
     * Filter which ArticleFavorites to update
     */
    where?: ArticleFavoriteWhereInput
    /**
     * Limit how many ArticleFavorites to update.
     */
    limit?: number
  }

  /**
   * ArticleFavorite upsert
   */
  export type ArticleFavoriteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleFavorite
     */
    select?: ArticleFavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleFavorite
     */
    omit?: ArticleFavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleFavoriteInclude<ExtArgs> | null
    /**
     * The filter to search for the ArticleFavorite to update in case it exists.
     */
    where: ArticleFavoriteWhereUniqueInput
    /**
     * In case the ArticleFavorite found by the `where` argument doesn't exist, create a new ArticleFavorite with this data.
     */
    create: XOR<ArticleFavoriteCreateInput, ArticleFavoriteUncheckedCreateInput>
    /**
     * In case the ArticleFavorite was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ArticleFavoriteUpdateInput, ArticleFavoriteUncheckedUpdateInput>
  }

  /**
   * ArticleFavorite delete
   */
  export type ArticleFavoriteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleFavorite
     */
    select?: ArticleFavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleFavorite
     */
    omit?: ArticleFavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleFavoriteInclude<ExtArgs> | null
    /**
     * Filter which ArticleFavorite to delete.
     */
    where: ArticleFavoriteWhereUniqueInput
  }

  /**
   * ArticleFavorite deleteMany
   */
  export type ArticleFavoriteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArticleFavorites to delete
     */
    where?: ArticleFavoriteWhereInput
    /**
     * Limit how many ArticleFavorites to delete.
     */
    limit?: number
  }

  /**
   * ArticleFavorite without action
   */
  export type ArticleFavoriteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleFavorite
     */
    select?: ArticleFavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleFavorite
     */
    omit?: ArticleFavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleFavoriteInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
    favs: number | null
    count: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
    favs: number | null
    count: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    username: string | null
    phone: string | null
    nickname: string | null
    password: string | null
    email: string | null
    favs: number | null
    gender: string | null
    roles: string | null
    avatar: string | null
    status: string | null
    regmark: string | null
    location: string | null
    isVip: string | null
    count: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    username: string | null
    phone: string | null
    nickname: string | null
    password: string | null
    email: string | null
    favs: number | null
    gender: string | null
    roles: string | null
    avatar: string | null
    status: string | null
    regmark: string | null
    location: string | null
    isVip: string | null
    count: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    phone: number
    nickname: number
    password: number
    email: number
    favs: number
    gender: number
    roles: number
    avatar: number
    status: number
    regmark: number
    location: number
    isVip: number
    count: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
    favs?: true
    count?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
    favs?: true
    count?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    phone?: true
    nickname?: true
    password?: true
    email?: true
    favs?: true
    gender?: true
    roles?: true
    avatar?: true
    status?: true
    regmark?: true
    location?: true
    isVip?: true
    count?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    phone?: true
    nickname?: true
    password?: true
    email?: true
    favs?: true
    gender?: true
    roles?: true
    avatar?: true
    status?: true
    regmark?: true
    location?: true
    isVip?: true
    count?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    phone?: true
    nickname?: true
    password?: true
    email?: true
    favs?: true
    gender?: true
    roles?: true
    avatar?: true
    status?: true
    regmark?: true
    location?: true
    isVip?: true
    count?: true
    createdAt?: true
    updatedAt?: true
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
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
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
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    username: string
    phone: string
    nickname: string
    password: string
    email: string
    favs: number
    gender: string
    roles: string
    avatar: string
    status: string
    regmark: string
    location: string
    isVip: string
    count: number
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
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
    username?: boolean
    phone?: boolean
    nickname?: boolean
    password?: boolean
    email?: boolean
    favs?: boolean
    gender?: boolean
    roles?: boolean
    avatar?: boolean
    status?: boolean
    regmark?: boolean
    location?: boolean
    isVip?: boolean
    count?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    posts?: boolean | User$postsArgs<ExtArgs>
    comments?: boolean | User$commentsArgs<ExtArgs>
    articles?: boolean | User$articlesArgs<ExtArgs>
    articleComments?: boolean | User$articleCommentsArgs<ExtArgs>
    articleLikes?: boolean | User$articleLikesArgs<ExtArgs>
    articleFavorites?: boolean | User$articleFavoritesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    phone?: boolean
    nickname?: boolean
    password?: boolean
    email?: boolean
    favs?: boolean
    gender?: boolean
    roles?: boolean
    avatar?: boolean
    status?: boolean
    regmark?: boolean
    location?: boolean
    isVip?: boolean
    count?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "phone" | "nickname" | "password" | "email" | "favs" | "gender" | "roles" | "avatar" | "status" | "regmark" | "location" | "isVip" | "count" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    posts?: boolean | User$postsArgs<ExtArgs>
    comments?: boolean | User$commentsArgs<ExtArgs>
    articles?: boolean | User$articlesArgs<ExtArgs>
    articleComments?: boolean | User$articleCommentsArgs<ExtArgs>
    articleLikes?: boolean | User$articleLikesArgs<ExtArgs>
    articleFavorites?: boolean | User$articleFavoritesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      posts: Prisma.$PostPayload<ExtArgs>[]
      comments: Prisma.$CommentPayload<ExtArgs>[]
      articles: Prisma.$ArticlePayload<ExtArgs>[]
      articleComments: Prisma.$ArticleCommentPayload<ExtArgs>[]
      articleLikes: Prisma.$ArticleLikePayload<ExtArgs>[]
      articleFavorites: Prisma.$ArticleFavoritePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      username: string
      phone: string
      nickname: string
      password: string
      email: string
      favs: number
      gender: string
      roles: string
      avatar: string
      status: string
      regmark: string
      location: string
      isVip: string
      count: number
      createdAt: Date
      updatedAt: Date
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
    posts<T extends User$postsArgs<ExtArgs> = {}>(args?: Subset<T, User$postsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    comments<T extends User$commentsArgs<ExtArgs> = {}>(args?: Subset<T, User$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    articles<T extends User$articlesArgs<ExtArgs> = {}>(args?: Subset<T, User$articlesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    articleComments<T extends User$articleCommentsArgs<ExtArgs> = {}>(args?: Subset<T, User$articleCommentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticleCommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    articleLikes<T extends User$articleLikesArgs<ExtArgs> = {}>(args?: Subset<T, User$articleLikesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticleLikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    articleFavorites<T extends User$articleFavoritesArgs<ExtArgs> = {}>(args?: Subset<T, User$articleFavoritesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticleFavoritePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly id: FieldRef<"User", 'Int'>
    readonly username: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly nickname: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly favs: FieldRef<"User", 'Int'>
    readonly gender: FieldRef<"User", 'String'>
    readonly roles: FieldRef<"User", 'String'>
    readonly avatar: FieldRef<"User", 'String'>
    readonly status: FieldRef<"User", 'String'>
    readonly regmark: FieldRef<"User", 'String'>
    readonly location: FieldRef<"User", 'String'>
    readonly isVip: FieldRef<"User", 'String'>
    readonly count: FieldRef<"User", 'Int'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
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
   * User.posts
   */
  export type User$postsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    where?: PostWhereInput
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    cursor?: PostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * User.comments
   */
  export type User$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    cursor?: CommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * User.articles
   */
  export type User$articlesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    where?: ArticleWhereInput
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    cursor?: ArticleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ArticleScalarFieldEnum | ArticleScalarFieldEnum[]
  }

  /**
   * User.articleComments
   */
  export type User$articleCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleComment
     */
    select?: ArticleCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleComment
     */
    omit?: ArticleCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleCommentInclude<ExtArgs> | null
    where?: ArticleCommentWhereInput
    orderBy?: ArticleCommentOrderByWithRelationInput | ArticleCommentOrderByWithRelationInput[]
    cursor?: ArticleCommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ArticleCommentScalarFieldEnum | ArticleCommentScalarFieldEnum[]
  }

  /**
   * User.articleLikes
   */
  export type User$articleLikesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleLike
     */
    select?: ArticleLikeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleLike
     */
    omit?: ArticleLikeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleLikeInclude<ExtArgs> | null
    where?: ArticleLikeWhereInput
    orderBy?: ArticleLikeOrderByWithRelationInput | ArticleLikeOrderByWithRelationInput[]
    cursor?: ArticleLikeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ArticleLikeScalarFieldEnum | ArticleLikeScalarFieldEnum[]
  }

  /**
   * User.articleFavorites
   */
  export type User$articleFavoritesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleFavorite
     */
    select?: ArticleFavoriteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleFavorite
     */
    omit?: ArticleFavoriteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleFavoriteInclude<ExtArgs> | null
    where?: ArticleFavoriteWhereInput
    orderBy?: ArticleFavoriteOrderByWithRelationInput | ArticleFavoriteOrderByWithRelationInput[]
    cursor?: ArticleFavoriteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ArticleFavoriteScalarFieldEnum | ArticleFavoriteScalarFieldEnum[]
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
   * Model Comment
   */

  export type AggregateComment = {
    _count: CommentCountAggregateOutputType | null
    _avg: CommentAvgAggregateOutputType | null
    _sum: CommentSumAggregateOutputType | null
    _min: CommentMinAggregateOutputType | null
    _max: CommentMaxAggregateOutputType | null
  }

  export type CommentAvgAggregateOutputType = {
    id: number | null
    postId: number | null
    authorId: number | null
    hands: number | null
  }

  export type CommentSumAggregateOutputType = {
    id: number | null
    postId: number | null
    authorId: number | null
    hands: number | null
  }

  export type CommentMinAggregateOutputType = {
    id: number | null
    content: string | null
    postId: number | null
    authorId: number | null
    hands: number | null
    status: string | null
    isRead: string | null
    isBest: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CommentMaxAggregateOutputType = {
    id: number | null
    content: string | null
    postId: number | null
    authorId: number | null
    hands: number | null
    status: string | null
    isRead: string | null
    isBest: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CommentCountAggregateOutputType = {
    id: number
    content: number
    postId: number
    authorId: number
    hands: number
    status: number
    isRead: number
    isBest: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CommentAvgAggregateInputType = {
    id?: true
    postId?: true
    authorId?: true
    hands?: true
  }

  export type CommentSumAggregateInputType = {
    id?: true
    postId?: true
    authorId?: true
    hands?: true
  }

  export type CommentMinAggregateInputType = {
    id?: true
    content?: true
    postId?: true
    authorId?: true
    hands?: true
    status?: true
    isRead?: true
    isBest?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CommentMaxAggregateInputType = {
    id?: true
    content?: true
    postId?: true
    authorId?: true
    hands?: true
    status?: true
    isRead?: true
    isBest?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CommentCountAggregateInputType = {
    id?: true
    content?: true
    postId?: true
    authorId?: true
    hands?: true
    status?: true
    isRead?: true
    isBest?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CommentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Comment to aggregate.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Comments
    **/
    _count?: true | CommentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CommentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CommentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommentMaxAggregateInputType
  }

  export type GetCommentAggregateType<T extends CommentAggregateArgs> = {
        [P in keyof T & keyof AggregateComment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComment[P]>
      : GetScalarType<T[P], AggregateComment[P]>
  }




  export type CommentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithAggregationInput | CommentOrderByWithAggregationInput[]
    by: CommentScalarFieldEnum[] | CommentScalarFieldEnum
    having?: CommentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommentCountAggregateInputType | true
    _avg?: CommentAvgAggregateInputType
    _sum?: CommentSumAggregateInputType
    _min?: CommentMinAggregateInputType
    _max?: CommentMaxAggregateInputType
  }

  export type CommentGroupByOutputType = {
    id: number
    content: string
    postId: number
    authorId: number
    hands: number
    status: string
    isRead: string
    isBest: string
    createdAt: Date
    updatedAt: Date
    _count: CommentCountAggregateOutputType | null
    _avg: CommentAvgAggregateOutputType | null
    _sum: CommentSumAggregateOutputType | null
    _min: CommentMinAggregateOutputType | null
    _max: CommentMaxAggregateOutputType | null
  }

  type GetCommentGroupByPayload<T extends CommentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CommentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommentGroupByOutputType[P]>
            : GetScalarType<T[P], CommentGroupByOutputType[P]>
        }
      >
    >


  export type CommentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    postId?: boolean
    authorId?: boolean
    hands?: boolean
    status?: boolean
    isRead?: boolean
    isBest?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    post?: boolean | PostDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>



  export type CommentSelectScalar = {
    id?: boolean
    content?: boolean
    postId?: boolean
    authorId?: boolean
    hands?: boolean
    status?: boolean
    isRead?: boolean
    isBest?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CommentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "content" | "postId" | "authorId" | "hands" | "status" | "isRead" | "isBest" | "createdAt" | "updatedAt", ExtArgs["result"]["comment"]>
  export type CommentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CommentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Comment"
    objects: {
      post: Prisma.$PostPayload<ExtArgs>
      author: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      content: string
      postId: number
      authorId: number
      hands: number
      status: string
      isRead: string
      isBest: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["comment"]>
    composites: {}
  }

  type CommentGetPayload<S extends boolean | null | undefined | CommentDefaultArgs> = $Result.GetResult<Prisma.$CommentPayload, S>

  type CommentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CommentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CommentCountAggregateInputType | true
    }

  export interface CommentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Comment'], meta: { name: 'Comment' } }
    /**
     * Find zero or one Comment that matches the filter.
     * @param {CommentFindUniqueArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CommentFindUniqueArgs>(args: SelectSubset<T, CommentFindUniqueArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Comment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CommentFindUniqueOrThrowArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CommentFindUniqueOrThrowArgs>(args: SelectSubset<T, CommentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Comment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindFirstArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CommentFindFirstArgs>(args?: SelectSubset<T, CommentFindFirstArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Comment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindFirstOrThrowArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CommentFindFirstOrThrowArgs>(args?: SelectSubset<T, CommentFindFirstOrThrowArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Comments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Comments
     * const comments = await prisma.comment.findMany()
     * 
     * // Get first 10 Comments
     * const comments = await prisma.comment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const commentWithIdOnly = await prisma.comment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CommentFindManyArgs>(args?: SelectSubset<T, CommentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Comment.
     * @param {CommentCreateArgs} args - Arguments to create a Comment.
     * @example
     * // Create one Comment
     * const Comment = await prisma.comment.create({
     *   data: {
     *     // ... data to create a Comment
     *   }
     * })
     * 
     */
    create<T extends CommentCreateArgs>(args: SelectSubset<T, CommentCreateArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Comments.
     * @param {CommentCreateManyArgs} args - Arguments to create many Comments.
     * @example
     * // Create many Comments
     * const comment = await prisma.comment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CommentCreateManyArgs>(args?: SelectSubset<T, CommentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Comment.
     * @param {CommentDeleteArgs} args - Arguments to delete one Comment.
     * @example
     * // Delete one Comment
     * const Comment = await prisma.comment.delete({
     *   where: {
     *     // ... filter to delete one Comment
     *   }
     * })
     * 
     */
    delete<T extends CommentDeleteArgs>(args: SelectSubset<T, CommentDeleteArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Comment.
     * @param {CommentUpdateArgs} args - Arguments to update one Comment.
     * @example
     * // Update one Comment
     * const comment = await prisma.comment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CommentUpdateArgs>(args: SelectSubset<T, CommentUpdateArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Comments.
     * @param {CommentDeleteManyArgs} args - Arguments to filter Comments to delete.
     * @example
     * // Delete a few Comments
     * const { count } = await prisma.comment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CommentDeleteManyArgs>(args?: SelectSubset<T, CommentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Comments
     * const comment = await prisma.comment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CommentUpdateManyArgs>(args: SelectSubset<T, CommentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Comment.
     * @param {CommentUpsertArgs} args - Arguments to update or create a Comment.
     * @example
     * // Update or create a Comment
     * const comment = await prisma.comment.upsert({
     *   create: {
     *     // ... data to create a Comment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Comment we want to update
     *   }
     * })
     */
    upsert<T extends CommentUpsertArgs>(args: SelectSubset<T, CommentUpsertArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentCountArgs} args - Arguments to filter Comments to count.
     * @example
     * // Count the number of Comments
     * const count = await prisma.comment.count({
     *   where: {
     *     // ... the filter for the Comments we want to count
     *   }
     * })
    **/
    count<T extends CommentCountArgs>(
      args?: Subset<T, CommentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Comment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CommentAggregateArgs>(args: Subset<T, CommentAggregateArgs>): Prisma.PrismaPromise<GetCommentAggregateType<T>>

    /**
     * Group by Comment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentGroupByArgs} args - Group by arguments.
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
      T extends CommentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CommentGroupByArgs['orderBy'] }
        : { orderBy?: CommentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CommentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Comment model
   */
  readonly fields: CommentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Comment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CommentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    post<T extends PostDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PostDefaultArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    author<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Comment model
   */
  interface CommentFieldRefs {
    readonly id: FieldRef<"Comment", 'Int'>
    readonly content: FieldRef<"Comment", 'String'>
    readonly postId: FieldRef<"Comment", 'Int'>
    readonly authorId: FieldRef<"Comment", 'Int'>
    readonly hands: FieldRef<"Comment", 'Int'>
    readonly status: FieldRef<"Comment", 'String'>
    readonly isRead: FieldRef<"Comment", 'String'>
    readonly isBest: FieldRef<"Comment", 'String'>
    readonly createdAt: FieldRef<"Comment", 'DateTime'>
    readonly updatedAt: FieldRef<"Comment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Comment findUnique
   */
  export type CommentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment findUniqueOrThrow
   */
  export type CommentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment findFirst
   */
  export type CommentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comments.
     */
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment findFirstOrThrow
   */
  export type CommentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comments.
     */
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment findMany
   */
  export type CommentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comments to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment create
   */
  export type CommentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The data needed to create a Comment.
     */
    data: XOR<CommentCreateInput, CommentUncheckedCreateInput>
  }

  /**
   * Comment createMany
   */
  export type CommentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Comments.
     */
    data: CommentCreateManyInput | CommentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Comment update
   */
  export type CommentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The data needed to update a Comment.
     */
    data: XOR<CommentUpdateInput, CommentUncheckedUpdateInput>
    /**
     * Choose, which Comment to update.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment updateMany
   */
  export type CommentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Comments.
     */
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyInput>
    /**
     * Filter which Comments to update
     */
    where?: CommentWhereInput
    /**
     * Limit how many Comments to update.
     */
    limit?: number
  }

  /**
   * Comment upsert
   */
  export type CommentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The filter to search for the Comment to update in case it exists.
     */
    where: CommentWhereUniqueInput
    /**
     * In case the Comment found by the `where` argument doesn't exist, create a new Comment with this data.
     */
    create: XOR<CommentCreateInput, CommentUncheckedCreateInput>
    /**
     * In case the Comment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CommentUpdateInput, CommentUncheckedUpdateInput>
  }

  /**
   * Comment delete
   */
  export type CommentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter which Comment to delete.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment deleteMany
   */
  export type CommentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Comments to delete
     */
    where?: CommentWhereInput
    /**
     * Limit how many Comments to delete.
     */
    limit?: number
  }

  /**
   * Comment without action
   */
  export type CommentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
  }


  /**
   * Model Post
   */

  export type AggregatePost = {
    _count: PostCountAggregateOutputType | null
    _avg: PostAvgAggregateOutputType | null
    _sum: PostSumAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  export type PostAvgAggregateOutputType = {
    id: number | null
    viewCount: number | null
    authorId: number | null
  }

  export type PostSumAggregateOutputType = {
    id: number | null
    viewCount: number | null
    authorId: number | null
  }

  export type PostMinAggregateOutputType = {
    id: number | null
    title: string | null
    content: string | null
    published: boolean | null
    viewCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
    authorId: number | null
  }

  export type PostMaxAggregateOutputType = {
    id: number | null
    title: string | null
    content: string | null
    published: boolean | null
    viewCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
    authorId: number | null
  }

  export type PostCountAggregateOutputType = {
    id: number
    title: number
    content: number
    published: number
    viewCount: number
    createdAt: number
    updatedAt: number
    authorId: number
    _all: number
  }


  export type PostAvgAggregateInputType = {
    id?: true
    viewCount?: true
    authorId?: true
  }

  export type PostSumAggregateInputType = {
    id?: true
    viewCount?: true
    authorId?: true
  }

  export type PostMinAggregateInputType = {
    id?: true
    title?: true
    content?: true
    published?: true
    viewCount?: true
    createdAt?: true
    updatedAt?: true
    authorId?: true
  }

  export type PostMaxAggregateInputType = {
    id?: true
    title?: true
    content?: true
    published?: true
    viewCount?: true
    createdAt?: true
    updatedAt?: true
    authorId?: true
  }

  export type PostCountAggregateInputType = {
    id?: true
    title?: true
    content?: true
    published?: true
    viewCount?: true
    createdAt?: true
    updatedAt?: true
    authorId?: true
    _all?: true
  }

  export type PostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Post to aggregate.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Posts
    **/
    _count?: true | PostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PostAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PostSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostMaxAggregateInputType
  }

  export type GetPostAggregateType<T extends PostAggregateArgs> = {
        [P in keyof T & keyof AggregatePost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePost[P]>
      : GetScalarType<T[P], AggregatePost[P]>
  }




  export type PostGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
    orderBy?: PostOrderByWithAggregationInput | PostOrderByWithAggregationInput[]
    by: PostScalarFieldEnum[] | PostScalarFieldEnum
    having?: PostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostCountAggregateInputType | true
    _avg?: PostAvgAggregateInputType
    _sum?: PostSumAggregateInputType
    _min?: PostMinAggregateInputType
    _max?: PostMaxAggregateInputType
  }

  export type PostGroupByOutputType = {
    id: number
    title: string
    content: string
    published: boolean
    viewCount: number
    createdAt: Date
    updatedAt: Date
    authorId: number
    _count: PostCountAggregateOutputType | null
    _avg: PostAvgAggregateOutputType | null
    _sum: PostSumAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  type GetPostGroupByPayload<T extends PostGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostGroupByOutputType[P]>
            : GetScalarType<T[P], PostGroupByOutputType[P]>
        }
      >
    >


  export type PostSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    published?: boolean
    viewCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    authorId?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
    comments?: boolean | Post$commentsArgs<ExtArgs>
    categories?: boolean | Post$categoriesArgs<ExtArgs>
    _count?: boolean | PostCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["post"]>



  export type PostSelectScalar = {
    id?: boolean
    title?: boolean
    content?: boolean
    published?: boolean
    viewCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    authorId?: boolean
  }

  export type PostOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "content" | "published" | "viewCount" | "createdAt" | "updatedAt" | "authorId", ExtArgs["result"]["post"]>
  export type PostInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
    comments?: boolean | Post$commentsArgs<ExtArgs>
    categories?: boolean | Post$categoriesArgs<ExtArgs>
    _count?: boolean | PostCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $PostPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Post"
    objects: {
      author: Prisma.$UserPayload<ExtArgs>
      comments: Prisma.$CommentPayload<ExtArgs>[]
      categories: Prisma.$CategoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      content: string
      published: boolean
      viewCount: number
      createdAt: Date
      updatedAt: Date
      authorId: number
    }, ExtArgs["result"]["post"]>
    composites: {}
  }

  type PostGetPayload<S extends boolean | null | undefined | PostDefaultArgs> = $Result.GetResult<Prisma.$PostPayload, S>

  type PostCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PostFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PostCountAggregateInputType | true
    }

  export interface PostDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Post'], meta: { name: 'Post' } }
    /**
     * Find zero or one Post that matches the filter.
     * @param {PostFindUniqueArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PostFindUniqueArgs>(args: SelectSubset<T, PostFindUniqueArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Post that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PostFindUniqueOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PostFindUniqueOrThrowArgs>(args: SelectSubset<T, PostFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Post that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindFirstArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PostFindFirstArgs>(args?: SelectSubset<T, PostFindFirstArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Post that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindFirstOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PostFindFirstOrThrowArgs>(args?: SelectSubset<T, PostFindFirstOrThrowArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Posts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Posts
     * const posts = await prisma.post.findMany()
     * 
     * // Get first 10 Posts
     * const posts = await prisma.post.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const postWithIdOnly = await prisma.post.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PostFindManyArgs>(args?: SelectSubset<T, PostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Post.
     * @param {PostCreateArgs} args - Arguments to create a Post.
     * @example
     * // Create one Post
     * const Post = await prisma.post.create({
     *   data: {
     *     // ... data to create a Post
     *   }
     * })
     * 
     */
    create<T extends PostCreateArgs>(args: SelectSubset<T, PostCreateArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Posts.
     * @param {PostCreateManyArgs} args - Arguments to create many Posts.
     * @example
     * // Create many Posts
     * const post = await prisma.post.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PostCreateManyArgs>(args?: SelectSubset<T, PostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Post.
     * @param {PostDeleteArgs} args - Arguments to delete one Post.
     * @example
     * // Delete one Post
     * const Post = await prisma.post.delete({
     *   where: {
     *     // ... filter to delete one Post
     *   }
     * })
     * 
     */
    delete<T extends PostDeleteArgs>(args: SelectSubset<T, PostDeleteArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Post.
     * @param {PostUpdateArgs} args - Arguments to update one Post.
     * @example
     * // Update one Post
     * const post = await prisma.post.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PostUpdateArgs>(args: SelectSubset<T, PostUpdateArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Posts.
     * @param {PostDeleteManyArgs} args - Arguments to filter Posts to delete.
     * @example
     * // Delete a few Posts
     * const { count } = await prisma.post.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PostDeleteManyArgs>(args?: SelectSubset<T, PostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Posts
     * const post = await prisma.post.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PostUpdateManyArgs>(args: SelectSubset<T, PostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Post.
     * @param {PostUpsertArgs} args - Arguments to update or create a Post.
     * @example
     * // Update or create a Post
     * const post = await prisma.post.upsert({
     *   create: {
     *     // ... data to create a Post
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Post we want to update
     *   }
     * })
     */
    upsert<T extends PostUpsertArgs>(args: SelectSubset<T, PostUpsertArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCountArgs} args - Arguments to filter Posts to count.
     * @example
     * // Count the number of Posts
     * const count = await prisma.post.count({
     *   where: {
     *     // ... the filter for the Posts we want to count
     *   }
     * })
    **/
    count<T extends PostCountArgs>(
      args?: Subset<T, PostCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PostAggregateArgs>(args: Subset<T, PostAggregateArgs>): Prisma.PrismaPromise<GetPostAggregateType<T>>

    /**
     * Group by Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostGroupByArgs} args - Group by arguments.
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
      T extends PostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostGroupByArgs['orderBy'] }
        : { orderBy?: PostGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Post model
   */
  readonly fields: PostFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Post.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PostClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    author<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    comments<T extends Post$commentsArgs<ExtArgs> = {}>(args?: Subset<T, Post$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    categories<T extends Post$categoriesArgs<ExtArgs> = {}>(args?: Subset<T, Post$categoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Post model
   */
  interface PostFieldRefs {
    readonly id: FieldRef<"Post", 'Int'>
    readonly title: FieldRef<"Post", 'String'>
    readonly content: FieldRef<"Post", 'String'>
    readonly published: FieldRef<"Post", 'Boolean'>
    readonly viewCount: FieldRef<"Post", 'Int'>
    readonly createdAt: FieldRef<"Post", 'DateTime'>
    readonly updatedAt: FieldRef<"Post", 'DateTime'>
    readonly authorId: FieldRef<"Post", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Post findUnique
   */
  export type PostFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post findUniqueOrThrow
   */
  export type PostFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post findFirst
   */
  export type PostFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     */
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post findFirstOrThrow
   */
  export type PostFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     */
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post findMany
   */
  export type PostFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Posts to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post create
   */
  export type PostCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * The data needed to create a Post.
     */
    data: XOR<PostCreateInput, PostUncheckedCreateInput>
  }

  /**
   * Post createMany
   */
  export type PostCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Posts.
     */
    data: PostCreateManyInput | PostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Post update
   */
  export type PostUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * The data needed to update a Post.
     */
    data: XOR<PostUpdateInput, PostUncheckedUpdateInput>
    /**
     * Choose, which Post to update.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post updateMany
   */
  export type PostUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Posts.
     */
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyInput>
    /**
     * Filter which Posts to update
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to update.
     */
    limit?: number
  }

  /**
   * Post upsert
   */
  export type PostUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * The filter to search for the Post to update in case it exists.
     */
    where: PostWhereUniqueInput
    /**
     * In case the Post found by the `where` argument doesn't exist, create a new Post with this data.
     */
    create: XOR<PostCreateInput, PostUncheckedCreateInput>
    /**
     * In case the Post was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PostUpdateInput, PostUncheckedUpdateInput>
  }

  /**
   * Post delete
   */
  export type PostDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter which Post to delete.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post deleteMany
   */
  export type PostDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Posts to delete
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to delete.
     */
    limit?: number
  }

  /**
   * Post.comments
   */
  export type Post$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    cursor?: CommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Post.categories
   */
  export type Post$categoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    cursor?: CategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Post without action
   */
  export type PostDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
  }


  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryAvgAggregateOutputType = {
    id: number | null
    sort: number | null
  }

  export type CategorySumAggregateOutputType = {
    id: number | null
    sort: number | null
  }

  export type CategoryMinAggregateOutputType = {
    id: number | null
    name: string | null
    sort: number | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: number | null
    name: string | null
    sort: number | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    name: number
    sort: number
    _all: number
  }


  export type CategoryAvgAggregateInputType = {
    id?: true
    sort?: true
  }

  export type CategorySumAggregateInputType = {
    id?: true
    sort?: true
  }

  export type CategoryMinAggregateInputType = {
    id?: true
    name?: true
    sort?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    name?: true
    sort?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    name?: true
    sort?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithAggregationInput | CategoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _avg?: CategoryAvgAggregateInputType
    _sum?: CategorySumAggregateInputType
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    id: number
    name: string
    sort: number
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    sort?: boolean
    posts?: boolean | Category$postsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>



  export type CategorySelectScalar = {
    id?: boolean
    name?: boolean
    sort?: boolean
  }

  export type CategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "sort", ExtArgs["result"]["category"]>
  export type CategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    posts?: boolean | Category$postsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $CategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {
      posts: Prisma.$PostPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      sort: number
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = $Result.GetResult<Prisma.$CategoryPayload, S>

  type CategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Category'], meta: { name: 'Category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryFindUniqueArgs>(args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryFindFirstArgs>(args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoryFindManyArgs>(args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends CategoryCreateArgs>(args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryCreateManyArgs>(args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends CategoryDeleteArgs>(args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryUpdateArgs>(args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryDeleteManyArgs>(args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryUpdateManyArgs>(args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends CategoryUpsertArgs>(args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
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
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Category model
   */
  readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    posts<T extends Category$postsArgs<ExtArgs> = {}>(args?: Subset<T, Category$postsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Category model
   */
  interface CategoryFieldRefs {
    readonly id: FieldRef<"Category", 'Int'>
    readonly name: FieldRef<"Category", 'String'>
    readonly sort: FieldRef<"Category", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category create
   */
  export type CategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category update
   */
  export type CategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to delete.
     */
    limit?: number
  }

  /**
   * Category.posts
   */
  export type Category$postsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    where?: PostWhereInput
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    cursor?: PostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
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


  export const ArticleCategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    sort: 'sort',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ArticleCategoryScalarFieldEnum = (typeof ArticleCategoryScalarFieldEnum)[keyof typeof ArticleCategoryScalarFieldEnum]


  export const ArticleScalarFieldEnum: {
    id: 'id',
    title: 'title',
    content: 'content',
    coverImage: 'coverImage',
    authorId: 'authorId',
    categoryId: 'categoryId',
    views: 'views',
    likesCount: 'likesCount',
    favCount: 'favCount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ArticleScalarFieldEnum = (typeof ArticleScalarFieldEnum)[keyof typeof ArticleScalarFieldEnum]


  export const ArticleCommentScalarFieldEnum: {
    id: 'id',
    articleId: 'articleId',
    userId: 'userId',
    parentId: 'parentId',
    content: 'content',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ArticleCommentScalarFieldEnum = (typeof ArticleCommentScalarFieldEnum)[keyof typeof ArticleCommentScalarFieldEnum]


  export const ArticleLikeScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    articleId: 'articleId',
    createdAt: 'createdAt'
  };

  export type ArticleLikeScalarFieldEnum = (typeof ArticleLikeScalarFieldEnum)[keyof typeof ArticleLikeScalarFieldEnum]


  export const ArticleFavoriteScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    articleId: 'articleId',
    createdAt: 'createdAt'
  };

  export type ArticleFavoriteScalarFieldEnum = (typeof ArticleFavoriteScalarFieldEnum)[keyof typeof ArticleFavoriteScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    phone: 'phone',
    nickname: 'nickname',
    password: 'password',
    email: 'email',
    favs: 'favs',
    gender: 'gender',
    roles: 'roles',
    avatar: 'avatar',
    status: 'status',
    regmark: 'regmark',
    location: 'location',
    isVip: 'isVip',
    count: 'count',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CommentScalarFieldEnum: {
    id: 'id',
    content: 'content',
    postId: 'postId',
    authorId: 'authorId',
    hands: 'hands',
    status: 'status',
    isRead: 'isRead',
    isBest: 'isBest',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CommentScalarFieldEnum = (typeof CommentScalarFieldEnum)[keyof typeof CommentScalarFieldEnum]


  export const PostScalarFieldEnum: {
    id: 'id',
    title: 'title',
    content: 'content',
    published: 'published',
    viewCount: 'viewCount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    authorId: 'authorId'
  };

  export type PostScalarFieldEnum = (typeof PostScalarFieldEnum)[keyof typeof PostScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    sort: 'sort'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const ArticleCategoryOrderByRelevanceFieldEnum: {
    name: 'name'
  };

  export type ArticleCategoryOrderByRelevanceFieldEnum = (typeof ArticleCategoryOrderByRelevanceFieldEnum)[keyof typeof ArticleCategoryOrderByRelevanceFieldEnum]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const ArticleOrderByRelevanceFieldEnum: {
    title: 'title',
    content: 'content',
    coverImage: 'coverImage'
  };

  export type ArticleOrderByRelevanceFieldEnum = (typeof ArticleOrderByRelevanceFieldEnum)[keyof typeof ArticleOrderByRelevanceFieldEnum]


  export const ArticleCommentOrderByRelevanceFieldEnum: {
    content: 'content'
  };

  export type ArticleCommentOrderByRelevanceFieldEnum = (typeof ArticleCommentOrderByRelevanceFieldEnum)[keyof typeof ArticleCommentOrderByRelevanceFieldEnum]


  export const UserOrderByRelevanceFieldEnum: {
    username: 'username',
    phone: 'phone',
    nickname: 'nickname',
    password: 'password',
    email: 'email',
    gender: 'gender',
    roles: 'roles',
    avatar: 'avatar',
    status: 'status',
    regmark: 'regmark',
    location: 'location',
    isVip: 'isVip'
  };

  export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum]


  export const CommentOrderByRelevanceFieldEnum: {
    content: 'content',
    status: 'status',
    isRead: 'isRead',
    isBest: 'isBest'
  };

  export type CommentOrderByRelevanceFieldEnum = (typeof CommentOrderByRelevanceFieldEnum)[keyof typeof CommentOrderByRelevanceFieldEnum]


  export const PostOrderByRelevanceFieldEnum: {
    title: 'title',
    content: 'content'
  };

  export type PostOrderByRelevanceFieldEnum = (typeof PostOrderByRelevanceFieldEnum)[keyof typeof PostOrderByRelevanceFieldEnum]


  export const CategoryOrderByRelevanceFieldEnum: {
    name: 'name'
  };

  export type CategoryOrderByRelevanceFieldEnum = (typeof CategoryOrderByRelevanceFieldEnum)[keyof typeof CategoryOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type ArticleCategoryWhereInput = {
    AND?: ArticleCategoryWhereInput | ArticleCategoryWhereInput[]
    OR?: ArticleCategoryWhereInput[]
    NOT?: ArticleCategoryWhereInput | ArticleCategoryWhereInput[]
    id?: IntFilter<"ArticleCategory"> | number
    name?: StringFilter<"ArticleCategory"> | string
    sort?: IntFilter<"ArticleCategory"> | number
    createdAt?: DateTimeFilter<"ArticleCategory"> | Date | string
    updatedAt?: DateTimeFilter<"ArticleCategory"> | Date | string
    articles?: ArticleListRelationFilter
  }

  export type ArticleCategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    sort?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    articles?: ArticleOrderByRelationAggregateInput
    _relevance?: ArticleCategoryOrderByRelevanceInput
  }

  export type ArticleCategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: ArticleCategoryWhereInput | ArticleCategoryWhereInput[]
    OR?: ArticleCategoryWhereInput[]
    NOT?: ArticleCategoryWhereInput | ArticleCategoryWhereInput[]
    sort?: IntFilter<"ArticleCategory"> | number
    createdAt?: DateTimeFilter<"ArticleCategory"> | Date | string
    updatedAt?: DateTimeFilter<"ArticleCategory"> | Date | string
    articles?: ArticleListRelationFilter
  }, "id" | "name">

  export type ArticleCategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    sort?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ArticleCategoryCountOrderByAggregateInput
    _avg?: ArticleCategoryAvgOrderByAggregateInput
    _max?: ArticleCategoryMaxOrderByAggregateInput
    _min?: ArticleCategoryMinOrderByAggregateInput
    _sum?: ArticleCategorySumOrderByAggregateInput
  }

  export type ArticleCategoryScalarWhereWithAggregatesInput = {
    AND?: ArticleCategoryScalarWhereWithAggregatesInput | ArticleCategoryScalarWhereWithAggregatesInput[]
    OR?: ArticleCategoryScalarWhereWithAggregatesInput[]
    NOT?: ArticleCategoryScalarWhereWithAggregatesInput | ArticleCategoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ArticleCategory"> | number
    name?: StringWithAggregatesFilter<"ArticleCategory"> | string
    sort?: IntWithAggregatesFilter<"ArticleCategory"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ArticleCategory"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ArticleCategory"> | Date | string
  }

  export type ArticleWhereInput = {
    AND?: ArticleWhereInput | ArticleWhereInput[]
    OR?: ArticleWhereInput[]
    NOT?: ArticleWhereInput | ArticleWhereInput[]
    id?: IntFilter<"Article"> | number
    title?: StringFilter<"Article"> | string
    content?: StringFilter<"Article"> | string
    coverImage?: StringNullableFilter<"Article"> | string | null
    authorId?: IntFilter<"Article"> | number
    categoryId?: IntFilter<"Article"> | number
    views?: IntFilter<"Article"> | number
    likesCount?: IntFilter<"Article"> | number
    favCount?: IntFilter<"Article"> | number
    createdAt?: DateTimeFilter<"Article"> | Date | string
    updatedAt?: DateTimeFilter<"Article"> | Date | string
    category?: XOR<ArticleCategoryScalarRelationFilter, ArticleCategoryWhereInput>
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    comments?: ArticleCommentListRelationFilter
    likes?: ArticleLikeListRelationFilter
    favorites?: ArticleFavoriteListRelationFilter
  }

  export type ArticleOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    coverImage?: SortOrderInput | SortOrder
    authorId?: SortOrder
    categoryId?: SortOrder
    views?: SortOrder
    likesCount?: SortOrder
    favCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    category?: ArticleCategoryOrderByWithRelationInput
    author?: UserOrderByWithRelationInput
    comments?: ArticleCommentOrderByRelationAggregateInput
    likes?: ArticleLikeOrderByRelationAggregateInput
    favorites?: ArticleFavoriteOrderByRelationAggregateInput
    _relevance?: ArticleOrderByRelevanceInput
  }

  export type ArticleWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ArticleWhereInput | ArticleWhereInput[]
    OR?: ArticleWhereInput[]
    NOT?: ArticleWhereInput | ArticleWhereInput[]
    title?: StringFilter<"Article"> | string
    content?: StringFilter<"Article"> | string
    coverImage?: StringNullableFilter<"Article"> | string | null
    authorId?: IntFilter<"Article"> | number
    categoryId?: IntFilter<"Article"> | number
    views?: IntFilter<"Article"> | number
    likesCount?: IntFilter<"Article"> | number
    favCount?: IntFilter<"Article"> | number
    createdAt?: DateTimeFilter<"Article"> | Date | string
    updatedAt?: DateTimeFilter<"Article"> | Date | string
    category?: XOR<ArticleCategoryScalarRelationFilter, ArticleCategoryWhereInput>
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    comments?: ArticleCommentListRelationFilter
    likes?: ArticleLikeListRelationFilter
    favorites?: ArticleFavoriteListRelationFilter
  }, "id">

  export type ArticleOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    coverImage?: SortOrderInput | SortOrder
    authorId?: SortOrder
    categoryId?: SortOrder
    views?: SortOrder
    likesCount?: SortOrder
    favCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ArticleCountOrderByAggregateInput
    _avg?: ArticleAvgOrderByAggregateInput
    _max?: ArticleMaxOrderByAggregateInput
    _min?: ArticleMinOrderByAggregateInput
    _sum?: ArticleSumOrderByAggregateInput
  }

  export type ArticleScalarWhereWithAggregatesInput = {
    AND?: ArticleScalarWhereWithAggregatesInput | ArticleScalarWhereWithAggregatesInput[]
    OR?: ArticleScalarWhereWithAggregatesInput[]
    NOT?: ArticleScalarWhereWithAggregatesInput | ArticleScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Article"> | number
    title?: StringWithAggregatesFilter<"Article"> | string
    content?: StringWithAggregatesFilter<"Article"> | string
    coverImage?: StringNullableWithAggregatesFilter<"Article"> | string | null
    authorId?: IntWithAggregatesFilter<"Article"> | number
    categoryId?: IntWithAggregatesFilter<"Article"> | number
    views?: IntWithAggregatesFilter<"Article"> | number
    likesCount?: IntWithAggregatesFilter<"Article"> | number
    favCount?: IntWithAggregatesFilter<"Article"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Article"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Article"> | Date | string
  }

  export type ArticleCommentWhereInput = {
    AND?: ArticleCommentWhereInput | ArticleCommentWhereInput[]
    OR?: ArticleCommentWhereInput[]
    NOT?: ArticleCommentWhereInput | ArticleCommentWhereInput[]
    id?: IntFilter<"ArticleComment"> | number
    articleId?: IntFilter<"ArticleComment"> | number
    userId?: IntFilter<"ArticleComment"> | number
    parentId?: IntNullableFilter<"ArticleComment"> | number | null
    content?: StringFilter<"ArticleComment"> | string
    createdAt?: DateTimeFilter<"ArticleComment"> | Date | string
    updatedAt?: DateTimeFilter<"ArticleComment"> | Date | string
    article?: XOR<ArticleScalarRelationFilter, ArticleWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    parent?: XOR<ArticleCommentNullableScalarRelationFilter, ArticleCommentWhereInput> | null
    replies?: ArticleCommentListRelationFilter
  }

  export type ArticleCommentOrderByWithRelationInput = {
    id?: SortOrder
    articleId?: SortOrder
    userId?: SortOrder
    parentId?: SortOrderInput | SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    article?: ArticleOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    parent?: ArticleCommentOrderByWithRelationInput
    replies?: ArticleCommentOrderByRelationAggregateInput
    _relevance?: ArticleCommentOrderByRelevanceInput
  }

  export type ArticleCommentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ArticleCommentWhereInput | ArticleCommentWhereInput[]
    OR?: ArticleCommentWhereInput[]
    NOT?: ArticleCommentWhereInput | ArticleCommentWhereInput[]
    articleId?: IntFilter<"ArticleComment"> | number
    userId?: IntFilter<"ArticleComment"> | number
    parentId?: IntNullableFilter<"ArticleComment"> | number | null
    content?: StringFilter<"ArticleComment"> | string
    createdAt?: DateTimeFilter<"ArticleComment"> | Date | string
    updatedAt?: DateTimeFilter<"ArticleComment"> | Date | string
    article?: XOR<ArticleScalarRelationFilter, ArticleWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    parent?: XOR<ArticleCommentNullableScalarRelationFilter, ArticleCommentWhereInput> | null
    replies?: ArticleCommentListRelationFilter
  }, "id">

  export type ArticleCommentOrderByWithAggregationInput = {
    id?: SortOrder
    articleId?: SortOrder
    userId?: SortOrder
    parentId?: SortOrderInput | SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ArticleCommentCountOrderByAggregateInput
    _avg?: ArticleCommentAvgOrderByAggregateInput
    _max?: ArticleCommentMaxOrderByAggregateInput
    _min?: ArticleCommentMinOrderByAggregateInput
    _sum?: ArticleCommentSumOrderByAggregateInput
  }

  export type ArticleCommentScalarWhereWithAggregatesInput = {
    AND?: ArticleCommentScalarWhereWithAggregatesInput | ArticleCommentScalarWhereWithAggregatesInput[]
    OR?: ArticleCommentScalarWhereWithAggregatesInput[]
    NOT?: ArticleCommentScalarWhereWithAggregatesInput | ArticleCommentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ArticleComment"> | number
    articleId?: IntWithAggregatesFilter<"ArticleComment"> | number
    userId?: IntWithAggregatesFilter<"ArticleComment"> | number
    parentId?: IntNullableWithAggregatesFilter<"ArticleComment"> | number | null
    content?: StringWithAggregatesFilter<"ArticleComment"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ArticleComment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ArticleComment"> | Date | string
  }

  export type ArticleLikeWhereInput = {
    AND?: ArticleLikeWhereInput | ArticleLikeWhereInput[]
    OR?: ArticleLikeWhereInput[]
    NOT?: ArticleLikeWhereInput | ArticleLikeWhereInput[]
    id?: IntFilter<"ArticleLike"> | number
    userId?: IntFilter<"ArticleLike"> | number
    articleId?: IntFilter<"ArticleLike"> | number
    createdAt?: DateTimeFilter<"ArticleLike"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    article?: XOR<ArticleScalarRelationFilter, ArticleWhereInput>
  }

  export type ArticleLikeOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    articleId?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    article?: ArticleOrderByWithRelationInput
  }

  export type ArticleLikeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId_articleId?: ArticleLikeUserIdArticleIdCompoundUniqueInput
    AND?: ArticleLikeWhereInput | ArticleLikeWhereInput[]
    OR?: ArticleLikeWhereInput[]
    NOT?: ArticleLikeWhereInput | ArticleLikeWhereInput[]
    userId?: IntFilter<"ArticleLike"> | number
    articleId?: IntFilter<"ArticleLike"> | number
    createdAt?: DateTimeFilter<"ArticleLike"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    article?: XOR<ArticleScalarRelationFilter, ArticleWhereInput>
  }, "id" | "userId_articleId">

  export type ArticleLikeOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    articleId?: SortOrder
    createdAt?: SortOrder
    _count?: ArticleLikeCountOrderByAggregateInput
    _avg?: ArticleLikeAvgOrderByAggregateInput
    _max?: ArticleLikeMaxOrderByAggregateInput
    _min?: ArticleLikeMinOrderByAggregateInput
    _sum?: ArticleLikeSumOrderByAggregateInput
  }

  export type ArticleLikeScalarWhereWithAggregatesInput = {
    AND?: ArticleLikeScalarWhereWithAggregatesInput | ArticleLikeScalarWhereWithAggregatesInput[]
    OR?: ArticleLikeScalarWhereWithAggregatesInput[]
    NOT?: ArticleLikeScalarWhereWithAggregatesInput | ArticleLikeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ArticleLike"> | number
    userId?: IntWithAggregatesFilter<"ArticleLike"> | number
    articleId?: IntWithAggregatesFilter<"ArticleLike"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ArticleLike"> | Date | string
  }

  export type ArticleFavoriteWhereInput = {
    AND?: ArticleFavoriteWhereInput | ArticleFavoriteWhereInput[]
    OR?: ArticleFavoriteWhereInput[]
    NOT?: ArticleFavoriteWhereInput | ArticleFavoriteWhereInput[]
    id?: IntFilter<"ArticleFavorite"> | number
    userId?: IntFilter<"ArticleFavorite"> | number
    articleId?: IntFilter<"ArticleFavorite"> | number
    createdAt?: DateTimeFilter<"ArticleFavorite"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    article?: XOR<ArticleScalarRelationFilter, ArticleWhereInput>
  }

  export type ArticleFavoriteOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    articleId?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    article?: ArticleOrderByWithRelationInput
  }

  export type ArticleFavoriteWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId_articleId?: ArticleFavoriteUserIdArticleIdCompoundUniqueInput
    AND?: ArticleFavoriteWhereInput | ArticleFavoriteWhereInput[]
    OR?: ArticleFavoriteWhereInput[]
    NOT?: ArticleFavoriteWhereInput | ArticleFavoriteWhereInput[]
    userId?: IntFilter<"ArticleFavorite"> | number
    articleId?: IntFilter<"ArticleFavorite"> | number
    createdAt?: DateTimeFilter<"ArticleFavorite"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    article?: XOR<ArticleScalarRelationFilter, ArticleWhereInput>
  }, "id" | "userId_articleId">

  export type ArticleFavoriteOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    articleId?: SortOrder
    createdAt?: SortOrder
    _count?: ArticleFavoriteCountOrderByAggregateInput
    _avg?: ArticleFavoriteAvgOrderByAggregateInput
    _max?: ArticleFavoriteMaxOrderByAggregateInput
    _min?: ArticleFavoriteMinOrderByAggregateInput
    _sum?: ArticleFavoriteSumOrderByAggregateInput
  }

  export type ArticleFavoriteScalarWhereWithAggregatesInput = {
    AND?: ArticleFavoriteScalarWhereWithAggregatesInput | ArticleFavoriteScalarWhereWithAggregatesInput[]
    OR?: ArticleFavoriteScalarWhereWithAggregatesInput[]
    NOT?: ArticleFavoriteScalarWhereWithAggregatesInput | ArticleFavoriteScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ArticleFavorite"> | number
    userId?: IntWithAggregatesFilter<"ArticleFavorite"> | number
    articleId?: IntWithAggregatesFilter<"ArticleFavorite"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ArticleFavorite"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    username?: StringFilter<"User"> | string
    phone?: StringFilter<"User"> | string
    nickname?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    favs?: IntFilter<"User"> | number
    gender?: StringFilter<"User"> | string
    roles?: StringFilter<"User"> | string
    avatar?: StringFilter<"User"> | string
    status?: StringFilter<"User"> | string
    regmark?: StringFilter<"User"> | string
    location?: StringFilter<"User"> | string
    isVip?: StringFilter<"User"> | string
    count?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    posts?: PostListRelationFilter
    comments?: CommentListRelationFilter
    articles?: ArticleListRelationFilter
    articleComments?: ArticleCommentListRelationFilter
    articleLikes?: ArticleLikeListRelationFilter
    articleFavorites?: ArticleFavoriteListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    phone?: SortOrder
    nickname?: SortOrder
    password?: SortOrder
    email?: SortOrder
    favs?: SortOrder
    gender?: SortOrder
    roles?: SortOrder
    avatar?: SortOrder
    status?: SortOrder
    regmark?: SortOrder
    location?: SortOrder
    isVip?: SortOrder
    count?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    posts?: PostOrderByRelationAggregateInput
    comments?: CommentOrderByRelationAggregateInput
    articles?: ArticleOrderByRelationAggregateInput
    articleComments?: ArticleCommentOrderByRelationAggregateInput
    articleLikes?: ArticleLikeOrderByRelationAggregateInput
    articleFavorites?: ArticleFavoriteOrderByRelationAggregateInput
    _relevance?: UserOrderByRelevanceInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    username?: string
    phone?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    nickname?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    favs?: IntFilter<"User"> | number
    gender?: StringFilter<"User"> | string
    roles?: StringFilter<"User"> | string
    avatar?: StringFilter<"User"> | string
    status?: StringFilter<"User"> | string
    regmark?: StringFilter<"User"> | string
    location?: StringFilter<"User"> | string
    isVip?: StringFilter<"User"> | string
    count?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    posts?: PostListRelationFilter
    comments?: CommentListRelationFilter
    articles?: ArticleListRelationFilter
    articleComments?: ArticleCommentListRelationFilter
    articleLikes?: ArticleLikeListRelationFilter
    articleFavorites?: ArticleFavoriteListRelationFilter
  }, "id" | "username" | "phone">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    phone?: SortOrder
    nickname?: SortOrder
    password?: SortOrder
    email?: SortOrder
    favs?: SortOrder
    gender?: SortOrder
    roles?: SortOrder
    avatar?: SortOrder
    status?: SortOrder
    regmark?: SortOrder
    location?: SortOrder
    isVip?: SortOrder
    count?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    username?: StringWithAggregatesFilter<"User"> | string
    phone?: StringWithAggregatesFilter<"User"> | string
    nickname?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    favs?: IntWithAggregatesFilter<"User"> | number
    gender?: StringWithAggregatesFilter<"User"> | string
    roles?: StringWithAggregatesFilter<"User"> | string
    avatar?: StringWithAggregatesFilter<"User"> | string
    status?: StringWithAggregatesFilter<"User"> | string
    regmark?: StringWithAggregatesFilter<"User"> | string
    location?: StringWithAggregatesFilter<"User"> | string
    isVip?: StringWithAggregatesFilter<"User"> | string
    count?: IntWithAggregatesFilter<"User"> | number
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type CommentWhereInput = {
    AND?: CommentWhereInput | CommentWhereInput[]
    OR?: CommentWhereInput[]
    NOT?: CommentWhereInput | CommentWhereInput[]
    id?: IntFilter<"Comment"> | number
    content?: StringFilter<"Comment"> | string
    postId?: IntFilter<"Comment"> | number
    authorId?: IntFilter<"Comment"> | number
    hands?: IntFilter<"Comment"> | number
    status?: StringFilter<"Comment"> | string
    isRead?: StringFilter<"Comment"> | string
    isBest?: StringFilter<"Comment"> | string
    createdAt?: DateTimeFilter<"Comment"> | Date | string
    updatedAt?: DateTimeFilter<"Comment"> | Date | string
    post?: XOR<PostScalarRelationFilter, PostWhereInput>
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type CommentOrderByWithRelationInput = {
    id?: SortOrder
    content?: SortOrder
    postId?: SortOrder
    authorId?: SortOrder
    hands?: SortOrder
    status?: SortOrder
    isRead?: SortOrder
    isBest?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    post?: PostOrderByWithRelationInput
    author?: UserOrderByWithRelationInput
    _relevance?: CommentOrderByRelevanceInput
  }

  export type CommentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CommentWhereInput | CommentWhereInput[]
    OR?: CommentWhereInput[]
    NOT?: CommentWhereInput | CommentWhereInput[]
    content?: StringFilter<"Comment"> | string
    postId?: IntFilter<"Comment"> | number
    authorId?: IntFilter<"Comment"> | number
    hands?: IntFilter<"Comment"> | number
    status?: StringFilter<"Comment"> | string
    isRead?: StringFilter<"Comment"> | string
    isBest?: StringFilter<"Comment"> | string
    createdAt?: DateTimeFilter<"Comment"> | Date | string
    updatedAt?: DateTimeFilter<"Comment"> | Date | string
    post?: XOR<PostScalarRelationFilter, PostWhereInput>
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type CommentOrderByWithAggregationInput = {
    id?: SortOrder
    content?: SortOrder
    postId?: SortOrder
    authorId?: SortOrder
    hands?: SortOrder
    status?: SortOrder
    isRead?: SortOrder
    isBest?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CommentCountOrderByAggregateInput
    _avg?: CommentAvgOrderByAggregateInput
    _max?: CommentMaxOrderByAggregateInput
    _min?: CommentMinOrderByAggregateInput
    _sum?: CommentSumOrderByAggregateInput
  }

  export type CommentScalarWhereWithAggregatesInput = {
    AND?: CommentScalarWhereWithAggregatesInput | CommentScalarWhereWithAggregatesInput[]
    OR?: CommentScalarWhereWithAggregatesInput[]
    NOT?: CommentScalarWhereWithAggregatesInput | CommentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Comment"> | number
    content?: StringWithAggregatesFilter<"Comment"> | string
    postId?: IntWithAggregatesFilter<"Comment"> | number
    authorId?: IntWithAggregatesFilter<"Comment"> | number
    hands?: IntWithAggregatesFilter<"Comment"> | number
    status?: StringWithAggregatesFilter<"Comment"> | string
    isRead?: StringWithAggregatesFilter<"Comment"> | string
    isBest?: StringWithAggregatesFilter<"Comment"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Comment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Comment"> | Date | string
  }

  export type PostWhereInput = {
    AND?: PostWhereInput | PostWhereInput[]
    OR?: PostWhereInput[]
    NOT?: PostWhereInput | PostWhereInput[]
    id?: IntFilter<"Post"> | number
    title?: StringFilter<"Post"> | string
    content?: StringFilter<"Post"> | string
    published?: BoolFilter<"Post"> | boolean
    viewCount?: IntFilter<"Post"> | number
    createdAt?: DateTimeFilter<"Post"> | Date | string
    updatedAt?: DateTimeFilter<"Post"> | Date | string
    authorId?: IntFilter<"Post"> | number
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    comments?: CommentListRelationFilter
    categories?: CategoryListRelationFilter
  }

  export type PostOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    published?: SortOrder
    viewCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    authorId?: SortOrder
    author?: UserOrderByWithRelationInput
    comments?: CommentOrderByRelationAggregateInput
    categories?: CategoryOrderByRelationAggregateInput
    _relevance?: PostOrderByRelevanceInput
  }

  export type PostWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PostWhereInput | PostWhereInput[]
    OR?: PostWhereInput[]
    NOT?: PostWhereInput | PostWhereInput[]
    title?: StringFilter<"Post"> | string
    content?: StringFilter<"Post"> | string
    published?: BoolFilter<"Post"> | boolean
    viewCount?: IntFilter<"Post"> | number
    createdAt?: DateTimeFilter<"Post"> | Date | string
    updatedAt?: DateTimeFilter<"Post"> | Date | string
    authorId?: IntFilter<"Post"> | number
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    comments?: CommentListRelationFilter
    categories?: CategoryListRelationFilter
  }, "id">

  export type PostOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    published?: SortOrder
    viewCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    authorId?: SortOrder
    _count?: PostCountOrderByAggregateInput
    _avg?: PostAvgOrderByAggregateInput
    _max?: PostMaxOrderByAggregateInput
    _min?: PostMinOrderByAggregateInput
    _sum?: PostSumOrderByAggregateInput
  }

  export type PostScalarWhereWithAggregatesInput = {
    AND?: PostScalarWhereWithAggregatesInput | PostScalarWhereWithAggregatesInput[]
    OR?: PostScalarWhereWithAggregatesInput[]
    NOT?: PostScalarWhereWithAggregatesInput | PostScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Post"> | number
    title?: StringWithAggregatesFilter<"Post"> | string
    content?: StringWithAggregatesFilter<"Post"> | string
    published?: BoolWithAggregatesFilter<"Post"> | boolean
    viewCount?: IntWithAggregatesFilter<"Post"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Post"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Post"> | Date | string
    authorId?: IntWithAggregatesFilter<"Post"> | number
  }

  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    id?: IntFilter<"Category"> | number
    name?: StringFilter<"Category"> | string
    sort?: IntFilter<"Category"> | number
    posts?: PostListRelationFilter
  }

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    sort?: SortOrder
    posts?: PostOrderByRelationAggregateInput
    _relevance?: CategoryOrderByRelevanceInput
  }

  export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    sort?: IntFilter<"Category"> | number
    posts?: PostListRelationFilter
  }, "id" | "name">

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    sort?: SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _avg?: CategoryAvgOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
    _sum?: CategorySumOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    OR?: CategoryScalarWhereWithAggregatesInput[]
    NOT?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Category"> | number
    name?: StringWithAggregatesFilter<"Category"> | string
    sort?: IntWithAggregatesFilter<"Category"> | number
  }

  export type ArticleCategoryCreateInput = {
    name: string
    sort?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    articles?: ArticleCreateNestedManyWithoutCategoryInput
  }

  export type ArticleCategoryUncheckedCreateInput = {
    id?: number
    name: string
    sort?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    articles?: ArticleUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type ArticleCategoryUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    sort?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    articles?: ArticleUpdateManyWithoutCategoryNestedInput
  }

  export type ArticleCategoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    sort?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    articles?: ArticleUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type ArticleCategoryCreateManyInput = {
    id?: number
    name: string
    sort?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArticleCategoryUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    sort?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleCategoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    sort?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleCreateInput = {
    title: string
    content: string
    coverImage?: string | null
    views?: number
    likesCount?: number
    favCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    category: ArticleCategoryCreateNestedOneWithoutArticlesInput
    author: UserCreateNestedOneWithoutArticlesInput
    comments?: ArticleCommentCreateNestedManyWithoutArticleInput
    likes?: ArticleLikeCreateNestedManyWithoutArticleInput
    favorites?: ArticleFavoriteCreateNestedManyWithoutArticleInput
  }

  export type ArticleUncheckedCreateInput = {
    id?: number
    title: string
    content: string
    coverImage?: string | null
    authorId: number
    categoryId: number
    views?: number
    likesCount?: number
    favCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    comments?: ArticleCommentUncheckedCreateNestedManyWithoutArticleInput
    likes?: ArticleLikeUncheckedCreateNestedManyWithoutArticleInput
    favorites?: ArticleFavoriteUncheckedCreateNestedManyWithoutArticleInput
  }

  export type ArticleUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    views?: IntFieldUpdateOperationsInput | number
    likesCount?: IntFieldUpdateOperationsInput | number
    favCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: ArticleCategoryUpdateOneRequiredWithoutArticlesNestedInput
    author?: UserUpdateOneRequiredWithoutArticlesNestedInput
    comments?: ArticleCommentUpdateManyWithoutArticleNestedInput
    likes?: ArticleLikeUpdateManyWithoutArticleNestedInput
    favorites?: ArticleFavoriteUpdateManyWithoutArticleNestedInput
  }

  export type ArticleUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    authorId?: IntFieldUpdateOperationsInput | number
    categoryId?: IntFieldUpdateOperationsInput | number
    views?: IntFieldUpdateOperationsInput | number
    likesCount?: IntFieldUpdateOperationsInput | number
    favCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: ArticleCommentUncheckedUpdateManyWithoutArticleNestedInput
    likes?: ArticleLikeUncheckedUpdateManyWithoutArticleNestedInput
    favorites?: ArticleFavoriteUncheckedUpdateManyWithoutArticleNestedInput
  }

  export type ArticleCreateManyInput = {
    id?: number
    title: string
    content: string
    coverImage?: string | null
    authorId: number
    categoryId: number
    views?: number
    likesCount?: number
    favCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArticleUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    views?: IntFieldUpdateOperationsInput | number
    likesCount?: IntFieldUpdateOperationsInput | number
    favCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    authorId?: IntFieldUpdateOperationsInput | number
    categoryId?: IntFieldUpdateOperationsInput | number
    views?: IntFieldUpdateOperationsInput | number
    likesCount?: IntFieldUpdateOperationsInput | number
    favCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleCommentCreateInput = {
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    article: ArticleCreateNestedOneWithoutCommentsInput
    user: UserCreateNestedOneWithoutArticleCommentsInput
    parent?: ArticleCommentCreateNestedOneWithoutRepliesInput
    replies?: ArticleCommentCreateNestedManyWithoutParentInput
  }

  export type ArticleCommentUncheckedCreateInput = {
    id?: number
    articleId: number
    userId: number
    parentId?: number | null
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    replies?: ArticleCommentUncheckedCreateNestedManyWithoutParentInput
  }

  export type ArticleCommentUpdateInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    article?: ArticleUpdateOneRequiredWithoutCommentsNestedInput
    user?: UserUpdateOneRequiredWithoutArticleCommentsNestedInput
    parent?: ArticleCommentUpdateOneWithoutRepliesNestedInput
    replies?: ArticleCommentUpdateManyWithoutParentNestedInput
  }

  export type ArticleCommentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    articleId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    replies?: ArticleCommentUncheckedUpdateManyWithoutParentNestedInput
  }

  export type ArticleCommentCreateManyInput = {
    id?: number
    articleId: number
    userId: number
    parentId?: number | null
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArticleCommentUpdateManyMutationInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleCommentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    articleId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleLikeCreateInput = {
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutArticleLikesInput
    article: ArticleCreateNestedOneWithoutLikesInput
  }

  export type ArticleLikeUncheckedCreateInput = {
    id?: number
    userId: number
    articleId: number
    createdAt?: Date | string
  }

  export type ArticleLikeUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutArticleLikesNestedInput
    article?: ArticleUpdateOneRequiredWithoutLikesNestedInput
  }

  export type ArticleLikeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    articleId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleLikeCreateManyInput = {
    id?: number
    userId: number
    articleId: number
    createdAt?: Date | string
  }

  export type ArticleLikeUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleLikeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    articleId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleFavoriteCreateInput = {
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutArticleFavoritesInput
    article: ArticleCreateNestedOneWithoutFavoritesInput
  }

  export type ArticleFavoriteUncheckedCreateInput = {
    id?: number
    userId: number
    articleId: number
    createdAt?: Date | string
  }

  export type ArticleFavoriteUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutArticleFavoritesNestedInput
    article?: ArticleUpdateOneRequiredWithoutFavoritesNestedInput
  }

  export type ArticleFavoriteUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    articleId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleFavoriteCreateManyInput = {
    id?: number
    userId: number
    articleId: number
    createdAt?: Date | string
  }

  export type ArticleFavoriteUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleFavoriteUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    articleId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    username: string
    phone: string
    nickname?: string
    password: string
    email?: string
    favs?: number
    gender?: string
    roles?: string
    avatar?: string
    status?: string
    regmark?: string
    location?: string
    isVip?: string
    count?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    posts?: PostCreateNestedManyWithoutAuthorInput
    comments?: CommentCreateNestedManyWithoutAuthorInput
    articles?: ArticleCreateNestedManyWithoutAuthorInput
    articleComments?: ArticleCommentCreateNestedManyWithoutUserInput
    articleLikes?: ArticleLikeCreateNestedManyWithoutUserInput
    articleFavorites?: ArticleFavoriteCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    username: string
    phone: string
    nickname?: string
    password: string
    email?: string
    favs?: number
    gender?: string
    roles?: string
    avatar?: string
    status?: string
    regmark?: string
    location?: string
    isVip?: string
    count?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    posts?: PostUncheckedCreateNestedManyWithoutAuthorInput
    comments?: CommentUncheckedCreateNestedManyWithoutAuthorInput
    articles?: ArticleUncheckedCreateNestedManyWithoutAuthorInput
    articleComments?: ArticleCommentUncheckedCreateNestedManyWithoutUserInput
    articleLikes?: ArticleLikeUncheckedCreateNestedManyWithoutUserInput
    articleFavorites?: ArticleFavoriteUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    favs?: IntFieldUpdateOperationsInput | number
    gender?: StringFieldUpdateOperationsInput | string
    roles?: StringFieldUpdateOperationsInput | string
    avatar?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    regmark?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    isVip?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    posts?: PostUpdateManyWithoutAuthorNestedInput
    comments?: CommentUpdateManyWithoutAuthorNestedInput
    articles?: ArticleUpdateManyWithoutAuthorNestedInput
    articleComments?: ArticleCommentUpdateManyWithoutUserNestedInput
    articleLikes?: ArticleLikeUpdateManyWithoutUserNestedInput
    articleFavorites?: ArticleFavoriteUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    favs?: IntFieldUpdateOperationsInput | number
    gender?: StringFieldUpdateOperationsInput | string
    roles?: StringFieldUpdateOperationsInput | string
    avatar?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    regmark?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    isVip?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    posts?: PostUncheckedUpdateManyWithoutAuthorNestedInput
    comments?: CommentUncheckedUpdateManyWithoutAuthorNestedInput
    articles?: ArticleUncheckedUpdateManyWithoutAuthorNestedInput
    articleComments?: ArticleCommentUncheckedUpdateManyWithoutUserNestedInput
    articleLikes?: ArticleLikeUncheckedUpdateManyWithoutUserNestedInput
    articleFavorites?: ArticleFavoriteUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    username: string
    phone: string
    nickname?: string
    password: string
    email?: string
    favs?: number
    gender?: string
    roles?: string
    avatar?: string
    status?: string
    regmark?: string
    location?: string
    isVip?: string
    count?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    favs?: IntFieldUpdateOperationsInput | number
    gender?: StringFieldUpdateOperationsInput | string
    roles?: StringFieldUpdateOperationsInput | string
    avatar?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    regmark?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    isVip?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    favs?: IntFieldUpdateOperationsInput | number
    gender?: StringFieldUpdateOperationsInput | string
    roles?: StringFieldUpdateOperationsInput | string
    avatar?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    regmark?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    isVip?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentCreateInput = {
    content: string
    hands?: number
    status?: string
    isRead?: string
    isBest?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    post: PostCreateNestedOneWithoutCommentsInput
    author: UserCreateNestedOneWithoutCommentsInput
  }

  export type CommentUncheckedCreateInput = {
    id?: number
    content: string
    postId: number
    authorId: number
    hands?: number
    status?: string
    isRead?: string
    isBest?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CommentUpdateInput = {
    content?: StringFieldUpdateOperationsInput | string
    hands?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    isRead?: StringFieldUpdateOperationsInput | string
    isBest?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: PostUpdateOneRequiredWithoutCommentsNestedInput
    author?: UserUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type CommentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    postId?: IntFieldUpdateOperationsInput | number
    authorId?: IntFieldUpdateOperationsInput | number
    hands?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    isRead?: StringFieldUpdateOperationsInput | string
    isBest?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentCreateManyInput = {
    id?: number
    content: string
    postId: number
    authorId: number
    hands?: number
    status?: string
    isRead?: string
    isBest?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CommentUpdateManyMutationInput = {
    content?: StringFieldUpdateOperationsInput | string
    hands?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    isRead?: StringFieldUpdateOperationsInput | string
    isBest?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    postId?: IntFieldUpdateOperationsInput | number
    authorId?: IntFieldUpdateOperationsInput | number
    hands?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    isRead?: StringFieldUpdateOperationsInput | string
    isBest?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostCreateInput = {
    title: string
    content: string
    published?: boolean
    viewCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    author: UserCreateNestedOneWithoutPostsInput
    comments?: CommentCreateNestedManyWithoutPostInput
    categories?: CategoryCreateNestedManyWithoutPostsInput
  }

  export type PostUncheckedCreateInput = {
    id?: number
    title: string
    content: string
    published?: boolean
    viewCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    authorId: number
    comments?: CommentUncheckedCreateNestedManyWithoutPostInput
    categories?: CategoryUncheckedCreateNestedManyWithoutPostsInput
  }

  export type PostUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    viewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneRequiredWithoutPostsNestedInput
    comments?: CommentUpdateManyWithoutPostNestedInput
    categories?: CategoryUpdateManyWithoutPostsNestedInput
  }

  export type PostUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    viewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorId?: IntFieldUpdateOperationsInput | number
    comments?: CommentUncheckedUpdateManyWithoutPostNestedInput
    categories?: CategoryUncheckedUpdateManyWithoutPostsNestedInput
  }

  export type PostCreateManyInput = {
    id?: number
    title: string
    content: string
    published?: boolean
    viewCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    authorId: number
  }

  export type PostUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    viewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    viewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorId?: IntFieldUpdateOperationsInput | number
  }

  export type CategoryCreateInput = {
    name: string
    sort?: number
    posts?: PostCreateNestedManyWithoutCategoriesInput
  }

  export type CategoryUncheckedCreateInput = {
    id?: number
    name: string
    sort?: number
    posts?: PostUncheckedCreateNestedManyWithoutCategoriesInput
  }

  export type CategoryUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    sort?: IntFieldUpdateOperationsInput | number
    posts?: PostUpdateManyWithoutCategoriesNestedInput
  }

  export type CategoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    sort?: IntFieldUpdateOperationsInput | number
    posts?: PostUncheckedUpdateManyWithoutCategoriesNestedInput
  }

  export type CategoryCreateManyInput = {
    id?: number
    name: string
    sort?: number
  }

  export type CategoryUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    sort?: IntFieldUpdateOperationsInput | number
  }

  export type CategoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    sort?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ArticleListRelationFilter = {
    every?: ArticleWhereInput
    some?: ArticleWhereInput
    none?: ArticleWhereInput
  }

  export type ArticleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ArticleCategoryOrderByRelevanceInput = {
    fields: ArticleCategoryOrderByRelevanceFieldEnum | ArticleCategoryOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ArticleCategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    sort?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ArticleCategoryAvgOrderByAggregateInput = {
    id?: SortOrder
    sort?: SortOrder
  }

  export type ArticleCategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    sort?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ArticleCategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    sort?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ArticleCategorySumOrderByAggregateInput = {
    id?: SortOrder
    sort?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type ArticleCategoryScalarRelationFilter = {
    is?: ArticleCategoryWhereInput
    isNot?: ArticleCategoryWhereInput
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ArticleCommentListRelationFilter = {
    every?: ArticleCommentWhereInput
    some?: ArticleCommentWhereInput
    none?: ArticleCommentWhereInput
  }

  export type ArticleLikeListRelationFilter = {
    every?: ArticleLikeWhereInput
    some?: ArticleLikeWhereInput
    none?: ArticleLikeWhereInput
  }

  export type ArticleFavoriteListRelationFilter = {
    every?: ArticleFavoriteWhereInput
    some?: ArticleFavoriteWhereInput
    none?: ArticleFavoriteWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ArticleCommentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ArticleLikeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ArticleFavoriteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ArticleOrderByRelevanceInput = {
    fields: ArticleOrderByRelevanceFieldEnum | ArticleOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ArticleCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    coverImage?: SortOrder
    authorId?: SortOrder
    categoryId?: SortOrder
    views?: SortOrder
    likesCount?: SortOrder
    favCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ArticleAvgOrderByAggregateInput = {
    id?: SortOrder
    authorId?: SortOrder
    categoryId?: SortOrder
    views?: SortOrder
    likesCount?: SortOrder
    favCount?: SortOrder
  }

  export type ArticleMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    coverImage?: SortOrder
    authorId?: SortOrder
    categoryId?: SortOrder
    views?: SortOrder
    likesCount?: SortOrder
    favCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ArticleMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    coverImage?: SortOrder
    authorId?: SortOrder
    categoryId?: SortOrder
    views?: SortOrder
    likesCount?: SortOrder
    favCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ArticleSumOrderByAggregateInput = {
    id?: SortOrder
    authorId?: SortOrder
    categoryId?: SortOrder
    views?: SortOrder
    likesCount?: SortOrder
    favCount?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type ArticleScalarRelationFilter = {
    is?: ArticleWhereInput
    isNot?: ArticleWhereInput
  }

  export type ArticleCommentNullableScalarRelationFilter = {
    is?: ArticleCommentWhereInput | null
    isNot?: ArticleCommentWhereInput | null
  }

  export type ArticleCommentOrderByRelevanceInput = {
    fields: ArticleCommentOrderByRelevanceFieldEnum | ArticleCommentOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ArticleCommentCountOrderByAggregateInput = {
    id?: SortOrder
    articleId?: SortOrder
    userId?: SortOrder
    parentId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ArticleCommentAvgOrderByAggregateInput = {
    id?: SortOrder
    articleId?: SortOrder
    userId?: SortOrder
    parentId?: SortOrder
  }

  export type ArticleCommentMaxOrderByAggregateInput = {
    id?: SortOrder
    articleId?: SortOrder
    userId?: SortOrder
    parentId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ArticleCommentMinOrderByAggregateInput = {
    id?: SortOrder
    articleId?: SortOrder
    userId?: SortOrder
    parentId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ArticleCommentSumOrderByAggregateInput = {
    id?: SortOrder
    articleId?: SortOrder
    userId?: SortOrder
    parentId?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type ArticleLikeUserIdArticleIdCompoundUniqueInput = {
    userId: number
    articleId: number
  }

  export type ArticleLikeCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    articleId?: SortOrder
    createdAt?: SortOrder
  }

  export type ArticleLikeAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    articleId?: SortOrder
  }

  export type ArticleLikeMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    articleId?: SortOrder
    createdAt?: SortOrder
  }

  export type ArticleLikeMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    articleId?: SortOrder
    createdAt?: SortOrder
  }

  export type ArticleLikeSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    articleId?: SortOrder
  }

  export type ArticleFavoriteUserIdArticleIdCompoundUniqueInput = {
    userId: number
    articleId: number
  }

  export type ArticleFavoriteCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    articleId?: SortOrder
    createdAt?: SortOrder
  }

  export type ArticleFavoriteAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    articleId?: SortOrder
  }

  export type ArticleFavoriteMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    articleId?: SortOrder
    createdAt?: SortOrder
  }

  export type ArticleFavoriteMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    articleId?: SortOrder
    createdAt?: SortOrder
  }

  export type ArticleFavoriteSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    articleId?: SortOrder
  }

  export type PostListRelationFilter = {
    every?: PostWhereInput
    some?: PostWhereInput
    none?: PostWhereInput
  }

  export type CommentListRelationFilter = {
    every?: CommentWhereInput
    some?: CommentWhereInput
    none?: CommentWhereInput
  }

  export type PostOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CommentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelevanceInput = {
    fields: UserOrderByRelevanceFieldEnum | UserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    phone?: SortOrder
    nickname?: SortOrder
    password?: SortOrder
    email?: SortOrder
    favs?: SortOrder
    gender?: SortOrder
    roles?: SortOrder
    avatar?: SortOrder
    status?: SortOrder
    regmark?: SortOrder
    location?: SortOrder
    isVip?: SortOrder
    count?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
    favs?: SortOrder
    count?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    phone?: SortOrder
    nickname?: SortOrder
    password?: SortOrder
    email?: SortOrder
    favs?: SortOrder
    gender?: SortOrder
    roles?: SortOrder
    avatar?: SortOrder
    status?: SortOrder
    regmark?: SortOrder
    location?: SortOrder
    isVip?: SortOrder
    count?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    phone?: SortOrder
    nickname?: SortOrder
    password?: SortOrder
    email?: SortOrder
    favs?: SortOrder
    gender?: SortOrder
    roles?: SortOrder
    avatar?: SortOrder
    status?: SortOrder
    regmark?: SortOrder
    location?: SortOrder
    isVip?: SortOrder
    count?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
    favs?: SortOrder
    count?: SortOrder
  }

  export type PostScalarRelationFilter = {
    is?: PostWhereInput
    isNot?: PostWhereInput
  }

  export type CommentOrderByRelevanceInput = {
    fields: CommentOrderByRelevanceFieldEnum | CommentOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type CommentCountOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    postId?: SortOrder
    authorId?: SortOrder
    hands?: SortOrder
    status?: SortOrder
    isRead?: SortOrder
    isBest?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CommentAvgOrderByAggregateInput = {
    id?: SortOrder
    postId?: SortOrder
    authorId?: SortOrder
    hands?: SortOrder
  }

  export type CommentMaxOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    postId?: SortOrder
    authorId?: SortOrder
    hands?: SortOrder
    status?: SortOrder
    isRead?: SortOrder
    isBest?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CommentMinOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    postId?: SortOrder
    authorId?: SortOrder
    hands?: SortOrder
    status?: SortOrder
    isRead?: SortOrder
    isBest?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CommentSumOrderByAggregateInput = {
    id?: SortOrder
    postId?: SortOrder
    authorId?: SortOrder
    hands?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type CategoryListRelationFilter = {
    every?: CategoryWhereInput
    some?: CategoryWhereInput
    none?: CategoryWhereInput
  }

  export type CategoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PostOrderByRelevanceInput = {
    fields: PostOrderByRelevanceFieldEnum | PostOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PostCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    published?: SortOrder
    viewCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    authorId?: SortOrder
  }

  export type PostAvgOrderByAggregateInput = {
    id?: SortOrder
    viewCount?: SortOrder
    authorId?: SortOrder
  }

  export type PostMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    published?: SortOrder
    viewCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    authorId?: SortOrder
  }

  export type PostMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    published?: SortOrder
    viewCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    authorId?: SortOrder
  }

  export type PostSumOrderByAggregateInput = {
    id?: SortOrder
    viewCount?: SortOrder
    authorId?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type CategoryOrderByRelevanceInput = {
    fields: CategoryOrderByRelevanceFieldEnum | CategoryOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    sort?: SortOrder
  }

  export type CategoryAvgOrderByAggregateInput = {
    id?: SortOrder
    sort?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    sort?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    sort?: SortOrder
  }

  export type CategorySumOrderByAggregateInput = {
    id?: SortOrder
    sort?: SortOrder
  }

  export type ArticleCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ArticleCreateWithoutCategoryInput, ArticleUncheckedCreateWithoutCategoryInput> | ArticleCreateWithoutCategoryInput[] | ArticleUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ArticleCreateOrConnectWithoutCategoryInput | ArticleCreateOrConnectWithoutCategoryInput[]
    createMany?: ArticleCreateManyCategoryInputEnvelope
    connect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
  }

  export type ArticleUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ArticleCreateWithoutCategoryInput, ArticleUncheckedCreateWithoutCategoryInput> | ArticleCreateWithoutCategoryInput[] | ArticleUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ArticleCreateOrConnectWithoutCategoryInput | ArticleCreateOrConnectWithoutCategoryInput[]
    createMany?: ArticleCreateManyCategoryInputEnvelope
    connect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ArticleUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ArticleCreateWithoutCategoryInput, ArticleUncheckedCreateWithoutCategoryInput> | ArticleCreateWithoutCategoryInput[] | ArticleUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ArticleCreateOrConnectWithoutCategoryInput | ArticleCreateOrConnectWithoutCategoryInput[]
    upsert?: ArticleUpsertWithWhereUniqueWithoutCategoryInput | ArticleUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ArticleCreateManyCategoryInputEnvelope
    set?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    disconnect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    delete?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    connect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    update?: ArticleUpdateWithWhereUniqueWithoutCategoryInput | ArticleUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ArticleUpdateManyWithWhereWithoutCategoryInput | ArticleUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ArticleScalarWhereInput | ArticleScalarWhereInput[]
  }

  export type ArticleUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ArticleCreateWithoutCategoryInput, ArticleUncheckedCreateWithoutCategoryInput> | ArticleCreateWithoutCategoryInput[] | ArticleUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ArticleCreateOrConnectWithoutCategoryInput | ArticleCreateOrConnectWithoutCategoryInput[]
    upsert?: ArticleUpsertWithWhereUniqueWithoutCategoryInput | ArticleUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ArticleCreateManyCategoryInputEnvelope
    set?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    disconnect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    delete?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    connect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    update?: ArticleUpdateWithWhereUniqueWithoutCategoryInput | ArticleUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ArticleUpdateManyWithWhereWithoutCategoryInput | ArticleUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ArticleScalarWhereInput | ArticleScalarWhereInput[]
  }

  export type ArticleCategoryCreateNestedOneWithoutArticlesInput = {
    create?: XOR<ArticleCategoryCreateWithoutArticlesInput, ArticleCategoryUncheckedCreateWithoutArticlesInput>
    connectOrCreate?: ArticleCategoryCreateOrConnectWithoutArticlesInput
    connect?: ArticleCategoryWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutArticlesInput = {
    create?: XOR<UserCreateWithoutArticlesInput, UserUncheckedCreateWithoutArticlesInput>
    connectOrCreate?: UserCreateOrConnectWithoutArticlesInput
    connect?: UserWhereUniqueInput
  }

  export type ArticleCommentCreateNestedManyWithoutArticleInput = {
    create?: XOR<ArticleCommentCreateWithoutArticleInput, ArticleCommentUncheckedCreateWithoutArticleInput> | ArticleCommentCreateWithoutArticleInput[] | ArticleCommentUncheckedCreateWithoutArticleInput[]
    connectOrCreate?: ArticleCommentCreateOrConnectWithoutArticleInput | ArticleCommentCreateOrConnectWithoutArticleInput[]
    createMany?: ArticleCommentCreateManyArticleInputEnvelope
    connect?: ArticleCommentWhereUniqueInput | ArticleCommentWhereUniqueInput[]
  }

  export type ArticleLikeCreateNestedManyWithoutArticleInput = {
    create?: XOR<ArticleLikeCreateWithoutArticleInput, ArticleLikeUncheckedCreateWithoutArticleInput> | ArticleLikeCreateWithoutArticleInput[] | ArticleLikeUncheckedCreateWithoutArticleInput[]
    connectOrCreate?: ArticleLikeCreateOrConnectWithoutArticleInput | ArticleLikeCreateOrConnectWithoutArticleInput[]
    createMany?: ArticleLikeCreateManyArticleInputEnvelope
    connect?: ArticleLikeWhereUniqueInput | ArticleLikeWhereUniqueInput[]
  }

  export type ArticleFavoriteCreateNestedManyWithoutArticleInput = {
    create?: XOR<ArticleFavoriteCreateWithoutArticleInput, ArticleFavoriteUncheckedCreateWithoutArticleInput> | ArticleFavoriteCreateWithoutArticleInput[] | ArticleFavoriteUncheckedCreateWithoutArticleInput[]
    connectOrCreate?: ArticleFavoriteCreateOrConnectWithoutArticleInput | ArticleFavoriteCreateOrConnectWithoutArticleInput[]
    createMany?: ArticleFavoriteCreateManyArticleInputEnvelope
    connect?: ArticleFavoriteWhereUniqueInput | ArticleFavoriteWhereUniqueInput[]
  }

  export type ArticleCommentUncheckedCreateNestedManyWithoutArticleInput = {
    create?: XOR<ArticleCommentCreateWithoutArticleInput, ArticleCommentUncheckedCreateWithoutArticleInput> | ArticleCommentCreateWithoutArticleInput[] | ArticleCommentUncheckedCreateWithoutArticleInput[]
    connectOrCreate?: ArticleCommentCreateOrConnectWithoutArticleInput | ArticleCommentCreateOrConnectWithoutArticleInput[]
    createMany?: ArticleCommentCreateManyArticleInputEnvelope
    connect?: ArticleCommentWhereUniqueInput | ArticleCommentWhereUniqueInput[]
  }

  export type ArticleLikeUncheckedCreateNestedManyWithoutArticleInput = {
    create?: XOR<ArticleLikeCreateWithoutArticleInput, ArticleLikeUncheckedCreateWithoutArticleInput> | ArticleLikeCreateWithoutArticleInput[] | ArticleLikeUncheckedCreateWithoutArticleInput[]
    connectOrCreate?: ArticleLikeCreateOrConnectWithoutArticleInput | ArticleLikeCreateOrConnectWithoutArticleInput[]
    createMany?: ArticleLikeCreateManyArticleInputEnvelope
    connect?: ArticleLikeWhereUniqueInput | ArticleLikeWhereUniqueInput[]
  }

  export type ArticleFavoriteUncheckedCreateNestedManyWithoutArticleInput = {
    create?: XOR<ArticleFavoriteCreateWithoutArticleInput, ArticleFavoriteUncheckedCreateWithoutArticleInput> | ArticleFavoriteCreateWithoutArticleInput[] | ArticleFavoriteUncheckedCreateWithoutArticleInput[]
    connectOrCreate?: ArticleFavoriteCreateOrConnectWithoutArticleInput | ArticleFavoriteCreateOrConnectWithoutArticleInput[]
    createMany?: ArticleFavoriteCreateManyArticleInputEnvelope
    connect?: ArticleFavoriteWhereUniqueInput | ArticleFavoriteWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type ArticleCategoryUpdateOneRequiredWithoutArticlesNestedInput = {
    create?: XOR<ArticleCategoryCreateWithoutArticlesInput, ArticleCategoryUncheckedCreateWithoutArticlesInput>
    connectOrCreate?: ArticleCategoryCreateOrConnectWithoutArticlesInput
    upsert?: ArticleCategoryUpsertWithoutArticlesInput
    connect?: ArticleCategoryWhereUniqueInput
    update?: XOR<XOR<ArticleCategoryUpdateToOneWithWhereWithoutArticlesInput, ArticleCategoryUpdateWithoutArticlesInput>, ArticleCategoryUncheckedUpdateWithoutArticlesInput>
  }

  export type UserUpdateOneRequiredWithoutArticlesNestedInput = {
    create?: XOR<UserCreateWithoutArticlesInput, UserUncheckedCreateWithoutArticlesInput>
    connectOrCreate?: UserCreateOrConnectWithoutArticlesInput
    upsert?: UserUpsertWithoutArticlesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutArticlesInput, UserUpdateWithoutArticlesInput>, UserUncheckedUpdateWithoutArticlesInput>
  }

  export type ArticleCommentUpdateManyWithoutArticleNestedInput = {
    create?: XOR<ArticleCommentCreateWithoutArticleInput, ArticleCommentUncheckedCreateWithoutArticleInput> | ArticleCommentCreateWithoutArticleInput[] | ArticleCommentUncheckedCreateWithoutArticleInput[]
    connectOrCreate?: ArticleCommentCreateOrConnectWithoutArticleInput | ArticleCommentCreateOrConnectWithoutArticleInput[]
    upsert?: ArticleCommentUpsertWithWhereUniqueWithoutArticleInput | ArticleCommentUpsertWithWhereUniqueWithoutArticleInput[]
    createMany?: ArticleCommentCreateManyArticleInputEnvelope
    set?: ArticleCommentWhereUniqueInput | ArticleCommentWhereUniqueInput[]
    disconnect?: ArticleCommentWhereUniqueInput | ArticleCommentWhereUniqueInput[]
    delete?: ArticleCommentWhereUniqueInput | ArticleCommentWhereUniqueInput[]
    connect?: ArticleCommentWhereUniqueInput | ArticleCommentWhereUniqueInput[]
    update?: ArticleCommentUpdateWithWhereUniqueWithoutArticleInput | ArticleCommentUpdateWithWhereUniqueWithoutArticleInput[]
    updateMany?: ArticleCommentUpdateManyWithWhereWithoutArticleInput | ArticleCommentUpdateManyWithWhereWithoutArticleInput[]
    deleteMany?: ArticleCommentScalarWhereInput | ArticleCommentScalarWhereInput[]
  }

  export type ArticleLikeUpdateManyWithoutArticleNestedInput = {
    create?: XOR<ArticleLikeCreateWithoutArticleInput, ArticleLikeUncheckedCreateWithoutArticleInput> | ArticleLikeCreateWithoutArticleInput[] | ArticleLikeUncheckedCreateWithoutArticleInput[]
    connectOrCreate?: ArticleLikeCreateOrConnectWithoutArticleInput | ArticleLikeCreateOrConnectWithoutArticleInput[]
    upsert?: ArticleLikeUpsertWithWhereUniqueWithoutArticleInput | ArticleLikeUpsertWithWhereUniqueWithoutArticleInput[]
    createMany?: ArticleLikeCreateManyArticleInputEnvelope
    set?: ArticleLikeWhereUniqueInput | ArticleLikeWhereUniqueInput[]
    disconnect?: ArticleLikeWhereUniqueInput | ArticleLikeWhereUniqueInput[]
    delete?: ArticleLikeWhereUniqueInput | ArticleLikeWhereUniqueInput[]
    connect?: ArticleLikeWhereUniqueInput | ArticleLikeWhereUniqueInput[]
    update?: ArticleLikeUpdateWithWhereUniqueWithoutArticleInput | ArticleLikeUpdateWithWhereUniqueWithoutArticleInput[]
    updateMany?: ArticleLikeUpdateManyWithWhereWithoutArticleInput | ArticleLikeUpdateManyWithWhereWithoutArticleInput[]
    deleteMany?: ArticleLikeScalarWhereInput | ArticleLikeScalarWhereInput[]
  }

  export type ArticleFavoriteUpdateManyWithoutArticleNestedInput = {
    create?: XOR<ArticleFavoriteCreateWithoutArticleInput, ArticleFavoriteUncheckedCreateWithoutArticleInput> | ArticleFavoriteCreateWithoutArticleInput[] | ArticleFavoriteUncheckedCreateWithoutArticleInput[]
    connectOrCreate?: ArticleFavoriteCreateOrConnectWithoutArticleInput | ArticleFavoriteCreateOrConnectWithoutArticleInput[]
    upsert?: ArticleFavoriteUpsertWithWhereUniqueWithoutArticleInput | ArticleFavoriteUpsertWithWhereUniqueWithoutArticleInput[]
    createMany?: ArticleFavoriteCreateManyArticleInputEnvelope
    set?: ArticleFavoriteWhereUniqueInput | ArticleFavoriteWhereUniqueInput[]
    disconnect?: ArticleFavoriteWhereUniqueInput | ArticleFavoriteWhereUniqueInput[]
    delete?: ArticleFavoriteWhereUniqueInput | ArticleFavoriteWhereUniqueInput[]
    connect?: ArticleFavoriteWhereUniqueInput | ArticleFavoriteWhereUniqueInput[]
    update?: ArticleFavoriteUpdateWithWhereUniqueWithoutArticleInput | ArticleFavoriteUpdateWithWhereUniqueWithoutArticleInput[]
    updateMany?: ArticleFavoriteUpdateManyWithWhereWithoutArticleInput | ArticleFavoriteUpdateManyWithWhereWithoutArticleInput[]
    deleteMany?: ArticleFavoriteScalarWhereInput | ArticleFavoriteScalarWhereInput[]
  }

  export type ArticleCommentUncheckedUpdateManyWithoutArticleNestedInput = {
    create?: XOR<ArticleCommentCreateWithoutArticleInput, ArticleCommentUncheckedCreateWithoutArticleInput> | ArticleCommentCreateWithoutArticleInput[] | ArticleCommentUncheckedCreateWithoutArticleInput[]
    connectOrCreate?: ArticleCommentCreateOrConnectWithoutArticleInput | ArticleCommentCreateOrConnectWithoutArticleInput[]
    upsert?: ArticleCommentUpsertWithWhereUniqueWithoutArticleInput | ArticleCommentUpsertWithWhereUniqueWithoutArticleInput[]
    createMany?: ArticleCommentCreateManyArticleInputEnvelope
    set?: ArticleCommentWhereUniqueInput | ArticleCommentWhereUniqueInput[]
    disconnect?: ArticleCommentWhereUniqueInput | ArticleCommentWhereUniqueInput[]
    delete?: ArticleCommentWhereUniqueInput | ArticleCommentWhereUniqueInput[]
    connect?: ArticleCommentWhereUniqueInput | ArticleCommentWhereUniqueInput[]
    update?: ArticleCommentUpdateWithWhereUniqueWithoutArticleInput | ArticleCommentUpdateWithWhereUniqueWithoutArticleInput[]
    updateMany?: ArticleCommentUpdateManyWithWhereWithoutArticleInput | ArticleCommentUpdateManyWithWhereWithoutArticleInput[]
    deleteMany?: ArticleCommentScalarWhereInput | ArticleCommentScalarWhereInput[]
  }

  export type ArticleLikeUncheckedUpdateManyWithoutArticleNestedInput = {
    create?: XOR<ArticleLikeCreateWithoutArticleInput, ArticleLikeUncheckedCreateWithoutArticleInput> | ArticleLikeCreateWithoutArticleInput[] | ArticleLikeUncheckedCreateWithoutArticleInput[]
    connectOrCreate?: ArticleLikeCreateOrConnectWithoutArticleInput | ArticleLikeCreateOrConnectWithoutArticleInput[]
    upsert?: ArticleLikeUpsertWithWhereUniqueWithoutArticleInput | ArticleLikeUpsertWithWhereUniqueWithoutArticleInput[]
    createMany?: ArticleLikeCreateManyArticleInputEnvelope
    set?: ArticleLikeWhereUniqueInput | ArticleLikeWhereUniqueInput[]
    disconnect?: ArticleLikeWhereUniqueInput | ArticleLikeWhereUniqueInput[]
    delete?: ArticleLikeWhereUniqueInput | ArticleLikeWhereUniqueInput[]
    connect?: ArticleLikeWhereUniqueInput | ArticleLikeWhereUniqueInput[]
    update?: ArticleLikeUpdateWithWhereUniqueWithoutArticleInput | ArticleLikeUpdateWithWhereUniqueWithoutArticleInput[]
    updateMany?: ArticleLikeUpdateManyWithWhereWithoutArticleInput | ArticleLikeUpdateManyWithWhereWithoutArticleInput[]
    deleteMany?: ArticleLikeScalarWhereInput | ArticleLikeScalarWhereInput[]
  }

  export type ArticleFavoriteUncheckedUpdateManyWithoutArticleNestedInput = {
    create?: XOR<ArticleFavoriteCreateWithoutArticleInput, ArticleFavoriteUncheckedCreateWithoutArticleInput> | ArticleFavoriteCreateWithoutArticleInput[] | ArticleFavoriteUncheckedCreateWithoutArticleInput[]
    connectOrCreate?: ArticleFavoriteCreateOrConnectWithoutArticleInput | ArticleFavoriteCreateOrConnectWithoutArticleInput[]
    upsert?: ArticleFavoriteUpsertWithWhereUniqueWithoutArticleInput | ArticleFavoriteUpsertWithWhereUniqueWithoutArticleInput[]
    createMany?: ArticleFavoriteCreateManyArticleInputEnvelope
    set?: ArticleFavoriteWhereUniqueInput | ArticleFavoriteWhereUniqueInput[]
    disconnect?: ArticleFavoriteWhereUniqueInput | ArticleFavoriteWhereUniqueInput[]
    delete?: ArticleFavoriteWhereUniqueInput | ArticleFavoriteWhereUniqueInput[]
    connect?: ArticleFavoriteWhereUniqueInput | ArticleFavoriteWhereUniqueInput[]
    update?: ArticleFavoriteUpdateWithWhereUniqueWithoutArticleInput | ArticleFavoriteUpdateWithWhereUniqueWithoutArticleInput[]
    updateMany?: ArticleFavoriteUpdateManyWithWhereWithoutArticleInput | ArticleFavoriteUpdateManyWithWhereWithoutArticleInput[]
    deleteMany?: ArticleFavoriteScalarWhereInput | ArticleFavoriteScalarWhereInput[]
  }

  export type ArticleCreateNestedOneWithoutCommentsInput = {
    create?: XOR<ArticleCreateWithoutCommentsInput, ArticleUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: ArticleCreateOrConnectWithoutCommentsInput
    connect?: ArticleWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutArticleCommentsInput = {
    create?: XOR<UserCreateWithoutArticleCommentsInput, UserUncheckedCreateWithoutArticleCommentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutArticleCommentsInput
    connect?: UserWhereUniqueInput
  }

  export type ArticleCommentCreateNestedOneWithoutRepliesInput = {
    create?: XOR<ArticleCommentCreateWithoutRepliesInput, ArticleCommentUncheckedCreateWithoutRepliesInput>
    connectOrCreate?: ArticleCommentCreateOrConnectWithoutRepliesInput
    connect?: ArticleCommentWhereUniqueInput
  }

  export type ArticleCommentCreateNestedManyWithoutParentInput = {
    create?: XOR<ArticleCommentCreateWithoutParentInput, ArticleCommentUncheckedCreateWithoutParentInput> | ArticleCommentCreateWithoutParentInput[] | ArticleCommentUncheckedCreateWithoutParentInput[]
    connectOrCreate?: ArticleCommentCreateOrConnectWithoutParentInput | ArticleCommentCreateOrConnectWithoutParentInput[]
    createMany?: ArticleCommentCreateManyParentInputEnvelope
    connect?: ArticleCommentWhereUniqueInput | ArticleCommentWhereUniqueInput[]
  }

  export type ArticleCommentUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<ArticleCommentCreateWithoutParentInput, ArticleCommentUncheckedCreateWithoutParentInput> | ArticleCommentCreateWithoutParentInput[] | ArticleCommentUncheckedCreateWithoutParentInput[]
    connectOrCreate?: ArticleCommentCreateOrConnectWithoutParentInput | ArticleCommentCreateOrConnectWithoutParentInput[]
    createMany?: ArticleCommentCreateManyParentInputEnvelope
    connect?: ArticleCommentWhereUniqueInput | ArticleCommentWhereUniqueInput[]
  }

  export type ArticleUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<ArticleCreateWithoutCommentsInput, ArticleUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: ArticleCreateOrConnectWithoutCommentsInput
    upsert?: ArticleUpsertWithoutCommentsInput
    connect?: ArticleWhereUniqueInput
    update?: XOR<XOR<ArticleUpdateToOneWithWhereWithoutCommentsInput, ArticleUpdateWithoutCommentsInput>, ArticleUncheckedUpdateWithoutCommentsInput>
  }

  export type UserUpdateOneRequiredWithoutArticleCommentsNestedInput = {
    create?: XOR<UserCreateWithoutArticleCommentsInput, UserUncheckedCreateWithoutArticleCommentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutArticleCommentsInput
    upsert?: UserUpsertWithoutArticleCommentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutArticleCommentsInput, UserUpdateWithoutArticleCommentsInput>, UserUncheckedUpdateWithoutArticleCommentsInput>
  }

  export type ArticleCommentUpdateOneWithoutRepliesNestedInput = {
    create?: XOR<ArticleCommentCreateWithoutRepliesInput, ArticleCommentUncheckedCreateWithoutRepliesInput>
    connectOrCreate?: ArticleCommentCreateOrConnectWithoutRepliesInput
    upsert?: ArticleCommentUpsertWithoutRepliesInput
    disconnect?: ArticleCommentWhereInput | boolean
    delete?: ArticleCommentWhereInput | boolean
    connect?: ArticleCommentWhereUniqueInput
    update?: XOR<XOR<ArticleCommentUpdateToOneWithWhereWithoutRepliesInput, ArticleCommentUpdateWithoutRepliesInput>, ArticleCommentUncheckedUpdateWithoutRepliesInput>
  }

  export type ArticleCommentUpdateManyWithoutParentNestedInput = {
    create?: XOR<ArticleCommentCreateWithoutParentInput, ArticleCommentUncheckedCreateWithoutParentInput> | ArticleCommentCreateWithoutParentInput[] | ArticleCommentUncheckedCreateWithoutParentInput[]
    connectOrCreate?: ArticleCommentCreateOrConnectWithoutParentInput | ArticleCommentCreateOrConnectWithoutParentInput[]
    upsert?: ArticleCommentUpsertWithWhereUniqueWithoutParentInput | ArticleCommentUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: ArticleCommentCreateManyParentInputEnvelope
    set?: ArticleCommentWhereUniqueInput | ArticleCommentWhereUniqueInput[]
    disconnect?: ArticleCommentWhereUniqueInput | ArticleCommentWhereUniqueInput[]
    delete?: ArticleCommentWhereUniqueInput | ArticleCommentWhereUniqueInput[]
    connect?: ArticleCommentWhereUniqueInput | ArticleCommentWhereUniqueInput[]
    update?: ArticleCommentUpdateWithWhereUniqueWithoutParentInput | ArticleCommentUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: ArticleCommentUpdateManyWithWhereWithoutParentInput | ArticleCommentUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: ArticleCommentScalarWhereInput | ArticleCommentScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ArticleCommentUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<ArticleCommentCreateWithoutParentInput, ArticleCommentUncheckedCreateWithoutParentInput> | ArticleCommentCreateWithoutParentInput[] | ArticleCommentUncheckedCreateWithoutParentInput[]
    connectOrCreate?: ArticleCommentCreateOrConnectWithoutParentInput | ArticleCommentCreateOrConnectWithoutParentInput[]
    upsert?: ArticleCommentUpsertWithWhereUniqueWithoutParentInput | ArticleCommentUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: ArticleCommentCreateManyParentInputEnvelope
    set?: ArticleCommentWhereUniqueInput | ArticleCommentWhereUniqueInput[]
    disconnect?: ArticleCommentWhereUniqueInput | ArticleCommentWhereUniqueInput[]
    delete?: ArticleCommentWhereUniqueInput | ArticleCommentWhereUniqueInput[]
    connect?: ArticleCommentWhereUniqueInput | ArticleCommentWhereUniqueInput[]
    update?: ArticleCommentUpdateWithWhereUniqueWithoutParentInput | ArticleCommentUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: ArticleCommentUpdateManyWithWhereWithoutParentInput | ArticleCommentUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: ArticleCommentScalarWhereInput | ArticleCommentScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutArticleLikesInput = {
    create?: XOR<UserCreateWithoutArticleLikesInput, UserUncheckedCreateWithoutArticleLikesInput>
    connectOrCreate?: UserCreateOrConnectWithoutArticleLikesInput
    connect?: UserWhereUniqueInput
  }

  export type ArticleCreateNestedOneWithoutLikesInput = {
    create?: XOR<ArticleCreateWithoutLikesInput, ArticleUncheckedCreateWithoutLikesInput>
    connectOrCreate?: ArticleCreateOrConnectWithoutLikesInput
    connect?: ArticleWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutArticleLikesNestedInput = {
    create?: XOR<UserCreateWithoutArticleLikesInput, UserUncheckedCreateWithoutArticleLikesInput>
    connectOrCreate?: UserCreateOrConnectWithoutArticleLikesInput
    upsert?: UserUpsertWithoutArticleLikesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutArticleLikesInput, UserUpdateWithoutArticleLikesInput>, UserUncheckedUpdateWithoutArticleLikesInput>
  }

  export type ArticleUpdateOneRequiredWithoutLikesNestedInput = {
    create?: XOR<ArticleCreateWithoutLikesInput, ArticleUncheckedCreateWithoutLikesInput>
    connectOrCreate?: ArticleCreateOrConnectWithoutLikesInput
    upsert?: ArticleUpsertWithoutLikesInput
    connect?: ArticleWhereUniqueInput
    update?: XOR<XOR<ArticleUpdateToOneWithWhereWithoutLikesInput, ArticleUpdateWithoutLikesInput>, ArticleUncheckedUpdateWithoutLikesInput>
  }

  export type UserCreateNestedOneWithoutArticleFavoritesInput = {
    create?: XOR<UserCreateWithoutArticleFavoritesInput, UserUncheckedCreateWithoutArticleFavoritesInput>
    connectOrCreate?: UserCreateOrConnectWithoutArticleFavoritesInput
    connect?: UserWhereUniqueInput
  }

  export type ArticleCreateNestedOneWithoutFavoritesInput = {
    create?: XOR<ArticleCreateWithoutFavoritesInput, ArticleUncheckedCreateWithoutFavoritesInput>
    connectOrCreate?: ArticleCreateOrConnectWithoutFavoritesInput
    connect?: ArticleWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutArticleFavoritesNestedInput = {
    create?: XOR<UserCreateWithoutArticleFavoritesInput, UserUncheckedCreateWithoutArticleFavoritesInput>
    connectOrCreate?: UserCreateOrConnectWithoutArticleFavoritesInput
    upsert?: UserUpsertWithoutArticleFavoritesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutArticleFavoritesInput, UserUpdateWithoutArticleFavoritesInput>, UserUncheckedUpdateWithoutArticleFavoritesInput>
  }

  export type ArticleUpdateOneRequiredWithoutFavoritesNestedInput = {
    create?: XOR<ArticleCreateWithoutFavoritesInput, ArticleUncheckedCreateWithoutFavoritesInput>
    connectOrCreate?: ArticleCreateOrConnectWithoutFavoritesInput
    upsert?: ArticleUpsertWithoutFavoritesInput
    connect?: ArticleWhereUniqueInput
    update?: XOR<XOR<ArticleUpdateToOneWithWhereWithoutFavoritesInput, ArticleUpdateWithoutFavoritesInput>, ArticleUncheckedUpdateWithoutFavoritesInput>
  }

  export type PostCreateNestedManyWithoutAuthorInput = {
    create?: XOR<PostCreateWithoutAuthorInput, PostUncheckedCreateWithoutAuthorInput> | PostCreateWithoutAuthorInput[] | PostUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: PostCreateOrConnectWithoutAuthorInput | PostCreateOrConnectWithoutAuthorInput[]
    createMany?: PostCreateManyAuthorInputEnvelope
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
  }

  export type CommentCreateNestedManyWithoutAuthorInput = {
    create?: XOR<CommentCreateWithoutAuthorInput, CommentUncheckedCreateWithoutAuthorInput> | CommentCreateWithoutAuthorInput[] | CommentUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutAuthorInput | CommentCreateOrConnectWithoutAuthorInput[]
    createMany?: CommentCreateManyAuthorInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type ArticleCreateNestedManyWithoutAuthorInput = {
    create?: XOR<ArticleCreateWithoutAuthorInput, ArticleUncheckedCreateWithoutAuthorInput> | ArticleCreateWithoutAuthorInput[] | ArticleUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: ArticleCreateOrConnectWithoutAuthorInput | ArticleCreateOrConnectWithoutAuthorInput[]
    createMany?: ArticleCreateManyAuthorInputEnvelope
    connect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
  }

  export type ArticleCommentCreateNestedManyWithoutUserInput = {
    create?: XOR<ArticleCommentCreateWithoutUserInput, ArticleCommentUncheckedCreateWithoutUserInput> | ArticleCommentCreateWithoutUserInput[] | ArticleCommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ArticleCommentCreateOrConnectWithoutUserInput | ArticleCommentCreateOrConnectWithoutUserInput[]
    createMany?: ArticleCommentCreateManyUserInputEnvelope
    connect?: ArticleCommentWhereUniqueInput | ArticleCommentWhereUniqueInput[]
  }

  export type ArticleLikeCreateNestedManyWithoutUserInput = {
    create?: XOR<ArticleLikeCreateWithoutUserInput, ArticleLikeUncheckedCreateWithoutUserInput> | ArticleLikeCreateWithoutUserInput[] | ArticleLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ArticleLikeCreateOrConnectWithoutUserInput | ArticleLikeCreateOrConnectWithoutUserInput[]
    createMany?: ArticleLikeCreateManyUserInputEnvelope
    connect?: ArticleLikeWhereUniqueInput | ArticleLikeWhereUniqueInput[]
  }

  export type ArticleFavoriteCreateNestedManyWithoutUserInput = {
    create?: XOR<ArticleFavoriteCreateWithoutUserInput, ArticleFavoriteUncheckedCreateWithoutUserInput> | ArticleFavoriteCreateWithoutUserInput[] | ArticleFavoriteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ArticleFavoriteCreateOrConnectWithoutUserInput | ArticleFavoriteCreateOrConnectWithoutUserInput[]
    createMany?: ArticleFavoriteCreateManyUserInputEnvelope
    connect?: ArticleFavoriteWhereUniqueInput | ArticleFavoriteWhereUniqueInput[]
  }

  export type PostUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<PostCreateWithoutAuthorInput, PostUncheckedCreateWithoutAuthorInput> | PostCreateWithoutAuthorInput[] | PostUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: PostCreateOrConnectWithoutAuthorInput | PostCreateOrConnectWithoutAuthorInput[]
    createMany?: PostCreateManyAuthorInputEnvelope
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
  }

  export type CommentUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<CommentCreateWithoutAuthorInput, CommentUncheckedCreateWithoutAuthorInput> | CommentCreateWithoutAuthorInput[] | CommentUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutAuthorInput | CommentCreateOrConnectWithoutAuthorInput[]
    createMany?: CommentCreateManyAuthorInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type ArticleUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<ArticleCreateWithoutAuthorInput, ArticleUncheckedCreateWithoutAuthorInput> | ArticleCreateWithoutAuthorInput[] | ArticleUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: ArticleCreateOrConnectWithoutAuthorInput | ArticleCreateOrConnectWithoutAuthorInput[]
    createMany?: ArticleCreateManyAuthorInputEnvelope
    connect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
  }

  export type ArticleCommentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ArticleCommentCreateWithoutUserInput, ArticleCommentUncheckedCreateWithoutUserInput> | ArticleCommentCreateWithoutUserInput[] | ArticleCommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ArticleCommentCreateOrConnectWithoutUserInput | ArticleCommentCreateOrConnectWithoutUserInput[]
    createMany?: ArticleCommentCreateManyUserInputEnvelope
    connect?: ArticleCommentWhereUniqueInput | ArticleCommentWhereUniqueInput[]
  }

  export type ArticleLikeUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ArticleLikeCreateWithoutUserInput, ArticleLikeUncheckedCreateWithoutUserInput> | ArticleLikeCreateWithoutUserInput[] | ArticleLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ArticleLikeCreateOrConnectWithoutUserInput | ArticleLikeCreateOrConnectWithoutUserInput[]
    createMany?: ArticleLikeCreateManyUserInputEnvelope
    connect?: ArticleLikeWhereUniqueInput | ArticleLikeWhereUniqueInput[]
  }

  export type ArticleFavoriteUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ArticleFavoriteCreateWithoutUserInput, ArticleFavoriteUncheckedCreateWithoutUserInput> | ArticleFavoriteCreateWithoutUserInput[] | ArticleFavoriteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ArticleFavoriteCreateOrConnectWithoutUserInput | ArticleFavoriteCreateOrConnectWithoutUserInput[]
    createMany?: ArticleFavoriteCreateManyUserInputEnvelope
    connect?: ArticleFavoriteWhereUniqueInput | ArticleFavoriteWhereUniqueInput[]
  }

  export type PostUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<PostCreateWithoutAuthorInput, PostUncheckedCreateWithoutAuthorInput> | PostCreateWithoutAuthorInput[] | PostUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: PostCreateOrConnectWithoutAuthorInput | PostCreateOrConnectWithoutAuthorInput[]
    upsert?: PostUpsertWithWhereUniqueWithoutAuthorInput | PostUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: PostCreateManyAuthorInputEnvelope
    set?: PostWhereUniqueInput | PostWhereUniqueInput[]
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    update?: PostUpdateWithWhereUniqueWithoutAuthorInput | PostUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: PostUpdateManyWithWhereWithoutAuthorInput | PostUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[]
  }

  export type CommentUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<CommentCreateWithoutAuthorInput, CommentUncheckedCreateWithoutAuthorInput> | CommentCreateWithoutAuthorInput[] | CommentUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutAuthorInput | CommentCreateOrConnectWithoutAuthorInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutAuthorInput | CommentUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: CommentCreateManyAuthorInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutAuthorInput | CommentUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutAuthorInput | CommentUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type ArticleUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<ArticleCreateWithoutAuthorInput, ArticleUncheckedCreateWithoutAuthorInput> | ArticleCreateWithoutAuthorInput[] | ArticleUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: ArticleCreateOrConnectWithoutAuthorInput | ArticleCreateOrConnectWithoutAuthorInput[]
    upsert?: ArticleUpsertWithWhereUniqueWithoutAuthorInput | ArticleUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: ArticleCreateManyAuthorInputEnvelope
    set?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    disconnect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    delete?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    connect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    update?: ArticleUpdateWithWhereUniqueWithoutAuthorInput | ArticleUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: ArticleUpdateManyWithWhereWithoutAuthorInput | ArticleUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: ArticleScalarWhereInput | ArticleScalarWhereInput[]
  }

  export type ArticleCommentUpdateManyWithoutUserNestedInput = {
    create?: XOR<ArticleCommentCreateWithoutUserInput, ArticleCommentUncheckedCreateWithoutUserInput> | ArticleCommentCreateWithoutUserInput[] | ArticleCommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ArticleCommentCreateOrConnectWithoutUserInput | ArticleCommentCreateOrConnectWithoutUserInput[]
    upsert?: ArticleCommentUpsertWithWhereUniqueWithoutUserInput | ArticleCommentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ArticleCommentCreateManyUserInputEnvelope
    set?: ArticleCommentWhereUniqueInput | ArticleCommentWhereUniqueInput[]
    disconnect?: ArticleCommentWhereUniqueInput | ArticleCommentWhereUniqueInput[]
    delete?: ArticleCommentWhereUniqueInput | ArticleCommentWhereUniqueInput[]
    connect?: ArticleCommentWhereUniqueInput | ArticleCommentWhereUniqueInput[]
    update?: ArticleCommentUpdateWithWhereUniqueWithoutUserInput | ArticleCommentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ArticleCommentUpdateManyWithWhereWithoutUserInput | ArticleCommentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ArticleCommentScalarWhereInput | ArticleCommentScalarWhereInput[]
  }

  export type ArticleLikeUpdateManyWithoutUserNestedInput = {
    create?: XOR<ArticleLikeCreateWithoutUserInput, ArticleLikeUncheckedCreateWithoutUserInput> | ArticleLikeCreateWithoutUserInput[] | ArticleLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ArticleLikeCreateOrConnectWithoutUserInput | ArticleLikeCreateOrConnectWithoutUserInput[]
    upsert?: ArticleLikeUpsertWithWhereUniqueWithoutUserInput | ArticleLikeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ArticleLikeCreateManyUserInputEnvelope
    set?: ArticleLikeWhereUniqueInput | ArticleLikeWhereUniqueInput[]
    disconnect?: ArticleLikeWhereUniqueInput | ArticleLikeWhereUniqueInput[]
    delete?: ArticleLikeWhereUniqueInput | ArticleLikeWhereUniqueInput[]
    connect?: ArticleLikeWhereUniqueInput | ArticleLikeWhereUniqueInput[]
    update?: ArticleLikeUpdateWithWhereUniqueWithoutUserInput | ArticleLikeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ArticleLikeUpdateManyWithWhereWithoutUserInput | ArticleLikeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ArticleLikeScalarWhereInput | ArticleLikeScalarWhereInput[]
  }

  export type ArticleFavoriteUpdateManyWithoutUserNestedInput = {
    create?: XOR<ArticleFavoriteCreateWithoutUserInput, ArticleFavoriteUncheckedCreateWithoutUserInput> | ArticleFavoriteCreateWithoutUserInput[] | ArticleFavoriteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ArticleFavoriteCreateOrConnectWithoutUserInput | ArticleFavoriteCreateOrConnectWithoutUserInput[]
    upsert?: ArticleFavoriteUpsertWithWhereUniqueWithoutUserInput | ArticleFavoriteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ArticleFavoriteCreateManyUserInputEnvelope
    set?: ArticleFavoriteWhereUniqueInput | ArticleFavoriteWhereUniqueInput[]
    disconnect?: ArticleFavoriteWhereUniqueInput | ArticleFavoriteWhereUniqueInput[]
    delete?: ArticleFavoriteWhereUniqueInput | ArticleFavoriteWhereUniqueInput[]
    connect?: ArticleFavoriteWhereUniqueInput | ArticleFavoriteWhereUniqueInput[]
    update?: ArticleFavoriteUpdateWithWhereUniqueWithoutUserInput | ArticleFavoriteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ArticleFavoriteUpdateManyWithWhereWithoutUserInput | ArticleFavoriteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ArticleFavoriteScalarWhereInput | ArticleFavoriteScalarWhereInput[]
  }

  export type PostUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<PostCreateWithoutAuthorInput, PostUncheckedCreateWithoutAuthorInput> | PostCreateWithoutAuthorInput[] | PostUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: PostCreateOrConnectWithoutAuthorInput | PostCreateOrConnectWithoutAuthorInput[]
    upsert?: PostUpsertWithWhereUniqueWithoutAuthorInput | PostUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: PostCreateManyAuthorInputEnvelope
    set?: PostWhereUniqueInput | PostWhereUniqueInput[]
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    update?: PostUpdateWithWhereUniqueWithoutAuthorInput | PostUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: PostUpdateManyWithWhereWithoutAuthorInput | PostUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[]
  }

  export type CommentUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<CommentCreateWithoutAuthorInput, CommentUncheckedCreateWithoutAuthorInput> | CommentCreateWithoutAuthorInput[] | CommentUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutAuthorInput | CommentCreateOrConnectWithoutAuthorInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutAuthorInput | CommentUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: CommentCreateManyAuthorInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutAuthorInput | CommentUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutAuthorInput | CommentUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type ArticleUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<ArticleCreateWithoutAuthorInput, ArticleUncheckedCreateWithoutAuthorInput> | ArticleCreateWithoutAuthorInput[] | ArticleUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: ArticleCreateOrConnectWithoutAuthorInput | ArticleCreateOrConnectWithoutAuthorInput[]
    upsert?: ArticleUpsertWithWhereUniqueWithoutAuthorInput | ArticleUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: ArticleCreateManyAuthorInputEnvelope
    set?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    disconnect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    delete?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    connect?: ArticleWhereUniqueInput | ArticleWhereUniqueInput[]
    update?: ArticleUpdateWithWhereUniqueWithoutAuthorInput | ArticleUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: ArticleUpdateManyWithWhereWithoutAuthorInput | ArticleUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: ArticleScalarWhereInput | ArticleScalarWhereInput[]
  }

  export type ArticleCommentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ArticleCommentCreateWithoutUserInput, ArticleCommentUncheckedCreateWithoutUserInput> | ArticleCommentCreateWithoutUserInput[] | ArticleCommentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ArticleCommentCreateOrConnectWithoutUserInput | ArticleCommentCreateOrConnectWithoutUserInput[]
    upsert?: ArticleCommentUpsertWithWhereUniqueWithoutUserInput | ArticleCommentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ArticleCommentCreateManyUserInputEnvelope
    set?: ArticleCommentWhereUniqueInput | ArticleCommentWhereUniqueInput[]
    disconnect?: ArticleCommentWhereUniqueInput | ArticleCommentWhereUniqueInput[]
    delete?: ArticleCommentWhereUniqueInput | ArticleCommentWhereUniqueInput[]
    connect?: ArticleCommentWhereUniqueInput | ArticleCommentWhereUniqueInput[]
    update?: ArticleCommentUpdateWithWhereUniqueWithoutUserInput | ArticleCommentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ArticleCommentUpdateManyWithWhereWithoutUserInput | ArticleCommentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ArticleCommentScalarWhereInput | ArticleCommentScalarWhereInput[]
  }

  export type ArticleLikeUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ArticleLikeCreateWithoutUserInput, ArticleLikeUncheckedCreateWithoutUserInput> | ArticleLikeCreateWithoutUserInput[] | ArticleLikeUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ArticleLikeCreateOrConnectWithoutUserInput | ArticleLikeCreateOrConnectWithoutUserInput[]
    upsert?: ArticleLikeUpsertWithWhereUniqueWithoutUserInput | ArticleLikeUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ArticleLikeCreateManyUserInputEnvelope
    set?: ArticleLikeWhereUniqueInput | ArticleLikeWhereUniqueInput[]
    disconnect?: ArticleLikeWhereUniqueInput | ArticleLikeWhereUniqueInput[]
    delete?: ArticleLikeWhereUniqueInput | ArticleLikeWhereUniqueInput[]
    connect?: ArticleLikeWhereUniqueInput | ArticleLikeWhereUniqueInput[]
    update?: ArticleLikeUpdateWithWhereUniqueWithoutUserInput | ArticleLikeUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ArticleLikeUpdateManyWithWhereWithoutUserInput | ArticleLikeUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ArticleLikeScalarWhereInput | ArticleLikeScalarWhereInput[]
  }

  export type ArticleFavoriteUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ArticleFavoriteCreateWithoutUserInput, ArticleFavoriteUncheckedCreateWithoutUserInput> | ArticleFavoriteCreateWithoutUserInput[] | ArticleFavoriteUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ArticleFavoriteCreateOrConnectWithoutUserInput | ArticleFavoriteCreateOrConnectWithoutUserInput[]
    upsert?: ArticleFavoriteUpsertWithWhereUniqueWithoutUserInput | ArticleFavoriteUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ArticleFavoriteCreateManyUserInputEnvelope
    set?: ArticleFavoriteWhereUniqueInput | ArticleFavoriteWhereUniqueInput[]
    disconnect?: ArticleFavoriteWhereUniqueInput | ArticleFavoriteWhereUniqueInput[]
    delete?: ArticleFavoriteWhereUniqueInput | ArticleFavoriteWhereUniqueInput[]
    connect?: ArticleFavoriteWhereUniqueInput | ArticleFavoriteWhereUniqueInput[]
    update?: ArticleFavoriteUpdateWithWhereUniqueWithoutUserInput | ArticleFavoriteUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ArticleFavoriteUpdateManyWithWhereWithoutUserInput | ArticleFavoriteUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ArticleFavoriteScalarWhereInput | ArticleFavoriteScalarWhereInput[]
  }

  export type PostCreateNestedOneWithoutCommentsInput = {
    create?: XOR<PostCreateWithoutCommentsInput, PostUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: PostCreateOrConnectWithoutCommentsInput
    connect?: PostWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCommentsInput = {
    create?: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommentsInput
    connect?: UserWhereUniqueInput
  }

  export type PostUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<PostCreateWithoutCommentsInput, PostUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: PostCreateOrConnectWithoutCommentsInput
    upsert?: PostUpsertWithoutCommentsInput
    connect?: PostWhereUniqueInput
    update?: XOR<XOR<PostUpdateToOneWithWhereWithoutCommentsInput, PostUpdateWithoutCommentsInput>, PostUncheckedUpdateWithoutCommentsInput>
  }

  export type UserUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCommentsInput
    upsert?: UserUpsertWithoutCommentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCommentsInput, UserUpdateWithoutCommentsInput>, UserUncheckedUpdateWithoutCommentsInput>
  }

  export type UserCreateNestedOneWithoutPostsInput = {
    create?: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPostsInput
    connect?: UserWhereUniqueInput
  }

  export type CommentCreateNestedManyWithoutPostInput = {
    create?: XOR<CommentCreateWithoutPostInput, CommentUncheckedCreateWithoutPostInput> | CommentCreateWithoutPostInput[] | CommentUncheckedCreateWithoutPostInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutPostInput | CommentCreateOrConnectWithoutPostInput[]
    createMany?: CommentCreateManyPostInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type CategoryCreateNestedManyWithoutPostsInput = {
    create?: XOR<CategoryCreateWithoutPostsInput, CategoryUncheckedCreateWithoutPostsInput> | CategoryCreateWithoutPostsInput[] | CategoryUncheckedCreateWithoutPostsInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutPostsInput | CategoryCreateOrConnectWithoutPostsInput[]
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
  }

  export type CommentUncheckedCreateNestedManyWithoutPostInput = {
    create?: XOR<CommentCreateWithoutPostInput, CommentUncheckedCreateWithoutPostInput> | CommentCreateWithoutPostInput[] | CommentUncheckedCreateWithoutPostInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutPostInput | CommentCreateOrConnectWithoutPostInput[]
    createMany?: CommentCreateManyPostInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type CategoryUncheckedCreateNestedManyWithoutPostsInput = {
    create?: XOR<CategoryCreateWithoutPostsInput, CategoryUncheckedCreateWithoutPostsInput> | CategoryCreateWithoutPostsInput[] | CategoryUncheckedCreateWithoutPostsInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutPostsInput | CategoryCreateOrConnectWithoutPostsInput[]
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutPostsNestedInput = {
    create?: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPostsInput
    upsert?: UserUpsertWithoutPostsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPostsInput, UserUpdateWithoutPostsInput>, UserUncheckedUpdateWithoutPostsInput>
  }

  export type CommentUpdateManyWithoutPostNestedInput = {
    create?: XOR<CommentCreateWithoutPostInput, CommentUncheckedCreateWithoutPostInput> | CommentCreateWithoutPostInput[] | CommentUncheckedCreateWithoutPostInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutPostInput | CommentCreateOrConnectWithoutPostInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutPostInput | CommentUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: CommentCreateManyPostInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutPostInput | CommentUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutPostInput | CommentUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type CategoryUpdateManyWithoutPostsNestedInput = {
    create?: XOR<CategoryCreateWithoutPostsInput, CategoryUncheckedCreateWithoutPostsInput> | CategoryCreateWithoutPostsInput[] | CategoryUncheckedCreateWithoutPostsInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutPostsInput | CategoryCreateOrConnectWithoutPostsInput[]
    upsert?: CategoryUpsertWithWhereUniqueWithoutPostsInput | CategoryUpsertWithWhereUniqueWithoutPostsInput[]
    set?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    disconnect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    delete?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    update?: CategoryUpdateWithWhereUniqueWithoutPostsInput | CategoryUpdateWithWhereUniqueWithoutPostsInput[]
    updateMany?: CategoryUpdateManyWithWhereWithoutPostsInput | CategoryUpdateManyWithWhereWithoutPostsInput[]
    deleteMany?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
  }

  export type CommentUncheckedUpdateManyWithoutPostNestedInput = {
    create?: XOR<CommentCreateWithoutPostInput, CommentUncheckedCreateWithoutPostInput> | CommentCreateWithoutPostInput[] | CommentUncheckedCreateWithoutPostInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutPostInput | CommentCreateOrConnectWithoutPostInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutPostInput | CommentUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: CommentCreateManyPostInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutPostInput | CommentUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutPostInput | CommentUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type CategoryUncheckedUpdateManyWithoutPostsNestedInput = {
    create?: XOR<CategoryCreateWithoutPostsInput, CategoryUncheckedCreateWithoutPostsInput> | CategoryCreateWithoutPostsInput[] | CategoryUncheckedCreateWithoutPostsInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutPostsInput | CategoryCreateOrConnectWithoutPostsInput[]
    upsert?: CategoryUpsertWithWhereUniqueWithoutPostsInput | CategoryUpsertWithWhereUniqueWithoutPostsInput[]
    set?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    disconnect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    delete?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    update?: CategoryUpdateWithWhereUniqueWithoutPostsInput | CategoryUpdateWithWhereUniqueWithoutPostsInput[]
    updateMany?: CategoryUpdateManyWithWhereWithoutPostsInput | CategoryUpdateManyWithWhereWithoutPostsInput[]
    deleteMany?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
  }

  export type PostCreateNestedManyWithoutCategoriesInput = {
    create?: XOR<PostCreateWithoutCategoriesInput, PostUncheckedCreateWithoutCategoriesInput> | PostCreateWithoutCategoriesInput[] | PostUncheckedCreateWithoutCategoriesInput[]
    connectOrCreate?: PostCreateOrConnectWithoutCategoriesInput | PostCreateOrConnectWithoutCategoriesInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
  }

  export type PostUncheckedCreateNestedManyWithoutCategoriesInput = {
    create?: XOR<PostCreateWithoutCategoriesInput, PostUncheckedCreateWithoutCategoriesInput> | PostCreateWithoutCategoriesInput[] | PostUncheckedCreateWithoutCategoriesInput[]
    connectOrCreate?: PostCreateOrConnectWithoutCategoriesInput | PostCreateOrConnectWithoutCategoriesInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
  }

  export type PostUpdateManyWithoutCategoriesNestedInput = {
    create?: XOR<PostCreateWithoutCategoriesInput, PostUncheckedCreateWithoutCategoriesInput> | PostCreateWithoutCategoriesInput[] | PostUncheckedCreateWithoutCategoriesInput[]
    connectOrCreate?: PostCreateOrConnectWithoutCategoriesInput | PostCreateOrConnectWithoutCategoriesInput[]
    upsert?: PostUpsertWithWhereUniqueWithoutCategoriesInput | PostUpsertWithWhereUniqueWithoutCategoriesInput[]
    set?: PostWhereUniqueInput | PostWhereUniqueInput[]
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    update?: PostUpdateWithWhereUniqueWithoutCategoriesInput | PostUpdateWithWhereUniqueWithoutCategoriesInput[]
    updateMany?: PostUpdateManyWithWhereWithoutCategoriesInput | PostUpdateManyWithWhereWithoutCategoriesInput[]
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[]
  }

  export type PostUncheckedUpdateManyWithoutCategoriesNestedInput = {
    create?: XOR<PostCreateWithoutCategoriesInput, PostUncheckedCreateWithoutCategoriesInput> | PostCreateWithoutCategoriesInput[] | PostUncheckedCreateWithoutCategoriesInput[]
    connectOrCreate?: PostCreateOrConnectWithoutCategoriesInput | PostCreateOrConnectWithoutCategoriesInput[]
    upsert?: PostUpsertWithWhereUniqueWithoutCategoriesInput | PostUpsertWithWhereUniqueWithoutCategoriesInput[]
    set?: PostWhereUniqueInput | PostWhereUniqueInput[]
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    update?: PostUpdateWithWhereUniqueWithoutCategoriesInput | PostUpdateWithWhereUniqueWithoutCategoriesInput[]
    updateMany?: PostUpdateManyWithWhereWithoutCategoriesInput | PostUpdateManyWithWhereWithoutCategoriesInput[]
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[]
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ArticleCreateWithoutCategoryInput = {
    title: string
    content: string
    coverImage?: string | null
    views?: number
    likesCount?: number
    favCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    author: UserCreateNestedOneWithoutArticlesInput
    comments?: ArticleCommentCreateNestedManyWithoutArticleInput
    likes?: ArticleLikeCreateNestedManyWithoutArticleInput
    favorites?: ArticleFavoriteCreateNestedManyWithoutArticleInput
  }

  export type ArticleUncheckedCreateWithoutCategoryInput = {
    id?: number
    title: string
    content: string
    coverImage?: string | null
    authorId: number
    views?: number
    likesCount?: number
    favCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    comments?: ArticleCommentUncheckedCreateNestedManyWithoutArticleInput
    likes?: ArticleLikeUncheckedCreateNestedManyWithoutArticleInput
    favorites?: ArticleFavoriteUncheckedCreateNestedManyWithoutArticleInput
  }

  export type ArticleCreateOrConnectWithoutCategoryInput = {
    where: ArticleWhereUniqueInput
    create: XOR<ArticleCreateWithoutCategoryInput, ArticleUncheckedCreateWithoutCategoryInput>
  }

  export type ArticleCreateManyCategoryInputEnvelope = {
    data: ArticleCreateManyCategoryInput | ArticleCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type ArticleUpsertWithWhereUniqueWithoutCategoryInput = {
    where: ArticleWhereUniqueInput
    update: XOR<ArticleUpdateWithoutCategoryInput, ArticleUncheckedUpdateWithoutCategoryInput>
    create: XOR<ArticleCreateWithoutCategoryInput, ArticleUncheckedCreateWithoutCategoryInput>
  }

  export type ArticleUpdateWithWhereUniqueWithoutCategoryInput = {
    where: ArticleWhereUniqueInput
    data: XOR<ArticleUpdateWithoutCategoryInput, ArticleUncheckedUpdateWithoutCategoryInput>
  }

  export type ArticleUpdateManyWithWhereWithoutCategoryInput = {
    where: ArticleScalarWhereInput
    data: XOR<ArticleUpdateManyMutationInput, ArticleUncheckedUpdateManyWithoutCategoryInput>
  }

  export type ArticleScalarWhereInput = {
    AND?: ArticleScalarWhereInput | ArticleScalarWhereInput[]
    OR?: ArticleScalarWhereInput[]
    NOT?: ArticleScalarWhereInput | ArticleScalarWhereInput[]
    id?: IntFilter<"Article"> | number
    title?: StringFilter<"Article"> | string
    content?: StringFilter<"Article"> | string
    coverImage?: StringNullableFilter<"Article"> | string | null
    authorId?: IntFilter<"Article"> | number
    categoryId?: IntFilter<"Article"> | number
    views?: IntFilter<"Article"> | number
    likesCount?: IntFilter<"Article"> | number
    favCount?: IntFilter<"Article"> | number
    createdAt?: DateTimeFilter<"Article"> | Date | string
    updatedAt?: DateTimeFilter<"Article"> | Date | string
  }

  export type ArticleCategoryCreateWithoutArticlesInput = {
    name: string
    sort?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArticleCategoryUncheckedCreateWithoutArticlesInput = {
    id?: number
    name: string
    sort?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArticleCategoryCreateOrConnectWithoutArticlesInput = {
    where: ArticleCategoryWhereUniqueInput
    create: XOR<ArticleCategoryCreateWithoutArticlesInput, ArticleCategoryUncheckedCreateWithoutArticlesInput>
  }

  export type UserCreateWithoutArticlesInput = {
    username: string
    phone: string
    nickname?: string
    password: string
    email?: string
    favs?: number
    gender?: string
    roles?: string
    avatar?: string
    status?: string
    regmark?: string
    location?: string
    isVip?: string
    count?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    posts?: PostCreateNestedManyWithoutAuthorInput
    comments?: CommentCreateNestedManyWithoutAuthorInput
    articleComments?: ArticleCommentCreateNestedManyWithoutUserInput
    articleLikes?: ArticleLikeCreateNestedManyWithoutUserInput
    articleFavorites?: ArticleFavoriteCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutArticlesInput = {
    id?: number
    username: string
    phone: string
    nickname?: string
    password: string
    email?: string
    favs?: number
    gender?: string
    roles?: string
    avatar?: string
    status?: string
    regmark?: string
    location?: string
    isVip?: string
    count?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    posts?: PostUncheckedCreateNestedManyWithoutAuthorInput
    comments?: CommentUncheckedCreateNestedManyWithoutAuthorInput
    articleComments?: ArticleCommentUncheckedCreateNestedManyWithoutUserInput
    articleLikes?: ArticleLikeUncheckedCreateNestedManyWithoutUserInput
    articleFavorites?: ArticleFavoriteUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutArticlesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutArticlesInput, UserUncheckedCreateWithoutArticlesInput>
  }

  export type ArticleCommentCreateWithoutArticleInput = {
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutArticleCommentsInput
    parent?: ArticleCommentCreateNestedOneWithoutRepliesInput
    replies?: ArticleCommentCreateNestedManyWithoutParentInput
  }

  export type ArticleCommentUncheckedCreateWithoutArticleInput = {
    id?: number
    userId: number
    parentId?: number | null
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    replies?: ArticleCommentUncheckedCreateNestedManyWithoutParentInput
  }

  export type ArticleCommentCreateOrConnectWithoutArticleInput = {
    where: ArticleCommentWhereUniqueInput
    create: XOR<ArticleCommentCreateWithoutArticleInput, ArticleCommentUncheckedCreateWithoutArticleInput>
  }

  export type ArticleCommentCreateManyArticleInputEnvelope = {
    data: ArticleCommentCreateManyArticleInput | ArticleCommentCreateManyArticleInput[]
    skipDuplicates?: boolean
  }

  export type ArticleLikeCreateWithoutArticleInput = {
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutArticleLikesInput
  }

  export type ArticleLikeUncheckedCreateWithoutArticleInput = {
    id?: number
    userId: number
    createdAt?: Date | string
  }

  export type ArticleLikeCreateOrConnectWithoutArticleInput = {
    where: ArticleLikeWhereUniqueInput
    create: XOR<ArticleLikeCreateWithoutArticleInput, ArticleLikeUncheckedCreateWithoutArticleInput>
  }

  export type ArticleLikeCreateManyArticleInputEnvelope = {
    data: ArticleLikeCreateManyArticleInput | ArticleLikeCreateManyArticleInput[]
    skipDuplicates?: boolean
  }

  export type ArticleFavoriteCreateWithoutArticleInput = {
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutArticleFavoritesInput
  }

  export type ArticleFavoriteUncheckedCreateWithoutArticleInput = {
    id?: number
    userId: number
    createdAt?: Date | string
  }

  export type ArticleFavoriteCreateOrConnectWithoutArticleInput = {
    where: ArticleFavoriteWhereUniqueInput
    create: XOR<ArticleFavoriteCreateWithoutArticleInput, ArticleFavoriteUncheckedCreateWithoutArticleInput>
  }

  export type ArticleFavoriteCreateManyArticleInputEnvelope = {
    data: ArticleFavoriteCreateManyArticleInput | ArticleFavoriteCreateManyArticleInput[]
    skipDuplicates?: boolean
  }

  export type ArticleCategoryUpsertWithoutArticlesInput = {
    update: XOR<ArticleCategoryUpdateWithoutArticlesInput, ArticleCategoryUncheckedUpdateWithoutArticlesInput>
    create: XOR<ArticleCategoryCreateWithoutArticlesInput, ArticleCategoryUncheckedCreateWithoutArticlesInput>
    where?: ArticleCategoryWhereInput
  }

  export type ArticleCategoryUpdateToOneWithWhereWithoutArticlesInput = {
    where?: ArticleCategoryWhereInput
    data: XOR<ArticleCategoryUpdateWithoutArticlesInput, ArticleCategoryUncheckedUpdateWithoutArticlesInput>
  }

  export type ArticleCategoryUpdateWithoutArticlesInput = {
    name?: StringFieldUpdateOperationsInput | string
    sort?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleCategoryUncheckedUpdateWithoutArticlesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    sort?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutArticlesInput = {
    update: XOR<UserUpdateWithoutArticlesInput, UserUncheckedUpdateWithoutArticlesInput>
    create: XOR<UserCreateWithoutArticlesInput, UserUncheckedCreateWithoutArticlesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutArticlesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutArticlesInput, UserUncheckedUpdateWithoutArticlesInput>
  }

  export type UserUpdateWithoutArticlesInput = {
    username?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    favs?: IntFieldUpdateOperationsInput | number
    gender?: StringFieldUpdateOperationsInput | string
    roles?: StringFieldUpdateOperationsInput | string
    avatar?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    regmark?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    isVip?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    posts?: PostUpdateManyWithoutAuthorNestedInput
    comments?: CommentUpdateManyWithoutAuthorNestedInput
    articleComments?: ArticleCommentUpdateManyWithoutUserNestedInput
    articleLikes?: ArticleLikeUpdateManyWithoutUserNestedInput
    articleFavorites?: ArticleFavoriteUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutArticlesInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    favs?: IntFieldUpdateOperationsInput | number
    gender?: StringFieldUpdateOperationsInput | string
    roles?: StringFieldUpdateOperationsInput | string
    avatar?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    regmark?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    isVip?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    posts?: PostUncheckedUpdateManyWithoutAuthorNestedInput
    comments?: CommentUncheckedUpdateManyWithoutAuthorNestedInput
    articleComments?: ArticleCommentUncheckedUpdateManyWithoutUserNestedInput
    articleLikes?: ArticleLikeUncheckedUpdateManyWithoutUserNestedInput
    articleFavorites?: ArticleFavoriteUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ArticleCommentUpsertWithWhereUniqueWithoutArticleInput = {
    where: ArticleCommentWhereUniqueInput
    update: XOR<ArticleCommentUpdateWithoutArticleInput, ArticleCommentUncheckedUpdateWithoutArticleInput>
    create: XOR<ArticleCommentCreateWithoutArticleInput, ArticleCommentUncheckedCreateWithoutArticleInput>
  }

  export type ArticleCommentUpdateWithWhereUniqueWithoutArticleInput = {
    where: ArticleCommentWhereUniqueInput
    data: XOR<ArticleCommentUpdateWithoutArticleInput, ArticleCommentUncheckedUpdateWithoutArticleInput>
  }

  export type ArticleCommentUpdateManyWithWhereWithoutArticleInput = {
    where: ArticleCommentScalarWhereInput
    data: XOR<ArticleCommentUpdateManyMutationInput, ArticleCommentUncheckedUpdateManyWithoutArticleInput>
  }

  export type ArticleCommentScalarWhereInput = {
    AND?: ArticleCommentScalarWhereInput | ArticleCommentScalarWhereInput[]
    OR?: ArticleCommentScalarWhereInput[]
    NOT?: ArticleCommentScalarWhereInput | ArticleCommentScalarWhereInput[]
    id?: IntFilter<"ArticleComment"> | number
    articleId?: IntFilter<"ArticleComment"> | number
    userId?: IntFilter<"ArticleComment"> | number
    parentId?: IntNullableFilter<"ArticleComment"> | number | null
    content?: StringFilter<"ArticleComment"> | string
    createdAt?: DateTimeFilter<"ArticleComment"> | Date | string
    updatedAt?: DateTimeFilter<"ArticleComment"> | Date | string
  }

  export type ArticleLikeUpsertWithWhereUniqueWithoutArticleInput = {
    where: ArticleLikeWhereUniqueInput
    update: XOR<ArticleLikeUpdateWithoutArticleInput, ArticleLikeUncheckedUpdateWithoutArticleInput>
    create: XOR<ArticleLikeCreateWithoutArticleInput, ArticleLikeUncheckedCreateWithoutArticleInput>
  }

  export type ArticleLikeUpdateWithWhereUniqueWithoutArticleInput = {
    where: ArticleLikeWhereUniqueInput
    data: XOR<ArticleLikeUpdateWithoutArticleInput, ArticleLikeUncheckedUpdateWithoutArticleInput>
  }

  export type ArticleLikeUpdateManyWithWhereWithoutArticleInput = {
    where: ArticleLikeScalarWhereInput
    data: XOR<ArticleLikeUpdateManyMutationInput, ArticleLikeUncheckedUpdateManyWithoutArticleInput>
  }

  export type ArticleLikeScalarWhereInput = {
    AND?: ArticleLikeScalarWhereInput | ArticleLikeScalarWhereInput[]
    OR?: ArticleLikeScalarWhereInput[]
    NOT?: ArticleLikeScalarWhereInput | ArticleLikeScalarWhereInput[]
    id?: IntFilter<"ArticleLike"> | number
    userId?: IntFilter<"ArticleLike"> | number
    articleId?: IntFilter<"ArticleLike"> | number
    createdAt?: DateTimeFilter<"ArticleLike"> | Date | string
  }

  export type ArticleFavoriteUpsertWithWhereUniqueWithoutArticleInput = {
    where: ArticleFavoriteWhereUniqueInput
    update: XOR<ArticleFavoriteUpdateWithoutArticleInput, ArticleFavoriteUncheckedUpdateWithoutArticleInput>
    create: XOR<ArticleFavoriteCreateWithoutArticleInput, ArticleFavoriteUncheckedCreateWithoutArticleInput>
  }

  export type ArticleFavoriteUpdateWithWhereUniqueWithoutArticleInput = {
    where: ArticleFavoriteWhereUniqueInput
    data: XOR<ArticleFavoriteUpdateWithoutArticleInput, ArticleFavoriteUncheckedUpdateWithoutArticleInput>
  }

  export type ArticleFavoriteUpdateManyWithWhereWithoutArticleInput = {
    where: ArticleFavoriteScalarWhereInput
    data: XOR<ArticleFavoriteUpdateManyMutationInput, ArticleFavoriteUncheckedUpdateManyWithoutArticleInput>
  }

  export type ArticleFavoriteScalarWhereInput = {
    AND?: ArticleFavoriteScalarWhereInput | ArticleFavoriteScalarWhereInput[]
    OR?: ArticleFavoriteScalarWhereInput[]
    NOT?: ArticleFavoriteScalarWhereInput | ArticleFavoriteScalarWhereInput[]
    id?: IntFilter<"ArticleFavorite"> | number
    userId?: IntFilter<"ArticleFavorite"> | number
    articleId?: IntFilter<"ArticleFavorite"> | number
    createdAt?: DateTimeFilter<"ArticleFavorite"> | Date | string
  }

  export type ArticleCreateWithoutCommentsInput = {
    title: string
    content: string
    coverImage?: string | null
    views?: number
    likesCount?: number
    favCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    category: ArticleCategoryCreateNestedOneWithoutArticlesInput
    author: UserCreateNestedOneWithoutArticlesInput
    likes?: ArticleLikeCreateNestedManyWithoutArticleInput
    favorites?: ArticleFavoriteCreateNestedManyWithoutArticleInput
  }

  export type ArticleUncheckedCreateWithoutCommentsInput = {
    id?: number
    title: string
    content: string
    coverImage?: string | null
    authorId: number
    categoryId: number
    views?: number
    likesCount?: number
    favCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    likes?: ArticleLikeUncheckedCreateNestedManyWithoutArticleInput
    favorites?: ArticleFavoriteUncheckedCreateNestedManyWithoutArticleInput
  }

  export type ArticleCreateOrConnectWithoutCommentsInput = {
    where: ArticleWhereUniqueInput
    create: XOR<ArticleCreateWithoutCommentsInput, ArticleUncheckedCreateWithoutCommentsInput>
  }

  export type UserCreateWithoutArticleCommentsInput = {
    username: string
    phone: string
    nickname?: string
    password: string
    email?: string
    favs?: number
    gender?: string
    roles?: string
    avatar?: string
    status?: string
    regmark?: string
    location?: string
    isVip?: string
    count?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    posts?: PostCreateNestedManyWithoutAuthorInput
    comments?: CommentCreateNestedManyWithoutAuthorInput
    articles?: ArticleCreateNestedManyWithoutAuthorInput
    articleLikes?: ArticleLikeCreateNestedManyWithoutUserInput
    articleFavorites?: ArticleFavoriteCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutArticleCommentsInput = {
    id?: number
    username: string
    phone: string
    nickname?: string
    password: string
    email?: string
    favs?: number
    gender?: string
    roles?: string
    avatar?: string
    status?: string
    regmark?: string
    location?: string
    isVip?: string
    count?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    posts?: PostUncheckedCreateNestedManyWithoutAuthorInput
    comments?: CommentUncheckedCreateNestedManyWithoutAuthorInput
    articles?: ArticleUncheckedCreateNestedManyWithoutAuthorInput
    articleLikes?: ArticleLikeUncheckedCreateNestedManyWithoutUserInput
    articleFavorites?: ArticleFavoriteUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutArticleCommentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutArticleCommentsInput, UserUncheckedCreateWithoutArticleCommentsInput>
  }

  export type ArticleCommentCreateWithoutRepliesInput = {
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    article: ArticleCreateNestedOneWithoutCommentsInput
    user: UserCreateNestedOneWithoutArticleCommentsInput
    parent?: ArticleCommentCreateNestedOneWithoutRepliesInput
  }

  export type ArticleCommentUncheckedCreateWithoutRepliesInput = {
    id?: number
    articleId: number
    userId: number
    parentId?: number | null
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArticleCommentCreateOrConnectWithoutRepliesInput = {
    where: ArticleCommentWhereUniqueInput
    create: XOR<ArticleCommentCreateWithoutRepliesInput, ArticleCommentUncheckedCreateWithoutRepliesInput>
  }

  export type ArticleCommentCreateWithoutParentInput = {
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    article: ArticleCreateNestedOneWithoutCommentsInput
    user: UserCreateNestedOneWithoutArticleCommentsInput
    replies?: ArticleCommentCreateNestedManyWithoutParentInput
  }

  export type ArticleCommentUncheckedCreateWithoutParentInput = {
    id?: number
    articleId: number
    userId: number
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    replies?: ArticleCommentUncheckedCreateNestedManyWithoutParentInput
  }

  export type ArticleCommentCreateOrConnectWithoutParentInput = {
    where: ArticleCommentWhereUniqueInput
    create: XOR<ArticleCommentCreateWithoutParentInput, ArticleCommentUncheckedCreateWithoutParentInput>
  }

  export type ArticleCommentCreateManyParentInputEnvelope = {
    data: ArticleCommentCreateManyParentInput | ArticleCommentCreateManyParentInput[]
    skipDuplicates?: boolean
  }

  export type ArticleUpsertWithoutCommentsInput = {
    update: XOR<ArticleUpdateWithoutCommentsInput, ArticleUncheckedUpdateWithoutCommentsInput>
    create: XOR<ArticleCreateWithoutCommentsInput, ArticleUncheckedCreateWithoutCommentsInput>
    where?: ArticleWhereInput
  }

  export type ArticleUpdateToOneWithWhereWithoutCommentsInput = {
    where?: ArticleWhereInput
    data: XOR<ArticleUpdateWithoutCommentsInput, ArticleUncheckedUpdateWithoutCommentsInput>
  }

  export type ArticleUpdateWithoutCommentsInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    views?: IntFieldUpdateOperationsInput | number
    likesCount?: IntFieldUpdateOperationsInput | number
    favCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: ArticleCategoryUpdateOneRequiredWithoutArticlesNestedInput
    author?: UserUpdateOneRequiredWithoutArticlesNestedInput
    likes?: ArticleLikeUpdateManyWithoutArticleNestedInput
    favorites?: ArticleFavoriteUpdateManyWithoutArticleNestedInput
  }

  export type ArticleUncheckedUpdateWithoutCommentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    authorId?: IntFieldUpdateOperationsInput | number
    categoryId?: IntFieldUpdateOperationsInput | number
    views?: IntFieldUpdateOperationsInput | number
    likesCount?: IntFieldUpdateOperationsInput | number
    favCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    likes?: ArticleLikeUncheckedUpdateManyWithoutArticleNestedInput
    favorites?: ArticleFavoriteUncheckedUpdateManyWithoutArticleNestedInput
  }

  export type UserUpsertWithoutArticleCommentsInput = {
    update: XOR<UserUpdateWithoutArticleCommentsInput, UserUncheckedUpdateWithoutArticleCommentsInput>
    create: XOR<UserCreateWithoutArticleCommentsInput, UserUncheckedCreateWithoutArticleCommentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutArticleCommentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutArticleCommentsInput, UserUncheckedUpdateWithoutArticleCommentsInput>
  }

  export type UserUpdateWithoutArticleCommentsInput = {
    username?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    favs?: IntFieldUpdateOperationsInput | number
    gender?: StringFieldUpdateOperationsInput | string
    roles?: StringFieldUpdateOperationsInput | string
    avatar?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    regmark?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    isVip?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    posts?: PostUpdateManyWithoutAuthorNestedInput
    comments?: CommentUpdateManyWithoutAuthorNestedInput
    articles?: ArticleUpdateManyWithoutAuthorNestedInput
    articleLikes?: ArticleLikeUpdateManyWithoutUserNestedInput
    articleFavorites?: ArticleFavoriteUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutArticleCommentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    favs?: IntFieldUpdateOperationsInput | number
    gender?: StringFieldUpdateOperationsInput | string
    roles?: StringFieldUpdateOperationsInput | string
    avatar?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    regmark?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    isVip?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    posts?: PostUncheckedUpdateManyWithoutAuthorNestedInput
    comments?: CommentUncheckedUpdateManyWithoutAuthorNestedInput
    articles?: ArticleUncheckedUpdateManyWithoutAuthorNestedInput
    articleLikes?: ArticleLikeUncheckedUpdateManyWithoutUserNestedInput
    articleFavorites?: ArticleFavoriteUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ArticleCommentUpsertWithoutRepliesInput = {
    update: XOR<ArticleCommentUpdateWithoutRepliesInput, ArticleCommentUncheckedUpdateWithoutRepliesInput>
    create: XOR<ArticleCommentCreateWithoutRepliesInput, ArticleCommentUncheckedCreateWithoutRepliesInput>
    where?: ArticleCommentWhereInput
  }

  export type ArticleCommentUpdateToOneWithWhereWithoutRepliesInput = {
    where?: ArticleCommentWhereInput
    data: XOR<ArticleCommentUpdateWithoutRepliesInput, ArticleCommentUncheckedUpdateWithoutRepliesInput>
  }

  export type ArticleCommentUpdateWithoutRepliesInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    article?: ArticleUpdateOneRequiredWithoutCommentsNestedInput
    user?: UserUpdateOneRequiredWithoutArticleCommentsNestedInput
    parent?: ArticleCommentUpdateOneWithoutRepliesNestedInput
  }

  export type ArticleCommentUncheckedUpdateWithoutRepliesInput = {
    id?: IntFieldUpdateOperationsInput | number
    articleId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleCommentUpsertWithWhereUniqueWithoutParentInput = {
    where: ArticleCommentWhereUniqueInput
    update: XOR<ArticleCommentUpdateWithoutParentInput, ArticleCommentUncheckedUpdateWithoutParentInput>
    create: XOR<ArticleCommentCreateWithoutParentInput, ArticleCommentUncheckedCreateWithoutParentInput>
  }

  export type ArticleCommentUpdateWithWhereUniqueWithoutParentInput = {
    where: ArticleCommentWhereUniqueInput
    data: XOR<ArticleCommentUpdateWithoutParentInput, ArticleCommentUncheckedUpdateWithoutParentInput>
  }

  export type ArticleCommentUpdateManyWithWhereWithoutParentInput = {
    where: ArticleCommentScalarWhereInput
    data: XOR<ArticleCommentUpdateManyMutationInput, ArticleCommentUncheckedUpdateManyWithoutParentInput>
  }

  export type UserCreateWithoutArticleLikesInput = {
    username: string
    phone: string
    nickname?: string
    password: string
    email?: string
    favs?: number
    gender?: string
    roles?: string
    avatar?: string
    status?: string
    regmark?: string
    location?: string
    isVip?: string
    count?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    posts?: PostCreateNestedManyWithoutAuthorInput
    comments?: CommentCreateNestedManyWithoutAuthorInput
    articles?: ArticleCreateNestedManyWithoutAuthorInput
    articleComments?: ArticleCommentCreateNestedManyWithoutUserInput
    articleFavorites?: ArticleFavoriteCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutArticleLikesInput = {
    id?: number
    username: string
    phone: string
    nickname?: string
    password: string
    email?: string
    favs?: number
    gender?: string
    roles?: string
    avatar?: string
    status?: string
    regmark?: string
    location?: string
    isVip?: string
    count?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    posts?: PostUncheckedCreateNestedManyWithoutAuthorInput
    comments?: CommentUncheckedCreateNestedManyWithoutAuthorInput
    articles?: ArticleUncheckedCreateNestedManyWithoutAuthorInput
    articleComments?: ArticleCommentUncheckedCreateNestedManyWithoutUserInput
    articleFavorites?: ArticleFavoriteUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutArticleLikesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutArticleLikesInput, UserUncheckedCreateWithoutArticleLikesInput>
  }

  export type ArticleCreateWithoutLikesInput = {
    title: string
    content: string
    coverImage?: string | null
    views?: number
    likesCount?: number
    favCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    category: ArticleCategoryCreateNestedOneWithoutArticlesInput
    author: UserCreateNestedOneWithoutArticlesInput
    comments?: ArticleCommentCreateNestedManyWithoutArticleInput
    favorites?: ArticleFavoriteCreateNestedManyWithoutArticleInput
  }

  export type ArticleUncheckedCreateWithoutLikesInput = {
    id?: number
    title: string
    content: string
    coverImage?: string | null
    authorId: number
    categoryId: number
    views?: number
    likesCount?: number
    favCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    comments?: ArticleCommentUncheckedCreateNestedManyWithoutArticleInput
    favorites?: ArticleFavoriteUncheckedCreateNestedManyWithoutArticleInput
  }

  export type ArticleCreateOrConnectWithoutLikesInput = {
    where: ArticleWhereUniqueInput
    create: XOR<ArticleCreateWithoutLikesInput, ArticleUncheckedCreateWithoutLikesInput>
  }

  export type UserUpsertWithoutArticleLikesInput = {
    update: XOR<UserUpdateWithoutArticleLikesInput, UserUncheckedUpdateWithoutArticleLikesInput>
    create: XOR<UserCreateWithoutArticleLikesInput, UserUncheckedCreateWithoutArticleLikesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutArticleLikesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutArticleLikesInput, UserUncheckedUpdateWithoutArticleLikesInput>
  }

  export type UserUpdateWithoutArticleLikesInput = {
    username?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    favs?: IntFieldUpdateOperationsInput | number
    gender?: StringFieldUpdateOperationsInput | string
    roles?: StringFieldUpdateOperationsInput | string
    avatar?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    regmark?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    isVip?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    posts?: PostUpdateManyWithoutAuthorNestedInput
    comments?: CommentUpdateManyWithoutAuthorNestedInput
    articles?: ArticleUpdateManyWithoutAuthorNestedInput
    articleComments?: ArticleCommentUpdateManyWithoutUserNestedInput
    articleFavorites?: ArticleFavoriteUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutArticleLikesInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    favs?: IntFieldUpdateOperationsInput | number
    gender?: StringFieldUpdateOperationsInput | string
    roles?: StringFieldUpdateOperationsInput | string
    avatar?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    regmark?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    isVip?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    posts?: PostUncheckedUpdateManyWithoutAuthorNestedInput
    comments?: CommentUncheckedUpdateManyWithoutAuthorNestedInput
    articles?: ArticleUncheckedUpdateManyWithoutAuthorNestedInput
    articleComments?: ArticleCommentUncheckedUpdateManyWithoutUserNestedInput
    articleFavorites?: ArticleFavoriteUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ArticleUpsertWithoutLikesInput = {
    update: XOR<ArticleUpdateWithoutLikesInput, ArticleUncheckedUpdateWithoutLikesInput>
    create: XOR<ArticleCreateWithoutLikesInput, ArticleUncheckedCreateWithoutLikesInput>
    where?: ArticleWhereInput
  }

  export type ArticleUpdateToOneWithWhereWithoutLikesInput = {
    where?: ArticleWhereInput
    data: XOR<ArticleUpdateWithoutLikesInput, ArticleUncheckedUpdateWithoutLikesInput>
  }

  export type ArticleUpdateWithoutLikesInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    views?: IntFieldUpdateOperationsInput | number
    likesCount?: IntFieldUpdateOperationsInput | number
    favCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: ArticleCategoryUpdateOneRequiredWithoutArticlesNestedInput
    author?: UserUpdateOneRequiredWithoutArticlesNestedInput
    comments?: ArticleCommentUpdateManyWithoutArticleNestedInput
    favorites?: ArticleFavoriteUpdateManyWithoutArticleNestedInput
  }

  export type ArticleUncheckedUpdateWithoutLikesInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    authorId?: IntFieldUpdateOperationsInput | number
    categoryId?: IntFieldUpdateOperationsInput | number
    views?: IntFieldUpdateOperationsInput | number
    likesCount?: IntFieldUpdateOperationsInput | number
    favCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: ArticleCommentUncheckedUpdateManyWithoutArticleNestedInput
    favorites?: ArticleFavoriteUncheckedUpdateManyWithoutArticleNestedInput
  }

  export type UserCreateWithoutArticleFavoritesInput = {
    username: string
    phone: string
    nickname?: string
    password: string
    email?: string
    favs?: number
    gender?: string
    roles?: string
    avatar?: string
    status?: string
    regmark?: string
    location?: string
    isVip?: string
    count?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    posts?: PostCreateNestedManyWithoutAuthorInput
    comments?: CommentCreateNestedManyWithoutAuthorInput
    articles?: ArticleCreateNestedManyWithoutAuthorInput
    articleComments?: ArticleCommentCreateNestedManyWithoutUserInput
    articleLikes?: ArticleLikeCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutArticleFavoritesInput = {
    id?: number
    username: string
    phone: string
    nickname?: string
    password: string
    email?: string
    favs?: number
    gender?: string
    roles?: string
    avatar?: string
    status?: string
    regmark?: string
    location?: string
    isVip?: string
    count?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    posts?: PostUncheckedCreateNestedManyWithoutAuthorInput
    comments?: CommentUncheckedCreateNestedManyWithoutAuthorInput
    articles?: ArticleUncheckedCreateNestedManyWithoutAuthorInput
    articleComments?: ArticleCommentUncheckedCreateNestedManyWithoutUserInput
    articleLikes?: ArticleLikeUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutArticleFavoritesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutArticleFavoritesInput, UserUncheckedCreateWithoutArticleFavoritesInput>
  }

  export type ArticleCreateWithoutFavoritesInput = {
    title: string
    content: string
    coverImage?: string | null
    views?: number
    likesCount?: number
    favCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    category: ArticleCategoryCreateNestedOneWithoutArticlesInput
    author: UserCreateNestedOneWithoutArticlesInput
    comments?: ArticleCommentCreateNestedManyWithoutArticleInput
    likes?: ArticleLikeCreateNestedManyWithoutArticleInput
  }

  export type ArticleUncheckedCreateWithoutFavoritesInput = {
    id?: number
    title: string
    content: string
    coverImage?: string | null
    authorId: number
    categoryId: number
    views?: number
    likesCount?: number
    favCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    comments?: ArticleCommentUncheckedCreateNestedManyWithoutArticleInput
    likes?: ArticleLikeUncheckedCreateNestedManyWithoutArticleInput
  }

  export type ArticleCreateOrConnectWithoutFavoritesInput = {
    where: ArticleWhereUniqueInput
    create: XOR<ArticleCreateWithoutFavoritesInput, ArticleUncheckedCreateWithoutFavoritesInput>
  }

  export type UserUpsertWithoutArticleFavoritesInput = {
    update: XOR<UserUpdateWithoutArticleFavoritesInput, UserUncheckedUpdateWithoutArticleFavoritesInput>
    create: XOR<UserCreateWithoutArticleFavoritesInput, UserUncheckedCreateWithoutArticleFavoritesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutArticleFavoritesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutArticleFavoritesInput, UserUncheckedUpdateWithoutArticleFavoritesInput>
  }

  export type UserUpdateWithoutArticleFavoritesInput = {
    username?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    favs?: IntFieldUpdateOperationsInput | number
    gender?: StringFieldUpdateOperationsInput | string
    roles?: StringFieldUpdateOperationsInput | string
    avatar?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    regmark?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    isVip?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    posts?: PostUpdateManyWithoutAuthorNestedInput
    comments?: CommentUpdateManyWithoutAuthorNestedInput
    articles?: ArticleUpdateManyWithoutAuthorNestedInput
    articleComments?: ArticleCommentUpdateManyWithoutUserNestedInput
    articleLikes?: ArticleLikeUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutArticleFavoritesInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    favs?: IntFieldUpdateOperationsInput | number
    gender?: StringFieldUpdateOperationsInput | string
    roles?: StringFieldUpdateOperationsInput | string
    avatar?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    regmark?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    isVip?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    posts?: PostUncheckedUpdateManyWithoutAuthorNestedInput
    comments?: CommentUncheckedUpdateManyWithoutAuthorNestedInput
    articles?: ArticleUncheckedUpdateManyWithoutAuthorNestedInput
    articleComments?: ArticleCommentUncheckedUpdateManyWithoutUserNestedInput
    articleLikes?: ArticleLikeUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ArticleUpsertWithoutFavoritesInput = {
    update: XOR<ArticleUpdateWithoutFavoritesInput, ArticleUncheckedUpdateWithoutFavoritesInput>
    create: XOR<ArticleCreateWithoutFavoritesInput, ArticleUncheckedCreateWithoutFavoritesInput>
    where?: ArticleWhereInput
  }

  export type ArticleUpdateToOneWithWhereWithoutFavoritesInput = {
    where?: ArticleWhereInput
    data: XOR<ArticleUpdateWithoutFavoritesInput, ArticleUncheckedUpdateWithoutFavoritesInput>
  }

  export type ArticleUpdateWithoutFavoritesInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    views?: IntFieldUpdateOperationsInput | number
    likesCount?: IntFieldUpdateOperationsInput | number
    favCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: ArticleCategoryUpdateOneRequiredWithoutArticlesNestedInput
    author?: UserUpdateOneRequiredWithoutArticlesNestedInput
    comments?: ArticleCommentUpdateManyWithoutArticleNestedInput
    likes?: ArticleLikeUpdateManyWithoutArticleNestedInput
  }

  export type ArticleUncheckedUpdateWithoutFavoritesInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    authorId?: IntFieldUpdateOperationsInput | number
    categoryId?: IntFieldUpdateOperationsInput | number
    views?: IntFieldUpdateOperationsInput | number
    likesCount?: IntFieldUpdateOperationsInput | number
    favCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: ArticleCommentUncheckedUpdateManyWithoutArticleNestedInput
    likes?: ArticleLikeUncheckedUpdateManyWithoutArticleNestedInput
  }

  export type PostCreateWithoutAuthorInput = {
    title: string
    content: string
    published?: boolean
    viewCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    comments?: CommentCreateNestedManyWithoutPostInput
    categories?: CategoryCreateNestedManyWithoutPostsInput
  }

  export type PostUncheckedCreateWithoutAuthorInput = {
    id?: number
    title: string
    content: string
    published?: boolean
    viewCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    comments?: CommentUncheckedCreateNestedManyWithoutPostInput
    categories?: CategoryUncheckedCreateNestedManyWithoutPostsInput
  }

  export type PostCreateOrConnectWithoutAuthorInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutAuthorInput, PostUncheckedCreateWithoutAuthorInput>
  }

  export type PostCreateManyAuthorInputEnvelope = {
    data: PostCreateManyAuthorInput | PostCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type CommentCreateWithoutAuthorInput = {
    content: string
    hands?: number
    status?: string
    isRead?: string
    isBest?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    post: PostCreateNestedOneWithoutCommentsInput
  }

  export type CommentUncheckedCreateWithoutAuthorInput = {
    id?: number
    content: string
    postId: number
    hands?: number
    status?: string
    isRead?: string
    isBest?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CommentCreateOrConnectWithoutAuthorInput = {
    where: CommentWhereUniqueInput
    create: XOR<CommentCreateWithoutAuthorInput, CommentUncheckedCreateWithoutAuthorInput>
  }

  export type CommentCreateManyAuthorInputEnvelope = {
    data: CommentCreateManyAuthorInput | CommentCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type ArticleCreateWithoutAuthorInput = {
    title: string
    content: string
    coverImage?: string | null
    views?: number
    likesCount?: number
    favCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    category: ArticleCategoryCreateNestedOneWithoutArticlesInput
    comments?: ArticleCommentCreateNestedManyWithoutArticleInput
    likes?: ArticleLikeCreateNestedManyWithoutArticleInput
    favorites?: ArticleFavoriteCreateNestedManyWithoutArticleInput
  }

  export type ArticleUncheckedCreateWithoutAuthorInput = {
    id?: number
    title: string
    content: string
    coverImage?: string | null
    categoryId: number
    views?: number
    likesCount?: number
    favCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    comments?: ArticleCommentUncheckedCreateNestedManyWithoutArticleInput
    likes?: ArticleLikeUncheckedCreateNestedManyWithoutArticleInput
    favorites?: ArticleFavoriteUncheckedCreateNestedManyWithoutArticleInput
  }

  export type ArticleCreateOrConnectWithoutAuthorInput = {
    where: ArticleWhereUniqueInput
    create: XOR<ArticleCreateWithoutAuthorInput, ArticleUncheckedCreateWithoutAuthorInput>
  }

  export type ArticleCreateManyAuthorInputEnvelope = {
    data: ArticleCreateManyAuthorInput | ArticleCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type ArticleCommentCreateWithoutUserInput = {
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    article: ArticleCreateNestedOneWithoutCommentsInput
    parent?: ArticleCommentCreateNestedOneWithoutRepliesInput
    replies?: ArticleCommentCreateNestedManyWithoutParentInput
  }

  export type ArticleCommentUncheckedCreateWithoutUserInput = {
    id?: number
    articleId: number
    parentId?: number | null
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    replies?: ArticleCommentUncheckedCreateNestedManyWithoutParentInput
  }

  export type ArticleCommentCreateOrConnectWithoutUserInput = {
    where: ArticleCommentWhereUniqueInput
    create: XOR<ArticleCommentCreateWithoutUserInput, ArticleCommentUncheckedCreateWithoutUserInput>
  }

  export type ArticleCommentCreateManyUserInputEnvelope = {
    data: ArticleCommentCreateManyUserInput | ArticleCommentCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ArticleLikeCreateWithoutUserInput = {
    createdAt?: Date | string
    article: ArticleCreateNestedOneWithoutLikesInput
  }

  export type ArticleLikeUncheckedCreateWithoutUserInput = {
    id?: number
    articleId: number
    createdAt?: Date | string
  }

  export type ArticleLikeCreateOrConnectWithoutUserInput = {
    where: ArticleLikeWhereUniqueInput
    create: XOR<ArticleLikeCreateWithoutUserInput, ArticleLikeUncheckedCreateWithoutUserInput>
  }

  export type ArticleLikeCreateManyUserInputEnvelope = {
    data: ArticleLikeCreateManyUserInput | ArticleLikeCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ArticleFavoriteCreateWithoutUserInput = {
    createdAt?: Date | string
    article: ArticleCreateNestedOneWithoutFavoritesInput
  }

  export type ArticleFavoriteUncheckedCreateWithoutUserInput = {
    id?: number
    articleId: number
    createdAt?: Date | string
  }

  export type ArticleFavoriteCreateOrConnectWithoutUserInput = {
    where: ArticleFavoriteWhereUniqueInput
    create: XOR<ArticleFavoriteCreateWithoutUserInput, ArticleFavoriteUncheckedCreateWithoutUserInput>
  }

  export type ArticleFavoriteCreateManyUserInputEnvelope = {
    data: ArticleFavoriteCreateManyUserInput | ArticleFavoriteCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PostUpsertWithWhereUniqueWithoutAuthorInput = {
    where: PostWhereUniqueInput
    update: XOR<PostUpdateWithoutAuthorInput, PostUncheckedUpdateWithoutAuthorInput>
    create: XOR<PostCreateWithoutAuthorInput, PostUncheckedCreateWithoutAuthorInput>
  }

  export type PostUpdateWithWhereUniqueWithoutAuthorInput = {
    where: PostWhereUniqueInput
    data: XOR<PostUpdateWithoutAuthorInput, PostUncheckedUpdateWithoutAuthorInput>
  }

  export type PostUpdateManyWithWhereWithoutAuthorInput = {
    where: PostScalarWhereInput
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyWithoutAuthorInput>
  }

  export type PostScalarWhereInput = {
    AND?: PostScalarWhereInput | PostScalarWhereInput[]
    OR?: PostScalarWhereInput[]
    NOT?: PostScalarWhereInput | PostScalarWhereInput[]
    id?: IntFilter<"Post"> | number
    title?: StringFilter<"Post"> | string
    content?: StringFilter<"Post"> | string
    published?: BoolFilter<"Post"> | boolean
    viewCount?: IntFilter<"Post"> | number
    createdAt?: DateTimeFilter<"Post"> | Date | string
    updatedAt?: DateTimeFilter<"Post"> | Date | string
    authorId?: IntFilter<"Post"> | number
  }

  export type CommentUpsertWithWhereUniqueWithoutAuthorInput = {
    where: CommentWhereUniqueInput
    update: XOR<CommentUpdateWithoutAuthorInput, CommentUncheckedUpdateWithoutAuthorInput>
    create: XOR<CommentCreateWithoutAuthorInput, CommentUncheckedCreateWithoutAuthorInput>
  }

  export type CommentUpdateWithWhereUniqueWithoutAuthorInput = {
    where: CommentWhereUniqueInput
    data: XOR<CommentUpdateWithoutAuthorInput, CommentUncheckedUpdateWithoutAuthorInput>
  }

  export type CommentUpdateManyWithWhereWithoutAuthorInput = {
    where: CommentScalarWhereInput
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyWithoutAuthorInput>
  }

  export type CommentScalarWhereInput = {
    AND?: CommentScalarWhereInput | CommentScalarWhereInput[]
    OR?: CommentScalarWhereInput[]
    NOT?: CommentScalarWhereInput | CommentScalarWhereInput[]
    id?: IntFilter<"Comment"> | number
    content?: StringFilter<"Comment"> | string
    postId?: IntFilter<"Comment"> | number
    authorId?: IntFilter<"Comment"> | number
    hands?: IntFilter<"Comment"> | number
    status?: StringFilter<"Comment"> | string
    isRead?: StringFilter<"Comment"> | string
    isBest?: StringFilter<"Comment"> | string
    createdAt?: DateTimeFilter<"Comment"> | Date | string
    updatedAt?: DateTimeFilter<"Comment"> | Date | string
  }

  export type ArticleUpsertWithWhereUniqueWithoutAuthorInput = {
    where: ArticleWhereUniqueInput
    update: XOR<ArticleUpdateWithoutAuthorInput, ArticleUncheckedUpdateWithoutAuthorInput>
    create: XOR<ArticleCreateWithoutAuthorInput, ArticleUncheckedCreateWithoutAuthorInput>
  }

  export type ArticleUpdateWithWhereUniqueWithoutAuthorInput = {
    where: ArticleWhereUniqueInput
    data: XOR<ArticleUpdateWithoutAuthorInput, ArticleUncheckedUpdateWithoutAuthorInput>
  }

  export type ArticleUpdateManyWithWhereWithoutAuthorInput = {
    where: ArticleScalarWhereInput
    data: XOR<ArticleUpdateManyMutationInput, ArticleUncheckedUpdateManyWithoutAuthorInput>
  }

  export type ArticleCommentUpsertWithWhereUniqueWithoutUserInput = {
    where: ArticleCommentWhereUniqueInput
    update: XOR<ArticleCommentUpdateWithoutUserInput, ArticleCommentUncheckedUpdateWithoutUserInput>
    create: XOR<ArticleCommentCreateWithoutUserInput, ArticleCommentUncheckedCreateWithoutUserInput>
  }

  export type ArticleCommentUpdateWithWhereUniqueWithoutUserInput = {
    where: ArticleCommentWhereUniqueInput
    data: XOR<ArticleCommentUpdateWithoutUserInput, ArticleCommentUncheckedUpdateWithoutUserInput>
  }

  export type ArticleCommentUpdateManyWithWhereWithoutUserInput = {
    where: ArticleCommentScalarWhereInput
    data: XOR<ArticleCommentUpdateManyMutationInput, ArticleCommentUncheckedUpdateManyWithoutUserInput>
  }

  export type ArticleLikeUpsertWithWhereUniqueWithoutUserInput = {
    where: ArticleLikeWhereUniqueInput
    update: XOR<ArticleLikeUpdateWithoutUserInput, ArticleLikeUncheckedUpdateWithoutUserInput>
    create: XOR<ArticleLikeCreateWithoutUserInput, ArticleLikeUncheckedCreateWithoutUserInput>
  }

  export type ArticleLikeUpdateWithWhereUniqueWithoutUserInput = {
    where: ArticleLikeWhereUniqueInput
    data: XOR<ArticleLikeUpdateWithoutUserInput, ArticleLikeUncheckedUpdateWithoutUserInput>
  }

  export type ArticleLikeUpdateManyWithWhereWithoutUserInput = {
    where: ArticleLikeScalarWhereInput
    data: XOR<ArticleLikeUpdateManyMutationInput, ArticleLikeUncheckedUpdateManyWithoutUserInput>
  }

  export type ArticleFavoriteUpsertWithWhereUniqueWithoutUserInput = {
    where: ArticleFavoriteWhereUniqueInput
    update: XOR<ArticleFavoriteUpdateWithoutUserInput, ArticleFavoriteUncheckedUpdateWithoutUserInput>
    create: XOR<ArticleFavoriteCreateWithoutUserInput, ArticleFavoriteUncheckedCreateWithoutUserInput>
  }

  export type ArticleFavoriteUpdateWithWhereUniqueWithoutUserInput = {
    where: ArticleFavoriteWhereUniqueInput
    data: XOR<ArticleFavoriteUpdateWithoutUserInput, ArticleFavoriteUncheckedUpdateWithoutUserInput>
  }

  export type ArticleFavoriteUpdateManyWithWhereWithoutUserInput = {
    where: ArticleFavoriteScalarWhereInput
    data: XOR<ArticleFavoriteUpdateManyMutationInput, ArticleFavoriteUncheckedUpdateManyWithoutUserInput>
  }

  export type PostCreateWithoutCommentsInput = {
    title: string
    content: string
    published?: boolean
    viewCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    author: UserCreateNestedOneWithoutPostsInput
    categories?: CategoryCreateNestedManyWithoutPostsInput
  }

  export type PostUncheckedCreateWithoutCommentsInput = {
    id?: number
    title: string
    content: string
    published?: boolean
    viewCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    authorId: number
    categories?: CategoryUncheckedCreateNestedManyWithoutPostsInput
  }

  export type PostCreateOrConnectWithoutCommentsInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutCommentsInput, PostUncheckedCreateWithoutCommentsInput>
  }

  export type UserCreateWithoutCommentsInput = {
    username: string
    phone: string
    nickname?: string
    password: string
    email?: string
    favs?: number
    gender?: string
    roles?: string
    avatar?: string
    status?: string
    regmark?: string
    location?: string
    isVip?: string
    count?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    posts?: PostCreateNestedManyWithoutAuthorInput
    articles?: ArticleCreateNestedManyWithoutAuthorInput
    articleComments?: ArticleCommentCreateNestedManyWithoutUserInput
    articleLikes?: ArticleLikeCreateNestedManyWithoutUserInput
    articleFavorites?: ArticleFavoriteCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCommentsInput = {
    id?: number
    username: string
    phone: string
    nickname?: string
    password: string
    email?: string
    favs?: number
    gender?: string
    roles?: string
    avatar?: string
    status?: string
    regmark?: string
    location?: string
    isVip?: string
    count?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    posts?: PostUncheckedCreateNestedManyWithoutAuthorInput
    articles?: ArticleUncheckedCreateNestedManyWithoutAuthorInput
    articleComments?: ArticleCommentUncheckedCreateNestedManyWithoutUserInput
    articleLikes?: ArticleLikeUncheckedCreateNestedManyWithoutUserInput
    articleFavorites?: ArticleFavoriteUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCommentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
  }

  export type PostUpsertWithoutCommentsInput = {
    update: XOR<PostUpdateWithoutCommentsInput, PostUncheckedUpdateWithoutCommentsInput>
    create: XOR<PostCreateWithoutCommentsInput, PostUncheckedCreateWithoutCommentsInput>
    where?: PostWhereInput
  }

  export type PostUpdateToOneWithWhereWithoutCommentsInput = {
    where?: PostWhereInput
    data: XOR<PostUpdateWithoutCommentsInput, PostUncheckedUpdateWithoutCommentsInput>
  }

  export type PostUpdateWithoutCommentsInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    viewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneRequiredWithoutPostsNestedInput
    categories?: CategoryUpdateManyWithoutPostsNestedInput
  }

  export type PostUncheckedUpdateWithoutCommentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    viewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorId?: IntFieldUpdateOperationsInput | number
    categories?: CategoryUncheckedUpdateManyWithoutPostsNestedInput
  }

  export type UserUpsertWithoutCommentsInput = {
    update: XOR<UserUpdateWithoutCommentsInput, UserUncheckedUpdateWithoutCommentsInput>
    create: XOR<UserCreateWithoutCommentsInput, UserUncheckedCreateWithoutCommentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCommentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCommentsInput, UserUncheckedUpdateWithoutCommentsInput>
  }

  export type UserUpdateWithoutCommentsInput = {
    username?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    favs?: IntFieldUpdateOperationsInput | number
    gender?: StringFieldUpdateOperationsInput | string
    roles?: StringFieldUpdateOperationsInput | string
    avatar?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    regmark?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    isVip?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    posts?: PostUpdateManyWithoutAuthorNestedInput
    articles?: ArticleUpdateManyWithoutAuthorNestedInput
    articleComments?: ArticleCommentUpdateManyWithoutUserNestedInput
    articleLikes?: ArticleLikeUpdateManyWithoutUserNestedInput
    articleFavorites?: ArticleFavoriteUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCommentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    favs?: IntFieldUpdateOperationsInput | number
    gender?: StringFieldUpdateOperationsInput | string
    roles?: StringFieldUpdateOperationsInput | string
    avatar?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    regmark?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    isVip?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    posts?: PostUncheckedUpdateManyWithoutAuthorNestedInput
    articles?: ArticleUncheckedUpdateManyWithoutAuthorNestedInput
    articleComments?: ArticleCommentUncheckedUpdateManyWithoutUserNestedInput
    articleLikes?: ArticleLikeUncheckedUpdateManyWithoutUserNestedInput
    articleFavorites?: ArticleFavoriteUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutPostsInput = {
    username: string
    phone: string
    nickname?: string
    password: string
    email?: string
    favs?: number
    gender?: string
    roles?: string
    avatar?: string
    status?: string
    regmark?: string
    location?: string
    isVip?: string
    count?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    comments?: CommentCreateNestedManyWithoutAuthorInput
    articles?: ArticleCreateNestedManyWithoutAuthorInput
    articleComments?: ArticleCommentCreateNestedManyWithoutUserInput
    articleLikes?: ArticleLikeCreateNestedManyWithoutUserInput
    articleFavorites?: ArticleFavoriteCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPostsInput = {
    id?: number
    username: string
    phone: string
    nickname?: string
    password: string
    email?: string
    favs?: number
    gender?: string
    roles?: string
    avatar?: string
    status?: string
    regmark?: string
    location?: string
    isVip?: string
    count?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    comments?: CommentUncheckedCreateNestedManyWithoutAuthorInput
    articles?: ArticleUncheckedCreateNestedManyWithoutAuthorInput
    articleComments?: ArticleCommentUncheckedCreateNestedManyWithoutUserInput
    articleLikes?: ArticleLikeUncheckedCreateNestedManyWithoutUserInput
    articleFavorites?: ArticleFavoriteUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPostsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
  }

  export type CommentCreateWithoutPostInput = {
    content: string
    hands?: number
    status?: string
    isRead?: string
    isBest?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    author: UserCreateNestedOneWithoutCommentsInput
  }

  export type CommentUncheckedCreateWithoutPostInput = {
    id?: number
    content: string
    authorId: number
    hands?: number
    status?: string
    isRead?: string
    isBest?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CommentCreateOrConnectWithoutPostInput = {
    where: CommentWhereUniqueInput
    create: XOR<CommentCreateWithoutPostInput, CommentUncheckedCreateWithoutPostInput>
  }

  export type CommentCreateManyPostInputEnvelope = {
    data: CommentCreateManyPostInput | CommentCreateManyPostInput[]
    skipDuplicates?: boolean
  }

  export type CategoryCreateWithoutPostsInput = {
    name: string
    sort?: number
  }

  export type CategoryUncheckedCreateWithoutPostsInput = {
    id?: number
    name: string
    sort?: number
  }

  export type CategoryCreateOrConnectWithoutPostsInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutPostsInput, CategoryUncheckedCreateWithoutPostsInput>
  }

  export type UserUpsertWithoutPostsInput = {
    update: XOR<UserUpdateWithoutPostsInput, UserUncheckedUpdateWithoutPostsInput>
    create: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPostsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPostsInput, UserUncheckedUpdateWithoutPostsInput>
  }

  export type UserUpdateWithoutPostsInput = {
    username?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    favs?: IntFieldUpdateOperationsInput | number
    gender?: StringFieldUpdateOperationsInput | string
    roles?: StringFieldUpdateOperationsInput | string
    avatar?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    regmark?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    isVip?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: CommentUpdateManyWithoutAuthorNestedInput
    articles?: ArticleUpdateManyWithoutAuthorNestedInput
    articleComments?: ArticleCommentUpdateManyWithoutUserNestedInput
    articleLikes?: ArticleLikeUpdateManyWithoutUserNestedInput
    articleFavorites?: ArticleFavoriteUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPostsInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    nickname?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    favs?: IntFieldUpdateOperationsInput | number
    gender?: StringFieldUpdateOperationsInput | string
    roles?: StringFieldUpdateOperationsInput | string
    avatar?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    regmark?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    isVip?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: CommentUncheckedUpdateManyWithoutAuthorNestedInput
    articles?: ArticleUncheckedUpdateManyWithoutAuthorNestedInput
    articleComments?: ArticleCommentUncheckedUpdateManyWithoutUserNestedInput
    articleLikes?: ArticleLikeUncheckedUpdateManyWithoutUserNestedInput
    articleFavorites?: ArticleFavoriteUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CommentUpsertWithWhereUniqueWithoutPostInput = {
    where: CommentWhereUniqueInput
    update: XOR<CommentUpdateWithoutPostInput, CommentUncheckedUpdateWithoutPostInput>
    create: XOR<CommentCreateWithoutPostInput, CommentUncheckedCreateWithoutPostInput>
  }

  export type CommentUpdateWithWhereUniqueWithoutPostInput = {
    where: CommentWhereUniqueInput
    data: XOR<CommentUpdateWithoutPostInput, CommentUncheckedUpdateWithoutPostInput>
  }

  export type CommentUpdateManyWithWhereWithoutPostInput = {
    where: CommentScalarWhereInput
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyWithoutPostInput>
  }

  export type CategoryUpsertWithWhereUniqueWithoutPostsInput = {
    where: CategoryWhereUniqueInput
    update: XOR<CategoryUpdateWithoutPostsInput, CategoryUncheckedUpdateWithoutPostsInput>
    create: XOR<CategoryCreateWithoutPostsInput, CategoryUncheckedCreateWithoutPostsInput>
  }

  export type CategoryUpdateWithWhereUniqueWithoutPostsInput = {
    where: CategoryWhereUniqueInput
    data: XOR<CategoryUpdateWithoutPostsInput, CategoryUncheckedUpdateWithoutPostsInput>
  }

  export type CategoryUpdateManyWithWhereWithoutPostsInput = {
    where: CategoryScalarWhereInput
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyWithoutPostsInput>
  }

  export type CategoryScalarWhereInput = {
    AND?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
    OR?: CategoryScalarWhereInput[]
    NOT?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
    id?: IntFilter<"Category"> | number
    name?: StringFilter<"Category"> | string
    sort?: IntFilter<"Category"> | number
  }

  export type PostCreateWithoutCategoriesInput = {
    title: string
    content: string
    published?: boolean
    viewCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    author: UserCreateNestedOneWithoutPostsInput
    comments?: CommentCreateNestedManyWithoutPostInput
  }

  export type PostUncheckedCreateWithoutCategoriesInput = {
    id?: number
    title: string
    content: string
    published?: boolean
    viewCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    authorId: number
    comments?: CommentUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostCreateOrConnectWithoutCategoriesInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutCategoriesInput, PostUncheckedCreateWithoutCategoriesInput>
  }

  export type PostUpsertWithWhereUniqueWithoutCategoriesInput = {
    where: PostWhereUniqueInput
    update: XOR<PostUpdateWithoutCategoriesInput, PostUncheckedUpdateWithoutCategoriesInput>
    create: XOR<PostCreateWithoutCategoriesInput, PostUncheckedCreateWithoutCategoriesInput>
  }

  export type PostUpdateWithWhereUniqueWithoutCategoriesInput = {
    where: PostWhereUniqueInput
    data: XOR<PostUpdateWithoutCategoriesInput, PostUncheckedUpdateWithoutCategoriesInput>
  }

  export type PostUpdateManyWithWhereWithoutCategoriesInput = {
    where: PostScalarWhereInput
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyWithoutCategoriesInput>
  }

  export type ArticleCreateManyCategoryInput = {
    id?: number
    title: string
    content: string
    coverImage?: string | null
    authorId: number
    views?: number
    likesCount?: number
    favCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArticleUpdateWithoutCategoryInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    views?: IntFieldUpdateOperationsInput | number
    likesCount?: IntFieldUpdateOperationsInput | number
    favCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneRequiredWithoutArticlesNestedInput
    comments?: ArticleCommentUpdateManyWithoutArticleNestedInput
    likes?: ArticleLikeUpdateManyWithoutArticleNestedInput
    favorites?: ArticleFavoriteUpdateManyWithoutArticleNestedInput
  }

  export type ArticleUncheckedUpdateWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    authorId?: IntFieldUpdateOperationsInput | number
    views?: IntFieldUpdateOperationsInput | number
    likesCount?: IntFieldUpdateOperationsInput | number
    favCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: ArticleCommentUncheckedUpdateManyWithoutArticleNestedInput
    likes?: ArticleLikeUncheckedUpdateManyWithoutArticleNestedInput
    favorites?: ArticleFavoriteUncheckedUpdateManyWithoutArticleNestedInput
  }

  export type ArticleUncheckedUpdateManyWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    authorId?: IntFieldUpdateOperationsInput | number
    views?: IntFieldUpdateOperationsInput | number
    likesCount?: IntFieldUpdateOperationsInput | number
    favCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleCommentCreateManyArticleInput = {
    id?: number
    userId: number
    parentId?: number | null
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArticleLikeCreateManyArticleInput = {
    id?: number
    userId: number
    createdAt?: Date | string
  }

  export type ArticleFavoriteCreateManyArticleInput = {
    id?: number
    userId: number
    createdAt?: Date | string
  }

  export type ArticleCommentUpdateWithoutArticleInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutArticleCommentsNestedInput
    parent?: ArticleCommentUpdateOneWithoutRepliesNestedInput
    replies?: ArticleCommentUpdateManyWithoutParentNestedInput
  }

  export type ArticleCommentUncheckedUpdateWithoutArticleInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    replies?: ArticleCommentUncheckedUpdateManyWithoutParentNestedInput
  }

  export type ArticleCommentUncheckedUpdateManyWithoutArticleInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleLikeUpdateWithoutArticleInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutArticleLikesNestedInput
  }

  export type ArticleLikeUncheckedUpdateWithoutArticleInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleLikeUncheckedUpdateManyWithoutArticleInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleFavoriteUpdateWithoutArticleInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutArticleFavoritesNestedInput
  }

  export type ArticleFavoriteUncheckedUpdateWithoutArticleInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleFavoriteUncheckedUpdateManyWithoutArticleInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleCommentCreateManyParentInput = {
    id?: number
    articleId: number
    userId: number
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArticleCommentUpdateWithoutParentInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    article?: ArticleUpdateOneRequiredWithoutCommentsNestedInput
    user?: UserUpdateOneRequiredWithoutArticleCommentsNestedInput
    replies?: ArticleCommentUpdateManyWithoutParentNestedInput
  }

  export type ArticleCommentUncheckedUpdateWithoutParentInput = {
    id?: IntFieldUpdateOperationsInput | number
    articleId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    replies?: ArticleCommentUncheckedUpdateManyWithoutParentNestedInput
  }

  export type ArticleCommentUncheckedUpdateManyWithoutParentInput = {
    id?: IntFieldUpdateOperationsInput | number
    articleId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostCreateManyAuthorInput = {
    id?: number
    title: string
    content: string
    published?: boolean
    viewCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CommentCreateManyAuthorInput = {
    id?: number
    content: string
    postId: number
    hands?: number
    status?: string
    isRead?: string
    isBest?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArticleCreateManyAuthorInput = {
    id?: number
    title: string
    content: string
    coverImage?: string | null
    categoryId: number
    views?: number
    likesCount?: number
    favCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArticleCommentCreateManyUserInput = {
    id?: number
    articleId: number
    parentId?: number | null
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArticleLikeCreateManyUserInput = {
    id?: number
    articleId: number
    createdAt?: Date | string
  }

  export type ArticleFavoriteCreateManyUserInput = {
    id?: number
    articleId: number
    createdAt?: Date | string
  }

  export type PostUpdateWithoutAuthorInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    viewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: CommentUpdateManyWithoutPostNestedInput
    categories?: CategoryUpdateManyWithoutPostsNestedInput
  }

  export type PostUncheckedUpdateWithoutAuthorInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    viewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: CommentUncheckedUpdateManyWithoutPostNestedInput
    categories?: CategoryUncheckedUpdateManyWithoutPostsNestedInput
  }

  export type PostUncheckedUpdateManyWithoutAuthorInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    viewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUpdateWithoutAuthorInput = {
    content?: StringFieldUpdateOperationsInput | string
    hands?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    isRead?: StringFieldUpdateOperationsInput | string
    isBest?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: PostUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type CommentUncheckedUpdateWithoutAuthorInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    postId?: IntFieldUpdateOperationsInput | number
    hands?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    isRead?: StringFieldUpdateOperationsInput | string
    isBest?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUncheckedUpdateManyWithoutAuthorInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    postId?: IntFieldUpdateOperationsInput | number
    hands?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    isRead?: StringFieldUpdateOperationsInput | string
    isBest?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleUpdateWithoutAuthorInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    views?: IntFieldUpdateOperationsInput | number
    likesCount?: IntFieldUpdateOperationsInput | number
    favCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: ArticleCategoryUpdateOneRequiredWithoutArticlesNestedInput
    comments?: ArticleCommentUpdateManyWithoutArticleNestedInput
    likes?: ArticleLikeUpdateManyWithoutArticleNestedInput
    favorites?: ArticleFavoriteUpdateManyWithoutArticleNestedInput
  }

  export type ArticleUncheckedUpdateWithoutAuthorInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: IntFieldUpdateOperationsInput | number
    views?: IntFieldUpdateOperationsInput | number
    likesCount?: IntFieldUpdateOperationsInput | number
    favCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: ArticleCommentUncheckedUpdateManyWithoutArticleNestedInput
    likes?: ArticleLikeUncheckedUpdateManyWithoutArticleNestedInput
    favorites?: ArticleFavoriteUncheckedUpdateManyWithoutArticleNestedInput
  }

  export type ArticleUncheckedUpdateManyWithoutAuthorInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: IntFieldUpdateOperationsInput | number
    views?: IntFieldUpdateOperationsInput | number
    likesCount?: IntFieldUpdateOperationsInput | number
    favCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleCommentUpdateWithoutUserInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    article?: ArticleUpdateOneRequiredWithoutCommentsNestedInput
    parent?: ArticleCommentUpdateOneWithoutRepliesNestedInput
    replies?: ArticleCommentUpdateManyWithoutParentNestedInput
  }

  export type ArticleCommentUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    articleId?: IntFieldUpdateOperationsInput | number
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    replies?: ArticleCommentUncheckedUpdateManyWithoutParentNestedInput
  }

  export type ArticleCommentUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    articleId?: IntFieldUpdateOperationsInput | number
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleLikeUpdateWithoutUserInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    article?: ArticleUpdateOneRequiredWithoutLikesNestedInput
  }

  export type ArticleLikeUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    articleId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleLikeUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    articleId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleFavoriteUpdateWithoutUserInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    article?: ArticleUpdateOneRequiredWithoutFavoritesNestedInput
  }

  export type ArticleFavoriteUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    articleId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArticleFavoriteUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    articleId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentCreateManyPostInput = {
    id?: number
    content: string
    authorId: number
    hands?: number
    status?: string
    isRead?: string
    isBest?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CommentUpdateWithoutPostInput = {
    content?: StringFieldUpdateOperationsInput | string
    hands?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    isRead?: StringFieldUpdateOperationsInput | string
    isBest?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type CommentUncheckedUpdateWithoutPostInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    authorId?: IntFieldUpdateOperationsInput | number
    hands?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    isRead?: StringFieldUpdateOperationsInput | string
    isBest?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUncheckedUpdateManyWithoutPostInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    authorId?: IntFieldUpdateOperationsInput | number
    hands?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    isRead?: StringFieldUpdateOperationsInput | string
    isBest?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUpdateWithoutPostsInput = {
    name?: StringFieldUpdateOperationsInput | string
    sort?: IntFieldUpdateOperationsInput | number
  }

  export type CategoryUncheckedUpdateWithoutPostsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    sort?: IntFieldUpdateOperationsInput | number
  }

  export type CategoryUncheckedUpdateManyWithoutPostsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    sort?: IntFieldUpdateOperationsInput | number
  }

  export type PostUpdateWithoutCategoriesInput = {
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    viewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneRequiredWithoutPostsNestedInput
    comments?: CommentUpdateManyWithoutPostNestedInput
  }

  export type PostUncheckedUpdateWithoutCategoriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    viewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorId?: IntFieldUpdateOperationsInput | number
    comments?: CommentUncheckedUpdateManyWithoutPostNestedInput
  }

  export type PostUncheckedUpdateManyWithoutCategoriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    published?: BoolFieldUpdateOperationsInput | boolean
    viewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    authorId?: IntFieldUpdateOperationsInput | number
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