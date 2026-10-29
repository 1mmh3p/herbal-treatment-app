-- سياسات جدول profiles
CREATE POLICY "Enable all access for own profile" 
ON profiles
FOR ALL
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);




-- Enable read access for authenticated users
CREATE POLICY "Enable read access for authenticated users" 
ON profiles FOR SELECT 
TO authenticated 
USING (true);

-- Enable insert for authenticated users
CREATE POLICY "Enable insert for authenticated users" 
ON profiles FOR INSERT 
TO authenticated 
WITH CHECK (true);

-- Enable update for users based on their id
CREATE POLICY "Enable update for users based on their id" 
ON profiles FOR UPDATE 
TO authenticated 
USING (auth.uid() = id) 
WITH CHECK (auth.uid() = id);


CREATE TABLE profiles (
  id UUID REFERENCES auth.users NOT NULL,
  name TEXT,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (id)
);


CREATE TABLE herbs (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  name_tr TEXT NOT NULL,
  description TEXT,
  description_tr TEXT,
  category TEXT NOT NULL, -- 'içecek', 'yiyecek', 'tedavi'
  benefits TEXT,
  benefits_tr TEXT,
  warnings TEXT,
  warnings_tr TEXT,
  usage TEXT,
  usage_tr TEXT,
  icon_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);


INSERT INTO herbs (
  name, name_tr, description, description_tr, category, 
  benefits, benefits_tr, warnings, warnings_tr, usage, usage_tr, icon_name
) VALUES
-- 1-10
('Papatya', 'Papatya', 
 'Rahatlatıcı bitki çayı', 'Herbal tea for relaxation', 
 'içecek', 
 'Uyku ve kaygıya yardımcı olur', 'Helps with sleep and anxiety', 
 'Alerjik reaksiyonlara neden olabilir', 'May cause allergic reactions', 
 '1 tatlı kaşığı sıcak suda 5 dakika demleyin', 'Steep 1 tsp in hot water for 5 mins', 
 'local-drink'),
('Nane', 'Nane', 
 'Sindirim için ferahlatıcı bitki', 'Refreshing herb for digestion', 
 'içecek', 
 'Mide bulantısı ve baş ağrısını giderir', 'Relieves nausea and headaches', 
 'Reflüsü olanlar için önerilmez', 'Not recommended for acid reflux', 
 'Taze yapraklarla çay yapın', 'Make tea with fresh leaves', 
 'local-drink'),
('Zencefil', 'Zencefil', 
 'Baharatlı kök, birçok faydası var', 'Spicy root with many benefits', 
 'yiyecek', 
 'Mide bulantısı ve iltihaba iyi gelir', 'Helps with nausea and inflammation', 
 'Kan sulandırıcılarla etkileşime girebilir', 'May interact with blood thinners', 
 'Çaylara veya yemeklere ekleyin', 'Add to teas or meals', 
 'fastfood'),
('Zerdeçal', 'Zerdeçal', 
 'Anti-inflamatuar özelliklere sahip altın baharat', 'Golden spice with anti-inflammatory properties', 
 'yiyecek', 
 'Eklem ağrısı ve iltihabı azaltır', 'Reduces joint pain and inflammation', 
 'Giysileri lekeleyebilir', 'May stain clothing', 
 'Karabiberle karıştırın', 'Mix with black pepper for absorption', 
 'fastfood'),
('Lavanta', 'Lavanta', 
 'Sakinleştirici mor çiçekler', 'Calming purple flowers', 
 'tedavi', 
 'Stresi azaltır ve uyku getirir', 'Reduces stress and promotes sleep', 
 'Büyük miktarlarda içilmemeli', 'Not for internal use in large amounts', 
 'Aromaterapi veya kese torbalarında kullanın', 'Use in aromatherapy or sachets', 
 'spa'),
('Biberiye', 'Biberiye', 
 'Hafıza için aromatik bitki', 'Aromatic herb for memory', 
 'yiyecek', 
 'Dolaşımı ve hafızayı güçlendirir', 'Improves circulation and memory', 
 'Yüksek tansiyonda kaçının', 'Avoid in high blood pressure', 
 'Kızartılmış yemeklere ekleyin', 'Add to roasted dishes', 
 'fastfood'),
('Kekik', 'Kekik', 
 'Güçlü antiseptik bitki', 'Powerful antiseptic herb', 
 'yiyecek', 
 'Bağışıklığı artırır ve öksürüğü gider', 'Boosts immunity and fights cough', 
 'Hamilelikte kaçının', 'Avoid during pregnancy', 
 'Çay yapın veya yemeklerde kullanın', 'Make tea or use in cooking', 
 'fastfood'),
('Adaçayı', 'Adaçayı', 
 'Boğaz ve hafıza için bitki', 'Herb for throat and memory', 
 'içecek', 
 'Boğaz ağrısını hafifletir, hafızayı güçlendirir', 'Soothes sore throat, improves memory', 
 'Uzun süre kullanılmamalı', 'Not for extended use', 
 'Gargara yapın veya çay olarak için', 'Gargle or drink as tea', 
 'local-drink'),
('Rezene', 'Rezene', 
 'Tatlı sindirim bitkisi', 'Sweet digestive herb', 
 'içecek', 
 'Şişkinlik ve krampları giderir', 'Relieves bloating and cramps', 
 'Doğum kontrolü ile etkileşebilir', 'May interact with birth control', 
 'Tohumları çiğneyin veya çay yapın', 'Chew seeds or make tea', 
 'local-drink'),
('Ekinezya', 'Ekinezya', 
 'Bağışıklık güçlendirici çiçek', 'Immune-boosting flower', 
 'tedavi', 
 'Soğuk algınlığı ve enfeksiyonlara karşı savaşır', 'Fights colds and infections', 
 'Uzun süre kullanılmamalı', 'Not for long-term use', 
 'Çay veya tentür olarak alın', 'Take as tea or tincture', 
 'spa'),

-- 11-20
('Melisa', 'Melisa', 
 'Sakinleştirici narenciye aromalı bitki', 'Calming citrus-scented herb', 
 'içecek', 
 'Kaygıyı azaltır ve uyku getirir', 'Reduces anxiety and promotes sleep', 
 'Uyuşukluk yapabilir', 'May cause drowsiness', 
 'Taze yapraklarla çay yapın', 'Make tea with fresh leaves', 
 'local-drink'),
('Karahindiba', 'Karahindiba', 
 'Besleyici ve faydalı bitki', 'Nutritious weed with benefits', 
 'içecek', 
 'Karaciğeri ve sindirimi destekler', 'Supports liver and digestion', 
 'Diüretiklerle etkileşime girebilir', 'May interact with diuretics', 
 'Kökleri veya yaprakları ile çay yapın', 'Use roots or leaves in tea', 
 'local-drink'),
('Kantaron', 'Kantaron', 
 'Ruh hali desteği için çiçek', 'Flower for mood support', 
 'tedavi', 
 'Hafif depresyona iyi gelir', 'Helps with mild depression', 
 'İlaçlarla etkileşebilir', 'Interacts with many medications', 
 'Çay veya kapsül olarak alın', 'Take as tea or capsule', 
 'spa'),
('Kediotu', 'Kediotu', 
 'Güçlü uyku yardımcısı', 'Powerful sleep aid', 
 'tedavi', 
 'Derin uykuyu teşvik eder', 'Promotes deep sleep', 
 'Sersemlik yapabilir', 'May cause grogginess', 
 'Kökünden çay yapın', 'Make tea from the root', 
 'spa'),
('Hatmi Kökü', 'Hatmi Kökü', 
 'Yatıştırıcı müsilajlı bitki', 'Soothing mucilaginous herb', 
 'tedavi', 
 'Boğaz ağrısı ve mideyi yatıştırır', 'Soothes sore throat and stomach', 
 'Diğer bitkilerin emilimini yavaşlatabilir', 'May slow absorption of other herbs', 
 'Soğuk demleme yapın', 'Make cold infusion', 
 'spa'),
('Isırgan Otu', 'Isırgan Otu', 
 'Mineral zengini ve alerjileri azaltır', 'Nutritious stinging herb', 
 'yiyecek', 
 'Mineraller açısından zengindir', 'Rich in minerals', 
 'Tansiyon ilacı ile etkileşebilir', 'May interact with blood pressure meds', 
 'Yaprakları pişirin veya çay yapın', 'Cook leaves or make tea', 
 'fastfood'),
('Dulavratotu', 'Dulavratotu', 
 'Detoks yapan kök sebze', 'Detoxifying root vegetable', 
 'yiyecek', 
 'Cilt ve karaciğer sağlığını destekler', 'Supports skin and liver health', 
 'Susuzluk yapabilir', 'May cause dehydration', 
 'Kökleri kavurun veya çay yapın', 'Roast roots or make tea', 
 'fastfood'),
('Deve Dikeni', 'Deve Dikeni', 
 'Karaciğeri koruyan bitki', 'Liver-protective herb', 
 'tedavi', 
 'Karaciğer yenilenmesini destekler', 'Supports liver regeneration', 
 'Kan şekerini düşürebilir', 'May lower blood sugar', 
 'Kapsül veya tentür alınabilir', 'Take as capsule or tincture', 
 'spa'),
('Aynısefa', 'Aynısefa', 
 'Şifalı turuncu çiçekler', 'Healing orange flowers', 
 'tedavi', 
 'Cilt tahrişlerini yatıştırır', 'Soothes skin irritations', 
 'Alerjik reaksiyonlara neden olabilir', 'May cause allergic reactions', 
 'Salve veya çayda kullanın', 'Use in salves or tea', 
 'spa'),
('Sinirli Yaprak', 'Sinirli Yaprak', 
 'Yol kenarında şifalı bitki', 'Healing roadside herb', 
 'tedavi', 
 'Böcek ısırıklarını ve cildi yatıştırır', 'Soothes bug bites and skin', 
 'Genellikle çok güvenlidir', 'Generally very safe', 
 'Ezilmiş yaprakları topikal uygulayın', 'Apply crushed leaves topically', 
 'spa'),

-- 21-30
('Tarçın', 'Tarçın', 
 'Tatlı ısıtıcı kabuk', 'Sweet warming bark', 
 'yiyecek', 
 'Kan şekerini düzenler', 'Regulates blood sugar', 
 'Yüksek dozda ağız tahrişi yapabilir', 'May irritate mouth in large doses', 
 'Yiyeceklere veya çaylara ekleyin', 'Add to foods or teas', 
 'fastfood'),
('Meyan Kökü', 'Meyan Kökü', 
 'Tatlı yatıştırıcı kök', 'Sweet soothing root', 
 'içecek', 
 'Boğazı ve böbreküstü bezlerini yatıştırır', 'Soothes throat and adrenals', 
 'Tansiyonu yükseltebilir', 'Raises blood pressure', 
 'Kökü çiğneyin veya çay yapın', 'Chew root or make tea', 
 'local-drink'),
('Ashwagandha', 'Ashwagandha', 
 'Adaptojenik Ayurvedik bitki', 'Adaptogenic Ayurvedic herb', 
 'tedavi', 
 'Stresi ve yorgunluğu azaltır', 'Reduces stress and fatigue', 
 'Tiroid ilaçlarıyla etkileşebilir', 'May interact with thyroid meds', 
 'Toz veya kapsül olarak alın', 'Take as powder or capsule', 
 'spa'),
('Tulsi', 'Tulsi', 
 'Kutsal Ayurvedik bitki', 'Sacred Ayurvedic herb', 
 'içecek', 
 'Stres ve iltihabı azaltır', 'Reduces stress and inflammation', 
 'Tansiyonu düşürebilir', 'May lower blood sugar', 
 'Taze yapraklardan çay yapın', 'Make tea from fresh leaves', 
 'local-drink'),
('Ginkgo Biloba', 'Ginkgo Biloba', 
 'Antik hafıza bitkisi', 'Ancient memory herb', 
 'tedavi', 
 'Dolaşımı ve hafızayı iyileştirir', 'Improves circulation and memory', 
 'Kanı inceltebilir', 'May thin blood', 
 'Standartize ekstrakt olarak alın', 'Take as standardized extract', 
 'spa'),
('Kaygan Karaağaç', 'Kaygan Karaağaç', 
 'Sindirim sistemini yatıştırıcı müsilajlı kabuk', 'Soothing mucilaginous bark', 
 'tedavi', 
 'Sindirim sistemini rahatlatır', 'Soothes digestive tract', 
 'İlaç emilimini yavaşlatabilir', 'May slow drug absorption', 
 'Tozu suyla karıştırın', 'Mix powder with water', 
 'spa'),
('Çarkıfelek', 'Çarkıfelek', 
 'Sakinleştirici asma çiçeği', 'Calming vine flower', 
 'içecek', 
 'Kaygı ve uykusuzluğu azaltır', 'Reduces anxiety and insomnia', 
 'Yatıştırıcıları güçlendirebilir', 'May enhance sedatives', 
 'Çiçeklerden çay yapın', 'Make tea from flowers', 
 'local-drink'),
('Civanperçemi', 'Civanperçemi', 
 'Yara iyileştirici bitki', 'Wound-healing herb', 
 'tedavi', 
 'Kanamayı durdurur ve ateşi düşürür', 'Stops bleeding and reduces fever', 
 'Fotosensitiviteye neden olabilir', 'May cause photosensitivity', 
 'Topikal veya çay yapın', 'Apply topically or make tea', 
 'spa'),
('Altınmühür', 'Altınmühür', 
 'Enfeksiyonlarla savaşan antibakteriyel kök', 'Antibacterial root', 
 'tedavi', 
 'İnfection ve soğuk algınlığıyla savaşır', 'Fights infections and colds', 
 'Uzun süre kullanılmamalı', 'Not for long-term use', 
 'Tentür veya çay olarak kullanın', 'Use as tincture or tea', 
 'spa'),
('Mürver', 'Mürver', 
 'Bağışıklık güçlendirici meyve', 'Immune-boosting berry', 
 'yiyecek', 
 'Soğuk algınlığı ve gribe karşı savaşır', 'Fights colds and flu', 
 'Çiğ meyveleri zehirli olabilir', 'Raw berries are toxic', 
 'Şurup veya çay olarak alın', 'Take as syrup or tea', 
 'fastfood');



-- Enable read access for all users
CREATE POLICY "Enable read access for all users" 
ON herbs FOR SELECT 
TO authenticated 
USING (true);