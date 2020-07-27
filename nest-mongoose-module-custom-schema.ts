
@Module({
  imports: [
    // MongooseModule.forFeature([{ name: 'Expense', schema: ExpenseSchema }]),
    MongooseModule.forFeatureAsync([
      {
        name: 'Expense',
        imports: [CryptographyModule],
        useFactory: async (cs: CryptographyService) => {
          const schema = new mongoose.Schema({
            name: { type: String, unique: true, required: true },
            budget: { type: String, default: 0, get: cs.decryptNumber.apply(CryptographyService), set: cs.encryptNumber.apply(CryptographyService) }
          });

          // schema.pre('save', () =>
          //   console.log(
          //     `${configService.get<string>('APP_NAME')}: Hello from pre save`,
          //   ),
          // );

          return schema;
        },
        inject: [CryptographyService],
      }]),
  ]
})

