import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class createAppointments1618195925970
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointment',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            // função do postgres para gerar uuid
            // é necessário usar se não irá dar erro
            default: 'uuid_generate_v4()'
          },
          {
            name: 'provider',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'date',
            type: 'timestamp with time zone',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointment')
  }
}
