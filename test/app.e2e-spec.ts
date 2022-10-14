import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test,} from "@nestjs/testing";
import { PrismaService } from "../src/prisma/prisma.service";
import { AppModule } from "../src/app.module";
import { describe } from "node:test";

describe('APp e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async() => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],

    }).compile();
   app = moduleRef.createNestApplication();
   app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
   );
   await app.init();
   prisma = app.get(PrismaService);
   prisma.cleanDb();

  
  });
  afterAll(async () => {
    app.close();
   });

   describe('Auth', () => {})
   describe('User', () => {})

   describe('Bookmarks', () => {})

  it.todo("should pass");
})