import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { CacheModule as CacheModuleSERVICECASH } from '@nestjs/cache-manager';

@Module({
  imports: [ CacheModuleSERVICECASH.register({
    ttl: 90000000
  }) ],
  providers: [CacheService],
  exports:[CacheService]
})
export class CacheModule {}
