import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import path from 'path';

// .env dosyasının tam yolunu bul ve zorla yükle
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Garanti olması için PrismaClient'a url'i doğrudan besliyoruz
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function main() {
  console.log('🔄 Veritabanı temizleniyor ve seed işlemi başlıyor...');
  
  // Eğer DATABASE_URL hala yüklenemediyse erkenden hata fırlatıp görelim
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL çevre değişkeni yüklenemedi! .env dosyanızı kontrol edin.");
  }

  // ⚠️ ÖNEMLİ: İlişkili tablolarda önce bağımlı olan (Item), sonra ana tablo (Category) silinir.
  await prisma.item.deleteMany();
  await prisma.category.deleteMany();

  // 1. KATEGORİLERİ OLUŞTURMA
  // createMany yerine tek tek create yapıyoruz çünkü oluşturulan kategorilerin ID'lerini 
  // tarifleri (items) birbirine bağlarken kullanacağız.
  
  const anaYemek = await prisma.category.create({
    data: {
      name: 'Ana Yemekler',
      slug: 'ana-yemekler',
      description: 'Et, tavuk ve sebze ağırlıklı nefis akşam yemeği alternatifleri.',
      imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
    },
  });

  const tatlilar = await prisma.category.create({
    data: {
      name: 'Tatlılar',
      slug: 'tatlilar',
      description: 'Sütlü, şerbetli ve çikolatalı en enfes tatlı tarifleri.',
      imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587',
    },
  });

  const corbalar = await prisma.category.create({
    data: {
      name: 'Çorbalar',
      slug: 'corbalar',
      description: 'İçinizi ısıtacak, her mevsime uygun pratik çorbalar.',
      imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554',
    },
  });

  const salatalar = await prisma.category.create({
    data: {
      name: 'Salatalar',
      slug: 'salatalar',
      description: 'Diyet dostu, taze ve sağlıklı salata çeşitleri.',
      imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    },
  });

  console.log('✅ Kategoriler başarıyla oluşturuldu. Şimdi tarifler (items) ekleniyor...');

  await prisma.item.createMany({
    data: [
      {
        name: 'Fırında Soslu Tavuk',
        description: 'Patates ve özel baharat sosuyla harmanlanmış, nar gibi kızarmış fırın tavuk tarifi.',
        imageUrl: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80',
        categoryId: anaYemek.id,
      },
      {
        name: 'Karnıyarık',
        description: 'Geleneksel kıymalı harç ile doldurulmuş nefis köz patlıcan yemeği.',
        imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=800&q=80',
        categoryId: anaYemek.id,
      },
      {
        name: 'Çikolatalı Sufle',
        description: 'Akışkan sıcak çikolata dolgulu, taze pişmiş enfes sufle.',
        imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c',
        categoryId: tatlilar.id, // Tatlılar kategorisine bağlandı
      },
      {
        name: 'Süzme Mercimek Çorbası',
        description: 'Tereyağlı ve naneli sos eşliğinde lokanta usulü mercimek çorbası.',
        imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554',
        categoryId: corbalar.id, // Çorbalar kategorisine bağlandı
      },
      {
        name: 'Sezar Salata',
        description: 'Izgara tavuk dilimleri, kruton ekmek ve özel soslu sezar salatası.',
        imageUrl: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9',
        categoryId: salatalar.id, // Salatalar kategorisine bağlandı
      },
    ],
  });

  console.log('🚀 Tüm kategoriler ve tarifler (items) veritabanına başarıyla yüklendi!');
}

main()
  .catch((e) => {
    console.error('❌ Seed işlemi sırasında hata oluştu:', e);
    process.exit(1);
  })
  .finally(async () => {
    // İşlem bitince veritabanı bağlantısını güvenli bir şekilde kapatıyoruz
    await prisma.$disconnect();
  });