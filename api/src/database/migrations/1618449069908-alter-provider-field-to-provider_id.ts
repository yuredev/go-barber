import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class alterProviderFieldToProviderId1618449069908
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointment', 'provider');
    await queryRunner.addColumn(
      'appointment',
      new TableColumn({ name: 'provider_id', type: 'uuid', isNullable: true }),
    );

    await queryRunner.createForeignKey(
      'appointment',
      new TableForeignKey({
        // nome da foreign key
        name: 'provider_id',
        // definir a coluna que será a foreign key
        columnNames: ['provider_id'],
        // nome da coluna da outra tabela ao qual esta foreign key se relaciona
        referencedColumnNames: ['id'],
        // tabela que esta foreign se relaciona
        referencedTableName: 'user',

        // bloqueia a cascata de remoção do usuário caso o appointment seja deletado
        // onDelete: 'RESTRICT',

        // seta o provider_id como nulo caso o usuário seja deletado
        onDelete: 'SET NULL',

        // deleta todos as entidades que possuem referência ao usuário caso o user seja deletado
        // onDelete: 'CASCADE',

        // caso o id seja alterado, a alteração reflete em todos os relacionamentos
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // é necessário desfazer as mudanças do up mas de forma inversa
    // assim é necessário primeiro remover a foreign key
    await queryRunner.dropForeignKey('appointment', 'appointment_provider');
    await queryRunner.dropColumn('appointment', 'provider_id');

    await queryRunner.addColumn(
      'appointment',
      new TableColumn({ name: 'provider', type: 'varchar' }),
    );
  }
}
