// 3-02. 싱글톤 패턴, Singleton

class Database {
  static #instance = null;
  #connection;

  constructor(connectionString) {
    if (Database.#instance) {
      throw new Error(
        "이미 인스턴스가 존재합니다. getInstance()를 사용하십시오.",
      );
    }
    this.#connection = this.#createConnection(connectionString);
    console.log(`DB 연결 생성: ${connectionString}`);

    Database.#instance = this;
  }

  #createConnection(connectionString) {
    return {
      query(sql) {
        console.log(`[${connectionString}] 쿼리 실행: ${sql}`);
      },
    };
  }

  static getInstance(connectionString) {
    if (Database.#instance === null) {
      new Database(connectionString);
    }
    return Database.#instance;
  }

  query(sql) {
    this.#connection.query(sql);
  }
}

const db1 = Database.getInstance("postgresql://localhost:5432/mydb");
// "DB 연결 생성: postgresql://localhost:5432/mydb"

const db2 = Database.getInstance("postgresql://localhost:5432/mydb");
// 두 번째 호출: DB 연결 생성 메시지가 출력되지 않습니다

console.log(db1 === db2); // true

db1.query("SELECT * FROM users");
// "[postgresql://localhost:5432/mydb] 쿼리 실행: SELECT * FROM users"
