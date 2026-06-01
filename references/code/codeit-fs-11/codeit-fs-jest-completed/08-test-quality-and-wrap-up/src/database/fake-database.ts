export interface DatabaseUserRecord {
  id: number;
  email: string;
  passwordHash: string;
  name: string;
}

export interface DatabaseConfig {
  mode: 'development' | 'test';
  databaseName: string;
}

export const createDatabaseConfig = (): DatabaseConfig => {
  const isTest = process.env.NODE_ENV === 'test';

  return {
    mode: isTest ? 'test' : 'development',
    databaseName: isTest ? 'app_test' : 'app_dev',
  };
};

export class FakeDatabase {
  private readonly config = createDatabaseConfig();
  private readonly users = new Map<number, DatabaseUserRecord>();
  private sequence = 1;
  private connected = false;
  private heartbeat: NodeJS.Timeout | null = null;

  get databaseName() {
    return this.config.databaseName;
  }

  async connect() {
    this.connected = true;
    this.startHeartbeat();
  }

  async disconnect() {
    this.connected = false;

    if (this.heartbeat) {
      clearInterval(this.heartbeat);
      this.heartbeat = null;
    }
  }

  async reset() {
    this.ensureConnected();
    this.users.clear();
    this.sequence = 1;
  }

  async seedUser(user: Omit<DatabaseUserRecord, 'id'>) {
    this.ensureConnected();

    const record: DatabaseUserRecord = {
      id: this.sequence,
      ...user,
    };

    this.sequence += 1;
    this.users.set(record.id, record);
    return record;
  }

  async findUserByEmail(email: string) {
    this.ensureConnected();

    return (
      [...this.users.values()].find((user) => user.email === email) ?? null
    );
  }

  async findUserById(id: number) {
    this.ensureConnected();
    return this.users.get(id) ?? null;
  }

  isConnected() {
    return this.connected;
  }

  private ensureConnected() {
    if (!this.connected) {
      throw new Error('테스트 DB 연결이 아직 준비되지 않았습니다.');
    }
  }

  private startHeartbeat() {
    if (this.heartbeat) {
      return;
    }

    this.heartbeat = setInterval(() => {
      // 열린 핸들 예제를 설명할 때 어떤 리소스를 닫아야 하는지 보여 주기 위한 heartbeat다.
    }, 60_000);
  }
}
