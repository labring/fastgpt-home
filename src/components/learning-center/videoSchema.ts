import { staticVideos, type Video } from './videos';
import { videoSchemaMetadata } from './videoSchemaMetadata';

export function buildVideoObjectItems() {
  return staticVideos.flatMap((video) => {
    const bvid = video.url.match(/bilibili\.com\/video\/(BV[a-zA-Z0-9]+)/)?.[1];
    const metadata = bvid ? videoSchemaMetadata[bvid] : undefined;
    return metadata
      ? [
          {
            '@type': 'VideoObject' as const,
            name: video.title,
            description: video.desc,
            thumbnailUrl: metadata.thumbnailUrl,
            uploadDate: metadata.uploadDate,
            duration: metadata.duration,
            embedUrl: `https://player.bilibili.com/player.html?bvid=${bvid}`,
            inLanguage: 'zh-CN' as const
          }
        ]
      : [];
  });
}
