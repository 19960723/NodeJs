import { PartialType } from '@nestjs/swagger';
import { CreateArticleDto } from './create-article.dto';

/**
 * 更新文章 DTO
 */
export class UpdateArticleDto extends PartialType(CreateArticleDto) {}
