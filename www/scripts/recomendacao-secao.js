/* ======================================================
   AniGeekNews – Enterprise Section System v7.2 (Full)
   • Títulos de Sessão Clicáveis (Categorias Pai)
   • Notificações Toast Profissionais (Sem Alert)
   • Controle de Foco (Teclado NÃO abre sozinho) ✓ CORRIGIDO
   • Filtro por Categoria (Games/Filmes/Séries/Animes/Notícias) ✓ NOVO
   • Design Harmônico
   • URLs Compartilháveis por Aba
   • Deep Linking: Abre aba correta ao receber ID de notícia
====================================================== */

(function(){

const CONFIG = {
  MAX_TABS: 19,
  KEYS: {
    ORDER: 'ag_v7_order',
    MODE:  'ag_v7_mode',
    STATS: 'ag_v7_stats'
  },
  
  CATEGORIES: [
    { id: 'games_list', label: 'Games', cor: '#4361ee' },
    { id: 'filmes_list', label: 'Filmes', cor: '#e76f51' },
    { id: 'series_list', label: 'Séries', cor: '#f4a261' },
    { id: 'animes_list', label: 'Animes', cor: '#4cc9f0' },
    { id: 'noticias_list', label: 'Notícias', cor: '#2a9d8f' }
  ]
};

/* ===========================
   BANCO DE DADOS UNIFICADO
=========================== */
const CATALOGO = [
  /* ============ ANIMES (categoria: "animes_list") ============ */
  { sessao: "Jujutsu Kaisen Shimetsu Kaiyu", id: "Jujutsu_kaisen_shimetsu_kaiyu", cor: "#e63946", categoria: "animes_list", itens: [] },
  { sessao: "Akame Ga Kill", id: "akame_ga_kill", cor: "#f1faee", categoria: "animes_list", itens: [] },
  { sessao: "Angel Beats", id: "angel_beats", cor: "#a8dadc", categoria: "animes_list", itens: [] },
  { sessao: "Angelic Layer", id: "angelic_layer", cor: "#457b9d", categoria: "animes_list", itens: [] },
  { sessao: "Anime I Geek", id: "anime_i_geek", cor: "#1d3557", categoria: "animes_list", itens: [] },
  { sessao: "Assassination Classroom", id: "assassination_classroom", cor: "#fca311", categoria: "animes_list", itens: [] },
  { sessao: "Attack On Titan Final Season", id: "attack_on_titan_final_season", cor: "#ff6b6b", categoria: "animes_list", itens: [] },
  { sessao: "Attack On Titan Final Season Part 2", id: "attack_on_titan_final_season_part_2", cor: "#6a4c93", categoria: "animes_list", itens: [] },
  { sessao: "Bakuman", id: "bakuman", cor: "#ffb703", categoria: "animes_list", itens: [] },
  { sessao: "Black Bullet", id: "black_bullet", cor: "#219ebc", categoria: "animes_list", itens: [] },
  { sessao: "Black Clover", id: "black_clover", cor: "#023e8a", categoria: "animes_list", itens: [] },
  { sessao: "Bleach", id: "bleach", cor: "#e63946", categoria: "animes_list", itens: [] },
  { sessao: "Blue Lock", id: "blue_lock", cor: "#00b4d8", categoria: "animes_list", itens: [] },
  { sessao: "Blue Period", id: "blue_period", cor: "#7209b7", categoria: "animes_list", itens: [] },
  { sessao: "Boku No Hero Academia Season 5", id: "boku_no_hero_academia_season_5", cor: "#f77f00", categoria: "animes_list", itens: [] },
  { sessao: "Boku No Hero Academia Season 6", id: "boku_no_hero_academia_season_6", cor: "#ffbe0b", categoria: "animes_list", itens: [] },
  { sessao: "Boruto", id: "boruto", cor: "#8ac926", categoria: "animes_list", itens: [] },
  { sessao: "Cells At Work", id: "cells_at_work", cor: "#1982c4", categoria: "animes_list", itens: [] },
  { sessao: "Cells At Work Black", id: "cells_at_work_black", cor: "#6a4c93", categoria: "animes_list", itens: [] },
  { sessao: "Chainsaw Man", id: "chainsaw_man", cor: "#d62828", categoria: "animes_list", itens: [] },
  { sessao: "Chainsaw Man Part 2", id: "chainsaw_man_part_2", cor: "#f77f00", categoria: "animes_list", itens: [] },
  { sessao: "Clannad", id: "clannad", cor: "#ffb703", categoria: "animes_list", itens: [] },
  { sessao: "Classroom Of The Elite", id: "classroom_of_the_elite", cor: "#023e8a", categoria: "animes_list", itens: [] },
  { sessao: "Classroom Of The Elite Season 2", id: "classroom_of_the_elite_season_2", cor: "#00b4d8", categoria: "animes_list", itens: [] },
  { sessao: "Code Geass", id: "code_geass", cor: "#f94144", categoria: "animes_list", itens: [] },
  { sessao: "Cowboy Bebop", id: "cowboy_bebop", cor: "#7209b7", categoria: "animes_list", itens: [] },
  { sessao: "Death Note", id: "death_note", cor: "#ff6d00", categoria: "animes_list", itens: [] },
  { sessao: "Demon Slayer Kimetsu No Yaiba", id: "demon_slayer_kimetsu_no_yaiba", cor: "#f72585", categoria: "animes_list", itens: [] },
  { sessao: "Demon Slayer Entertainment District", id: "demon_slayer_kimetsu_no_yaiba_entertainment_district", cor: "#b5179e", categoria: "animes_list", itens: [] },
  { sessao: "Demon Slayer Mugen Train", id: "demon_slayer_kimetsu_no_yaiba_mugen_train", cor: "#7209b7", categoria: "animes_list", itens: [] },
  { sessao: "Demon Slayer Swordsmith Village", id: "demon_slayer_kimetsu_no_yaiba_swordsmith_village", cor: "#3a0ca3", categoria: "animes_list", itens: [] },
  { sessao: "Devilman Crybaby", id: "devilman_crybaby", cor: "#4361ee", categoria: "animes_list", itens: [] },
  { sessao: "Dr Stone", id: "dr_stone", cor: "#4895ef", categoria: "animes_list", itens: [] },
  { sessao: "Elfen Lied", id: "elfen_lied", cor: "#4cc9f0", categoria: "animes_list", itens: [] },
  { sessao: "Eromanga Sensei", id: "eromanga_sensei", cor: "#7209b7", categoria: "animes_list", itens: [] },
  { sessao: "Fire Force", id: "fire_force", cor: "#f94144", categoria: "animes_list", itens: [] },
  { sessao: "Food Wars Shokugeki No Soma", id: "food_wars_shokugeki_no_soma", cor: "#ffba08", categoria: "animes_list", itens: [] },
  { sessao: "Fullmetal Alchemist Brotherhood", id: "fullmetal_alchemist_brotherhood", cor: "#8d99ae", categoria: "animes_list", itens: [] },
  { sessao: "Guilty Crown", id: "guilty_crown", cor: "#ef233c", categoria: "animes_list", itens: [] },
  { sessao: "Haikyuu", id: "haikyuu", cor: "#06d6a0", categoria: "animes_list", itens: [] },
  { sessao: "Hells Paradise", id: "hells_paradise", cor: "#118ab2", categoria: "animes_list", itens: [] },
  { sessao: "Horimiya", id: "horimiya", cor: "#073b4c", categoria: "animes_list", itens: [] },
  { sessao: "Hunter X Hunter", id: "hunter_x_hunter", cor: "#ffd166", categoria: "animes_list", itens: [] },
  { sessao: "Jujutsu Kaisen", id: "jujutsu_kaisen", cor: "#06d6a0", categoria: "animes_list", itens: [] },
  { sessao: "Kaguya Sama Love Is War", id: "kaguya_sama_love_is_war", cor: "#118ab2", categoria: "animes_list", itens: [] },
  { sessao: "Kaguya Sama Love Is War Season 2", id: "kaguya_sama_love_is_war_season_2", cor: "#073b4c", categoria: "animes_list", itens: [] },
  { sessao: "Kaguya Sama Love Is War Season 3", id: "kaguya_sama_love_is_war_season_3", cor: "#ff6d00", categoria: "animes_list", itens: [] },
  { sessao: "Kimi No Suizou Wo Tabetai", id: "kimi_no_suizou_wo_tabetai", cor: "#7209b7", categoria: "animes_list", itens: [] },
  { sessao: "Kingdom", id: "kingdom", cor: "#f94144", categoria: "animes_list", itens: [] },
  { sessao: "Komi Cant Communicate", id: "komi_cant_communicate", cor: "#06d6a0", categoria: "animes_list", itens: [] },
  { sessao: "Komi Cant Communicate Season 2", id: "komi_cant_communicate_season_2", cor: "#073b4c", categoria: "animes_list", itens: [] },
  { sessao: "Kuroko No Basket", id: "kuroko_no_basket", cor: "#118ab2", categoria: "animes_list", itens: [] },
  { sessao: "Kuroshitsuji", id: "kuroshitsuji", cor: "#06d6a0", categoria: "animes_list", itens: [] },
  { sessao: "Made In Abyss", id: "made_in_abyss", cor: "#ffd166", categoria: "animes_list", itens: [] },
  { sessao: "Made In Abyss Dawn Of The Deep Soul", id: "made_in_abyss_dawn_of_the_deep_soul", cor: "#ef476f", categoria: "animes_list", itens: [] },
  { sessao: "Made In Abyss Retsujitsu", id: "made_in_abyss_retsujitsu", cor: "#06d6a0", categoria: "animes_list", itens: [] },
  { sessao: "Maiden Slayer", id: "maiden_slayer", cor: "#118ab2", categoria: "animes_list", itens: [] },
  { sessao: "Mob Psycho 100", id: "mob_psycho_100", cor: "#073b4c", categoria: "animes_list", itens: [] },
  { sessao: "My Hero Academia", id: "my_hero_academia", cor: "#ff6d00", categoria: "animes_list", itens: [] },
  { sessao: "My Next Life As A Villainess", id: "my_next_life_as_a_villainess", cor: "#f94144", categoria: "animes_list", itens: [] },
  { sessao: "Naruto", id: "naruto", cor: "#06d6a0", categoria: "animes_list", itens: [] },
  { sessao: "Neon Genesis Evangelion", id: "neon_genesis_evangelion", cor: "#073b4c", categoria: "animes_list", itens: [] },
  { sessao: "Noragami", id: "noragami", cor: "#ff6d00", categoria: "animes_list", itens: [] },
  { sessao: "Oddtaxi", id: "oddtaxi", cor: "#ef233c", categoria: "animes_list", itens: [] },
  { sessao: "One Piece", id: "one_piece", cor: "#ffd166", categoria: "animes_list", itens: [] },
  { sessao: "One Punch Man", id: "one_punch_man", cor: "#06d6a0", categoria: "animes_list", itens: [] },
  { sessao: "Oregairu", id: "oregairu", cor: "#073b4c", categoria: "animes_list", itens: [] },
  { sessao: "Oregairu Season 2", id: "oregairu_season_2", cor: "#ff6d00", categoria: "animes_list", itens: [] },
  { sessao: "Owari No Seraph", id: "owari_no_seraph", cor: "#f94144", categoria: "animes_list", itens: [] },
  { sessao: "Platinum End", id: "platinum_end", cor: "#06d6a0", categoria: "animes_list", itens: [] },
  { sessao: "Psycho Pass", id: "psycho_pass", cor: "#118ab2", categoria: "animes_list", itens: [] },
  { sessao: "Re Zero Kara Hajimeru Isekai Seikatsu", id: "re_zero_kara_hajimeru_isekai_seikatsu", cor: "#073b4c", categoria: "animes_list", itens: [] },
  { sessao: "Rent A Girlfriend", id: "rent_a_girlfriend", cor: "#ff6d00", categoria: "animes_list", itens: [] },
  { sessao: "Rent A Girlfriend Season 2", id: "rent_a_girlfriend_season_2", cor: "#ef233c", categoria: "animes_list", itens: [] },
  { sessao: "Rurouni Kenshin", id: "rurouni_kenshin", cor: "#06d6a0", categoria: "animes_list", itens: [] },
  { sessao: "Saihate No Paladin", id: "saihate_no_paladin", cor: "#118ab2", categoria: "animes_list", itens: [] },
  { sessao: "Samurai Champloo", id: "samurai_champloo", cor: "#073b4c", categoria: "animes_list", itens: [] },
  { sessao: "Sentenced To Be A Hero", id: "sentenced_to_be_a_hero", cor: "#ff6d00", categoria: "animes_list", itens: [] },
  { sessao: "Seven Deadly Sins", id: "seven_deadly_sins", cor: "#f94144", categoria: "animes_list", itens: [] },
  { sessao: "Shadows House", id: "shadows_house", cor: "#06d6a0", categoria: "animes_list", itens: [] },
  { sessao: "Shadows House Season 2", id: "shadows_house_season_2", cor: "#118ab2", categoria: "animes_list", itens: [] },
  { sessao: "Shaman King", id: "shaman_king", cor: "#073b4c", categoria: "animes_list", itens: [] },
  { sessao: "Shingeki No Kyojin", id: "shingeki_no_kyojin", cor: "#ff6d00", categoria: "animes_list", itens: [] },
  { sessao: "Solo Leveling", id: "solo_leveling", cor: "#ef233c", categoria: "animes_list", itens: [] },
  { sessao: "Spy X Family", id: "spy_x_family", cor: "#ffd166", categoria: "animes_list", itens: [] },
  { sessao: "Steins Gate", id: "steins_gate", cor: "#06d6a0", categoria: "animes_list", itens: [] },
  { sessao: "Steins Gate 0", id: "steins_gate_0", cor: "#073b4c", categoria: "animes_list", itens: [] },
  { sessao: "Sword Art Online", id: "sword_art_online", cor: "#ff6d00", categoria: "animes_list", itens: [] },
  { sessao: "The Ancient Magus Bride", id: "the_ancient_magus_bride", cor: "#f94144", categoria: "animes_list", itens: [] },
  { sessao: "The Case Study Of Vanitas", id: "the_case_study_of_vanitas", cor: "#06d6a0", categoria: "animes_list", itens: [] },
  { sessao: "The Case Study Of Vanitas Season 2", id: "the_case_study_of_vanitas_season_2", cor: "#073b4c", categoria: "animes_list", itens: [] },
  { sessao: "The Quintessential Quintuplets", id: "the_quintessential_quintuplets", cor: "#ff6d00", categoria: "animes_list", itens: [] },
  { sessao: "The Rising Of The Shield Hero", id: "the_rising_of_the_shield_hero", cor: "#ef233c", categoria: "animes_list", itens: [] },
  { sessao: "The World God Only Knows", id: "the_world_god_only_knows", cor: "#ffd166", categoria: "animes_list", itens: [] },
  { sessao: "Tokyo Revengers", id: "tokyo_revengers", cor: "#06d6a0", categoria: "animes_list", itens: [] },
  { sessao: "Toradora", id: "toradora", cor: "#073b4c", categoria: "animes_list", itens: [] },
  { sessao: "Vinland Saga", id: "vinland_saga", cor: "#ff6d00", categoria: "animes_list", itens: [] },
  { sessao: "Vinland Saga Season 2", id: "vinland_saga_season_2", cor: "#f94144", categoria: "animes_list", itens: [] },
  { sessao: "Weathering With You", id: "weathering_with_you", cor: "#06d6a0", categoria: "animes_list", itens: [] },
  { sessao: "Your Lie In April", id: "your_lie_in_april", cor: "#073b4c", categoria: "animes_list", itens: [] },
  { sessao: "Your Name", id: "your_name", cor: "#ff6d00", categoria: "animes_list", itens: [] },
  { sessao: "Yuyu Hakusho", id: "yuyu_hakusho", cor: "#ef233c", categoria: "animes_list", itens: [] },

  /* ============ FILMES (categoria: "filmes_list") ============ */
  { sessao: "Homem Aranha Através Do Aranhaverso", id: "homem_aranha_atraves_do_aranhaverso_filme", cor: "#e63946", categoria: "filmes_list", itens: [] },
  { sessao: "Oppenheimer", id: "oppenheimer_filme", cor: "#f1faee", categoria: "filmes_list", itens: [] },
  { sessao: "Barbie", id: "barbie_filme", cor: "#a8dadc", categoria: "filmes_list", itens: [] },
  { sessao: "John Wick 4", id: "john_wick_4_filme", cor: "#457b9d", categoria: "filmes_list", itens: [] },
  { sessao: "Top Gun Maverick", id: "top_gun_maverick_filme", cor: "#1d3557", categoria: "filmes_list", itens: [] },
  { sessao: "Avatar O Caminho Da Agua", id: "avatar_o_caminho_da_agua_filme", cor: "#fca311", categoria: "filmes_list", itens: [] },
  { sessao: "Duna Parte 2", id: "duna_parte_2_filme", cor: "#ff6b6b", categoria: "filmes_list", itens: [] },
  { sessao: "Batman", id: "batman_filme", cor: "#6a4c93", categoria: "filmes_list", itens: [] },
  { sessao: "Coringa", id: "coringa_filme", cor: "#ffb703", categoria: "filmes_list", itens: [] },
  { sessao: "Vingadores Ultimato", id: "vingadores_ultimato_filme", cor: "#219ebc", categoria: "filmes_list", itens: [] },
  { sessao: "Interestelar", id: "interestelar_filme", cor: "#023e8a", categoria: "filmes_list", itens: [] },
  { sessao: "O Lobo De Wall Street", id: "o_lobo_de_wall_street_filme", cor: "#00b4d8", categoria: "filmes_list", itens: [] },
  { sessao: "Tropa De Elite", id: "tropa_de_elite_filme", cor: "#7209b7", categoria: "filmes_list", itens: [] },
  { sessao: "Cidade De Deus", id: "cidade_de_deus_filme", cor: "#f77f00", categoria: "filmes_list", itens: [] },
  { sessao: "O Auto Da Compadecida", id: "o_auto_da_compadecida_filme", cor: "#ffbe0b", categoria: "filmes_list", itens: [] },
  { sessao: "Gladiador 2", id: "gladiador_2_filme", cor: "#8ac926", categoria: "filmes_list", itens: [] },
  { sessao: "Velozes E Furiosos 10", id: "velozes_e_furiosos_10_filme", cor: "#1982c4", categoria: "filmes_list", itens: [] },
  { sessao: "Missao Impossivel Acerto De Contas", id: "missao_impossivel_acerto_de_contas_filme", cor: "#6a4c93", categoria: "filmes_list", itens: [] },
  { sessao: "Panico 6", id: "pânico_6_filme", cor: "#d62828", categoria: "filmes_list", itens: [] },
  { sessao: "A Morte Do Demonio A Ascensao", id: "a_morte_do_demonio_a_ascensao_filme", cor: "#f77f00", categoria: "filmes_list", itens: [] },
  { sessao: "Martelo Dos Deuses", id: "martelo_dos_deuses_filme", cor: "#ffb703", categoria: "filmes_list", itens: [] },
  { sessao: "Super Mario Bros O Filme", id: "super_mario_bros_o_filme", cor: "#023e8a", categoria: "filmes_list", itens: [] },
  { sessao: "Guardioes Da Galaxia 3", id: "guardioes_da_galaxia_3_filme", cor: "#00b4d8", categoria: "filmes_list", itens: [] },
  { sessao: "Killers Of The Flower Moon", id: "killers_of_the_flower_moon_filme", cor: "#f94144", categoria: "filmes_list", itens: [] },
  { sessao: "Poor Things", id: "poor_things_filme", cor: "#7209b7", categoria: "filmes_list", itens: [] },
  { sessao: "Napoleao", id: "napoleao_filme", cor: "#ff6d00", categoria: "filmes_list", itens: [] },
  { sessao: "Wonka", id: "wonka_filme", cor: "#f72585", categoria: "filmes_list", itens: [] },
  { sessao: "Aquaman 2", id: "aquaman_2_filme", cor: "#b5179e", categoria: "filmes_list", itens: [] },
  { sessao: "Blade Runner 2049", id: "blade_runner_2049_filme", cor: "#3a0ca3", categoria: "filmes_list", itens: [] },
  { sessao: "Mad Max Estrada Da Furia", id: "mad_max_estrada_da_furia_filme", cor: "#4361ee", categoria: "filmes_list", itens: [] },
  { sessao: "O Poderoso Chefao", id: "o_poderoso_chefao_filme", cor: "#4895ef", categoria: "filmes_list", itens: [] },
  { sessao: "Pulp Fiction", id: "pulp_fiction_filme", cor: "#4cc9f0", categoria: "filmes_list", itens: [] },
  { sessao: "Matrix", id: "matrix_filme", cor: "#ffba08", categoria: "filmes_list", itens: [] },
  { sessao: "O Senhor Dos Aneis A Sociedade Do Anel", id: "o_senhor_dos_aneis_a_sociedade_do_anel_filme", cor: "#8d99ae", categoria: "filmes_list", itens: [] },
  { sessao: "Harry Potter E A Pedra Filosofal", id: "harry_potter_e_a_pedra_filosofal_filme", cor: "#ef233c", categoria: "filmes_list", itens: [] },
  { sessao: "Bastardos Inglorios", id: "bastardos_inglorios_filme", cor: "#06d6a0", categoria: "filmes_list", itens: [] },
  { sessao: "O Iluminado", id: "o_iluminado_filme", cor: "#118ab2", categoria: "filmes_list", itens: [] },
  { sessao: "Psicose", id: "psicose_filme", cor: "#073b4c", categoria: "filmes_list", itens: [] },
  { sessao: "Jurassic Park", id: "jurassic_park_filme", cor: "#ffd166", categoria: "filmes_list", itens: [] },
  { sessao: "Star Wars O Imperio Contra Ataca", id: "star_wars_o_imperio_contra_ataca_filme", cor: "#06d6a0", categoria: "filmes_list", itens: [] },
  { sessao: "De Volta Para O Futuro", id: "de_volta_para_o_futuro_filme", cor: "#118ab2", categoria: "filmes_list", itens: [] },
  { sessao: "Scarface", id: "scarface_filme", cor: "#ff6d00", categoria: "filmes_list", itens: [] },
  { sessao: "Os Bons Companheiros", id: "os_bons_companheiros_filme", cor: "#f94144", categoria: "filmes_list", itens: [] },
  { sessao: "Resgate 2", id: "resgate_2_filme", cor: "#06d6a0", categoria: "filmes_list", itens: [] },
  { sessao: "Glass Onion", id: "glass_onion_filme", cor: "#073b4c", categoria: "filmes_list", itens: [] },
  { sessao: "O Menu", id: "o_menu_filme", cor: "#118ab2", categoria: "filmes_list", itens: [] },
  { sessao: "Tudo Em Todo Lugar Ao Mesmo Tempo", id: "tudo_em_todo_lugar_ao_mesmo_tempo_filme", cor: "#06d6a0", categoria: "filmes_list", itens: [] },
  { sessao: "Em Frente", id: "em_frente_filme", cor: "#ffd166", categoria: "filmes_list", itens: [] },
  { sessao: "Elementais", id: "elementais_filme", cor: "#ef476f", categoria: "filmes_list", itens: [] },
  { sessao: "Soul", id: "soul_filme", cor: "#06d6a0", categoria: "filmes_list", itens: [] },
  { sessao: "Luca", id: "luca_filme", cor: "#118ab2", categoria: "filmes_list", itens: [] },
  { sessao: "Encanto", id: "encanto_filme", cor: "#073b4c", categoria: "filmes_list", itens: [] },
  { sessao: "Frozen 2", id: "frozen_2_filme", cor: "#ff6d00", categoria: "filmes_list", itens: [] },
  { sessao: "Moana", id: "moana_filme", cor: "#f94144", categoria: "filmes_list", itens: [] },
  { sessao: "O Rei Leao", id: "o_rei_leao_filme", cor: "#06d6a0", categoria: "filmes_list", itens: [] },
  { sessao: "Shrek", id: "shrek_filme", cor: "#073b4c", categoria: "filmes_list", itens: [] },
  { sessao: "Toy Story 4", id: "toy_story_4_filme", cor: "#ff6d00", categoria: "filmes_list", itens: [] },
  { sessao: "O Menino E A Garca", id: "o_menino_e_a_garca_filme", cor: "#ef233c", categoria: "filmes_list", itens: [] },
  { sessao: "Godzilla Minus One", id: "godzilla_minus_one_filme", cor: "#ffd166", categoria: "filmes_list", itens: [] },

  /* ============ SÉRIES (categoria: "series_list") ============ */
  { sessao: "Stranger Things", id: "stranger_things_serie", cor: "#e63946", categoria: "series_list", itens: [] },
  { sessao: "A Casa Do Dragao", id: "a_casa_do_dragao_serie", cor: "#f1faee", categoria: "series_list", itens: [] },
  { sessao: "Os Aneis De Poder", id: "os_aneis_de_poder_serie", cor: "#a8dadc", categoria: "series_list", itens: [] },
  { sessao: "The Last Of Us", id: "the_last_of_us_serie", cor: "#457b9d", categoria: "series_list", itens: [] },
  { sessao: "Round 6", id: "round_6_serie", cor: "#1d3557", categoria: "series_list", itens: [] },
  { sessao: "Wandinha", id: "wandinha_serie", cor: "#fca311", categoria: "series_list", itens: [] },
  { sessao: "Breaking Bad", id: "breaking_bad_serie", cor: "#ff6b6b", categoria: "series_list", itens: [] },
  { sessao: "Game Of Thrones", id: "game_of_thrones_serie", cor: "#6a4c93", categoria: "series_list", itens: [] },
  { sessao: "Peaky Blinders", id: "peaky_blinders_serie", cor: "#ffb703", categoria: "series_list", itens: [] },
  { sessao: "The Boys", id: "the_boys_serie", cor: "#219ebc", categoria: "series_list", itens: [] },
  { sessao: "Invencivel", id: "invencivel_serie", cor: "#023e8a", categoria: "series_list", itens: [] },
  { sessao: "Succession", id: "succession_serie", cor: "#00b4d8", categoria: "series_list", itens: [] },
  { sessao: "The Bear", id: "the_bear_serie", cor: "#7209b7", categoria: "series_list", itens: [] },
  { sessao: "Beef", id: "beef_serie", cor: "#f77f00", categoria: "series_list", itens: [] },
  { sessao: "Lupin", id: "lupin_serie", cor: "#ffbe0b", categoria: "series_list", itens: [] },
  { sessao: "Elite", id: "elite_serie", cor: "#8ac926", categoria: "series_list", itens: [] },
  { sessao: "La Casa De Papel", id: "la_casa_de_papel_serie", cor: "#1982c4", categoria: "series_list", itens: [] },
  { sessao: "Dark", id: "dark_serie", cor: "#6a4c93", categoria: "series_list", itens: [] },
  { sessao: "Black Mirror", id: "black_mirror_serie", cor: "#d62828", categoria: "series_list", itens: [] },
  { sessao: "The Crown", id: "the_crown_serie", cor: "#f77f00", categoria: "series_list", itens: [] },
  { sessao: "Better Call Saul", id: "better_call_saul_serie", cor: "#ffb703", categoria: "series_list", itens: [] },
  { sessao: "Friends", id: "friends_serie", cor: "#023e8a", categoria: "series_list", itens: [] },
  { sessao: "The Office", id: "the_office_serie", cor: "#00b4d8", categoria: "series_list", itens: [] },
  { sessao: "Brooklyn Nine Nine", id: "brooklyn_nine_nine_serie", cor: "#f94144", categoria: "series_list", itens: [] },
  { sessao: "Mandalorian", id: "mandalorian_serie", cor: "#7209b7", categoria: "series_list", itens: [] },
  { sessao: "Ahsoka", id: "ahsoka_serie", cor: "#ff6d00", categoria: "series_list", itens: [] },
  { sessao: "Loki", id: "loki_serie", cor: "#f72585", categoria: "series_list", itens: [] },
  { sessao: "Cavaleiro Da Lua", id: "cavaleiro_da_lua_serie", cor: "#b5179e", categoria: "series_list", itens: [] },
  { sessao: "Wandavision", id: "wandavision_serie", cor: "#3a0ca3", categoria: "series_list", itens: [] },
  { sessao: "Cangaco Novo", id: "cangaço_novo_serie", cor: "#4361ee", categoria: "series_list", itens: [] },
  { sessao: "Sintonia", id: "sintonia_serie", cor: "#4895ef", categoria: "series_list", itens: [] },
  { sessao: "Bom Dia Veronica", id: "bom_dia_veronica_serie", cor: "#4cc9f0", categoria: "series_list", itens: [] },
  { sessao: "Euphoria", id: "euphoria_serie", cor: "#7209b7", categoria: "series_list", itens: [] },
  { sessao: "White Lotus", id: "white_lotus_serie", cor: "#f94144", categoria: "series_list", itens: [] },
  { sessao: "Ted Lasso", id: "ted_lasso_serie", cor: "#ffba08", categoria: "series_list", itens: [] },
  { sessao: "Severance", id: "severance_serie", cor: "#8d99ae", categoria: "series_list", itens: [] },
  { sessao: "Yellowstone", id: "yellowstone_serie", cor: "#ef233c", categoria: "series_list", itens: [] },
  { sessao: "Cobrai Kai", id: "cobrai_kai_serie", cor: "#06d6a0", categoria: "series_list", itens: [] },
  { sessao: "The Witcher", id: "the_witcher_serie", cor: "#118ab2", categoria: "series_list", itens: [] },
  { sessao: "Sandman", id: "sandman_serie", cor: "#073b4c", categoria: "series_list", itens: [] },
  { sessao: "Outlander", id: "outlander_serie", cor: "#ffd166", categoria: "series_list", itens: [] },
  { sessao: "Vikings", id: "vikings_serie", cor: "#06d6a0", categoria: "series_list", itens: [] },
  { sessao: "Spartacus", id: "spartacus_serie", cor: "#118ab2", categoria: "series_list", itens: [] },
  { sessao: "Sherlock", id: "sherlock_serie", cor: "#073b4c", categoria: "series_list", itens: [] },
  { sessao: "Fargo", id: "fargo_serie", cor: "#ff6d00", categoria: "series_list", itens: [] },
  { sessao: "True Detective", id: "true_detective_serie", cor: "#7209b7", categoria: "series_list", itens: [] },
  { sessao: "Chernobyl", id: "chernobyl_serie", cor: "#f94144", categoria: "series_list", itens: [] },
  { sessao: "Band Of Brothers", id: "band_of_brothers_serie", cor: "#06d6a0", categoria: "series_list", itens: [] },

  /* ============ DOCUMENTÁRIOS (categoria: "docs_list") ============ */
  { sessao: "Nosso Planeta", id: "nosso_planeta_doc", cor: "#118ab2", categoria: "docs_list", itens: [] },
  { sessao: "O Golpista Do Tinder", id: "o_golpista_do_tinder_doc", cor: "#073b4c", categoria: "docs_list", itens: [] },
  { sessao: "Phelps", id: "phelps_doc", cor: "#ff6d00", categoria: "docs_list", itens: [] },
  { sessao: "Senna", id: "senna_doc", cor: "#ef233c", categoria: "docs_list", itens: [] },
  { sessao: "Micheal Jordan Arremesso Final", id: "micheal_jordan_arremesso_final_doc", cor: "#ffd166", categoria: "docs_list", itens: [] },
  { sessao: "Formula 1 Dirigir Para Viver", id: "formula_1_dirigir_para_viver_doc", cor: "#06d6a0", categoria: "docs_list", itens: [] },
  { sessao: "Wild Wild Country", id: "wild_wild_country_doc", cor: "#ef476f", categoria: "docs_list", itens: [] },
  { sessao: "Making A Murderer", id: "making_a_murderer_doc", cor: "#06d6a0", categoria: "docs_list", itens: [] },
  { sessao: "O Dilema Das Redes", id: "o_dilema_das_redes_doc", cor: "#118ab2", categoria: "docs_list", itens: [] },
  { sessao: "Professor Polvo", id: "professor_polvo_doc", cor: "#073b4c", categoria: "docs_list", itens: [] },
  { sessao: "Em Busca Dos Corais", id: "em_busca_dos_corais_doc", cor: "#ff6d00", categoria: "docs_list", itens: [] },
  { sessao: "13 Emenda", id: "13_emenda_doc", cor: "#f94144", categoria: "docs_list", itens: [] },
  { sessao: "Apollo 11", id: "apollo_11_doc", cor: "#06d6a0", categoria: "docs_list", itens: [] },
  { sessao: "Pele", id: "pelé_doc", cor: "#118ab2", categoria: "docs_list", itens: [] },

  /* ============ GAMES (categoria: "games_list") ============ */
  { sessao: "The Legend of Zelda: Tears of the Kingdom", id: "zelda_tears_kingdom", cor: "#2a9d8f", categoria: "games_list", itens: [
    { id: "zelda_review_01", label: "Review Completo" },
    { id: "zelda_dicas_01", label: "Dicas para Iniciantes" }
  ]},
  { sessao: "Elden Ring", id: "elden_ring", cor: "#e9c46a", categoria: "games_list", itens: [
    { id: "elden_builds", label: "Melhores Builds" }
  ]},
  { sessao: "God Of War Chains Of Olympus", id: "god_of_war_chains_of_olympus_psp", cor: "#e63946", categoria: "games_list", itens: [] },
  { sessao: "God Of War Ghost Of Sparta", id: "god_of_war_ghost_of_sparta_psp", cor: "#f1faee", categoria: "games_list", itens: [] },
  { sessao: "Gta Vice City Stories", id: "gta_vice_city_stories_psp", cor: "#a8dadc", categoria: "games_list", itens: [] },
  { sessao: "Gta Liberty City Stories", id: "gta_liberty_city_stories_psp", cor: "#457b9d", categoria: "games_list", itens: [] },
  { sessao: "Naruto Shippuden Ultimate Ninja Impact", id: "naruto_shippuden_ultimate_ninja_impact_psp", cor: "#1d3557", categoria: "games_list", itens: [] },
  { sessao: "Dragon Ball Z Tenkaichi Tag Team", id: "dragon_ball_z_tenkaichi_tag_team_psp", cor: "#fca311", categoria: "games_list", itens: [] },
  { sessao: "Tekken 6", id: "tekken_6_psp", cor: "#ff6b6b", categoria: "games_list", itens: [] },
  { sessao: "Assassin Creed Bloodlines", id: "assassin_creed_bloodlines_psp", cor: "#6a4c93", categoria: "games_list", itens: [] },
  { sessao: "Metal Gear Solid Peace Walker", id: "metal_gear_solid_peace_walker_psp", cor: "#ffb703", categoria: "games_list", itens: [] },
  { sessao: "Dragon Ball Z Shin Budokai", id: "dragon_ball_z_shin_budokai_psp", cor: "#219ebc", categoria: "games_list", itens: [] },
  { sessao: "Dragon Ball Z Shin Budokai 2", id: "dragon_ball_z_shin_budokai_2_psp", cor: "#023e8a", categoria: "games_list", itens: [] },
  { sessao: "Need For Speed Most Wanted", id: "need_for_speed_most_wanted_psp", cor: "#00b4d8", categoria: "games_list", itens: [] },
  { sessao: "Need For Speed Carbon", id: "need_for_speed_carbon_psp", cor: "#7209b7", categoria: "games_list", itens: [] },
  { sessao: "Fifa 14", id: "fifa_14_psp", cor: "#f77f00", categoria: "games_list", itens: [] },
  { sessao: "Pes 2014", id: "pes_2014_psp", cor: "#ffbe0b", categoria: "games_list", itens: [] },
  { sessao: "Call Of Duty Roads To Victory", id: "call_of_duty_roads_to_victory_psp", cor: "#8ac926", categoria: "games_list", itens: [] },
  { sessao: "Dante Inferno", id: "dante_inferno_psp", cor: "#1982c4", categoria: "games_list", itens: [] },
  { sessao: "Ben 10 Protector Of Earth", id: "ben_10_protector_of_earth_psp", cor: "#6a4c93", categoria: "games_list", itens: [] },
  { sessao: "Ben 10 Alien Force", id: "ben_10_alien_force_psp", cor: "#d62828", categoria: "games_list", itens: [] },
  { sessao: "Ben 10 Ultimate Alien Cosmic Destruction", id: "ben_10_ultimate_alien_cosmic_destruction_psp", cor: "#f77f00", categoria: "games_list", itens: [] },
  { sessao: "Mortal Kombat Unchained", id: "mortal_kombat_unchained_psp", cor: "#ffb703", categoria: "games_list", itens: [] },
  { sessao: "Spider Man 3", id: "spider_man_3_psp", cor: "#023e8a", categoria: "games_list", itens: [] },
  { sessao: "Midnight Club 3 Dub Edition", id: "midnight_club_3_dub_edition_psp", cor: "#00b4d8", categoria: "games_list", itens: [] },
  { sessao: "Kingdom Hearts Birth By Sleep", id: "kingdom_hearts_birth_by_sleep_psp", cor: "#f94144", categoria: "games_list", itens: [] },
  { sessao: "Crisis Core Final Fantasy Vii", id: "crisis_core_final_fantasy_vii_psp", cor: "#7209b7", categoria: "games_list", itens: [] },
  { sessao: "Final Fantasy Type 0", id: "final_fantasy_type_0_psp", cor: "#ff6d00", categoria: "games_list", itens: [] },
  { sessao: "Monster Hunter Freedom Unite", id: "monster_hunter_freedom_unite_psp", cor: "#f72585", categoria: "games_list", itens: [] },
  { sessao: "Monster Hunter Portable 3rd", id: "monster_hunter_portable_3rd_psp", cor: "#b5179e", categoria: "games_list", itens: [] },
  { sessao: "Gran Turismo", id: "gran_turismo_psp", cor: "#3a0ca3", categoria: "games_list", itens: [] },
  { sessao: "Motorstorm Arctic Edge", id: "motorstorm_arctic_edge_psp", cor: "#4361ee", categoria: "games_list", itens: [] },
  { sessao: "Burn Out Legends", id: "burn_out_legends_psp", cor: "#4895ef", categoria: "games_list", itens: [] },
  { sessao: "Burn Out Dominator", id: "burn_out_dominator_psp", cor: "#4cc9f0", categoria: "games_list", itens: [] },
  { sessao: "Ratchet And Clank Size Matters", id: "ratchet_and_clank_size_matters_psp", cor: "#7209b7", categoria: "games_list", itens: [] },
  { sessao: "Daxter", id: "daxter_psp", cor: "#f94144", categoria: "games_list", itens: [] },
  { sessao: "Jak And Daxter The Lost Frontier", id: "jak_and_daxter_the_lost_frontier_psp", cor: "#ffba08", categoria: "games_list", itens: [] },
  { sessao: "Resistance Retribution", id: "resistance_retribution_psp", cor: "#8d99ae", categoria: "games_list", itens: [] },
  { sessao: "Killzone Liberation", id: "killzone_liberation_psp", cor: "#ef233c", categoria: "games_list", itens: [] },
  { sessao: "Silent Hill Origins", id: "silent_hill_origins_psp", cor: "#06d6a0", categoria: "games_list", itens: [] },
  { sessao: "Silent Hill Shattered Memories", id: "silent_hill_shattered_memories_psp", cor: "#118ab2", categoria: "games_list", itens: [] },
  { sessao: "Resident Evil Diretor Cut", id: "resident_evil_diretor_cut_psp", cor: "#073b4c", categoria: "games_list", itens: [] },
  { sessao: "Castlevania The Dracula X Chronicles", id: "castlevania_the_dracula_x_chronicles_psp", cor: "#ffd166", categoria: "games_list", itens: [] },
  { sessao: "Mega Man Powered Up", id: "mega_man_powered_up_psp", cor: "#06d6a0", categoria: "games_list", itens: [] },
  { sessao: "Maverick Hunter X", id: "maverick_hunter_x_psp", cor: "#118ab2", categoria: "games_list", itens: [] },
  { sessao: "Street Fighter Alpha 3 Max", id: "street_fighter_alpha_3_max_psp", cor: "#073b4c", categoria: "games_list", itens: [] },
  { sessao: "Soul Calibur Broken Destiny", id: "soul_calibur_broken_destiny_psp", cor: "#ff6d00", categoria: "games_list", itens: [] },
  { sessao: "Injustice Gods Among Us", id: "injustice_gods_among_us_psp", cor: "#7209b7", categoria: "games_list", itens: [] },
  { sessao: "Ufc Undisputed 2010", id: "ufc_undisputed_2010_psp", cor: "#f94144", categoria: "games_list", itens: [] },
  { sessao: "Wwe Smackdown Vs Raw 2011", id: "wwe_smackdown_vs_raw_2011_psp", cor: "#06d6a0", categoria: "games_list", itens: [] },
  { sessao: "Def Jam Fight For Ny Takeover", id: "def_jam_fight_for_ny_takeover_psp", cor: "#073b4c", categoria: "games_list", itens: [] },
  { sessao: "The 3rd Birthday", id: "the_3rd_birthday_psp", cor: "#118ab2", categoria: "games_list", itens: [] },
  { sessao: "Parasite Eve", id: "parasite_eve_psp", cor: "#06d6a0", categoria: "games_list", itens: [] },
  { sessao: "Tomb Raider Anniversary", id: "tomb_raider_anniversary_psp", cor: "#ffd166", categoria: "games_list", itens: [] },
  { sessao: "Tomb Raider Legend", id: "tomb_raider_legend_psp", cor: "#ef476f", categoria: "games_list", itens: [] },
  { sessao: "Star Wars Battlefront Ii", id: "star_wars_battlefront_ii_psp", cor: "#06d6a0", categoria: "games_list", itens: [] },
  { sessao: "Star Wars The Force Unleashed", id: "star_wars_the_force_unleashed_psp", cor: "#118ab2", categoria: "games_list", itens: [] },
  { sessao: "Lego Batman The Videogame", id: "lego_batman_the_videogame_psp", cor: "#073b4c", categoria: "games_list", itens: [] },
  { sessao: "Lego Star Wars Iii The Clone Wars", id: "lego_star_wars_iii_the_clone_wars_psp", cor: "#ff6d00", categoria: "games_list", itens: [] },
  { sessao: "Lego Harry Potter", id: "lego_harry_potter_psp", cor: "#f94144", categoria: "games_list", itens: [] },
  { sessao: "Toy Story 3", id: "toy_story_3_psp", cor: "#06d6a0", categoria: "games_list", itens: [] },
  { sessao: "Cars 2", id: "cars_2_psp", cor: "#073b4c", categoria: "games_list", itens: [] },
  { sessao: "Avatar The Last Airbender", id: "avatar_the_last_airbender_psp", cor: "#ff6d00", categoria: "games_list", itens: [] },
  { sessao: "Bleach Soul Resurreccion", id: "bleach_soul_resurreccion_psp", cor: "#ef233c", categoria: "games_list", itens: [] },
  { sessao: "Bleach Heat The Soul 7", id: "bleach_heat_the_soul_7_psp", cor: "#ffd166", categoria: "games_list", itens: [] },
  { sessao: "Hunter X Hunter Wonder Adventure", id: "hunter_x_hunter_wonder_adventure_psp", cor: "#06d6a0", categoria: "games_list", itens: [] },
  { sessao: "One Piece Romance Dawn", id: "one_piece_romance_dawn_psp", cor: "#118ab2", categoria: "games_list", itens: [] },
  { sessao: "Fairy Tail Portable Guild", id: "fairy_tail_portable_guild_psp", cor: "#073b4c", categoria: "games_list", itens: [] },
  { sessao: "Digimon World Re Digitize", id: "digimon_world_re_digitize_psp", cor: "#ffd166", categoria: "games_list", itens: [] },
  { sessao: "Yu Gi Oh 5ds Tag Force 6", id: "yu_gi_oh_5ds_tag_force_6_psp", cor: "#06d6a0", categoria: "games_list", itens: [] },
  { sessao: "Persona 3 Portable", id: "persona_3_portable_psp", cor: "#118ab2", categoria: "games_list", itens: [] },
  { sessao: "Shin Megami Tensei Persona", id: "shin_megami_tensei_persona_psp", cor: "#ff6d00", categoria: "games_list", itens: [] },
  { sessao: "Fate Extra", id: "fate_extra_psp", cor: "#f94144", categoria: "games_list", itens: [] },
  { sessao: "Fate Unlimited Codes", id: "fate_unlimited_codes_psp", cor: "#06d6a0", categoria: "games_list", itens: [] },
  { sessao: "Dissidia 012 Duodecim Final Fantasy", id: "dissidia_012_duodecim_final_fantasy_psp", cor: "#073b4c", categoria: "games_list", itens: [] },
  { sessao: "Phantasy Star Portable 2", id: "phantasy_star_portable_2_psp", cor: "#ff6d00", categoria: "games_list", itens: [] },
  { sessao: "Valkyria Chronicles Ii", id: "valkyria_chronicles_ii_psp", cor: "#ef233c", categoria: "games_list", itens: [] },
  { sessao: "Tactics Ogre Let Us Cling Together", id: "tactics_ogre_let_us_cling_together_psp", cor: "#ffd166", categoria: "games_list", itens: [] },
  { sessao: "Final Fantasy Tactics The War Of The Lions", id: "final_fantasy_tactics_the_war_of_the_lions_psp", cor: "#06d6a0", categoria: "games_list", itens: [] },
  { sessao: "Disgaea Afternoon Of Darkness", id: "disgaea_afternoon_of_darkness_psp", cor: "#118ab2", categoria: "games_list", itens: [] },
  { sessao: "Ridge Racer", id: "ridge_racer_psp", cor: "#073b4c", categoria: "games_list", itens: [] },
  { sessao: "Wipeout Pure", id: "wipeout_pure_psp", cor: "#ffd166", categoria: "games_list", itens: [] },
  { sessao: "Wipeout Pulse", id: "wipeout_pulse_psp", cor: "#06d6a0", categoria: "games_list", itens: [] },
  { sessao: "Sonic Rivals", id: "sonic_rivals_psp", cor: "#118ab2", categoria: "games_list", itens: [] },
  { sessao: "Sonic Rivals 2", id: "sonic_rivals_2_psp", cor: "#ff6d00", categoria: "games_list", itens: [] },
  { sessao: "Crash Mind Over Mutant", id: "crash_mind_over_mutant_psp", cor: "#f94144", categoria: "games_list", itens: [] },
  { sessao: "Crash Of The Titans", id: "crash_of_the_titans_psp", cor: "#06d6a0", categoria: "games_list", itens: [] },
  { sessao: "Crash Tag Team Racing", id: "crash_tag_team_racing_psp", cor: "#073b4c", categoria: "games_list", itens: [] },
  { sessao: "Spyro The Dragon", id: "spyro_the_dragon_psp", cor: "#ff6d00", categoria: "games_list", itens: [] },
  { sessao: "Pac Man World 3", id: "pac_man_world_3_psp", cor: "#ef233c", categoria: "games_list", itens: [] },
  { sessao: "Medievil Resurrection", id: "medievil_resurrection_psp", cor: "#ffd166", categoria: "games_list", itens: [] },
  { sessao: "Twisted Metal Head On", id: "twisted_metal_head_on_psp", cor: "#06d6a0", categoria: "games_list", itens: [] },
  { sessao: "Syphon Filter Logan Shadow", id: "syphon_filter_logan_shadow_psp", cor: "#118ab2", categoria: "games_list", itens: [] },
  { sessao: "Syphon Filter Dark Mirror", id: "syphon_filter_dark_mirror_psp", cor: "#073b4c", categoria: "games_list", itens: [] },
  { sessao: "Splinter Cell Essentials", id: "splinter_cell_essentials_psp", cor: "#ffd166", categoria: "games_list", itens: [] },
  { sessao: "Prince Of Persia Revelations", id: "prince_of_persia_revelations_psp", cor: "#06d6a0", categoria: "games_list", itens: [] },
  { sessao: "Prince Of Persia The Forgotten Sands", id: "prince_of_persia_the_forgotten_sands_psp", cor: "#118ab2", categoria: "games_list", itens: [] },
  { sessao: "Driver 76", id: "driver_76_psp", cor: "#ff6d00", categoria: "games_list", itens: [] },
  { sessao: "Scarface Money Power Respect", id: "scarface_money_power_respect_psp", cor: "#f94144", categoria: "games_list", itens: [] },
  { sessao: "The Warriors", id: "the_warriors_psp", cor: "#06d6a0", categoria: "games_list", itens: [] },
  { sessao: "Manhunt 2", id: "manhunt_2_psp", cor: "#073b4c", categoria: "games_list", itens: [] },
  { sessao: "50 Cent Bulletproof G Unit Edition", id: "50_cent_bulletproof_g_unit_edition_psp", cor: "#ff6d00", categoria: "games_list", itens: [] }
];



/* ===========================
   CSS INJETADO (ATUALIZADO COM ABAS DE CATEGORIA)
=========================== */
const styles = `
  /* --- LAYOUT DA GAVETA --- */
  #ag-drawer {
    background: #ffffff;
    border-bottom: 1px solid #e0e0e0;
    overflow: hidden;
    max-height: 0;
    transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
    opacity: 0;
    width: 100%;
    position: absolute;
    left: 0;
    z-index: 1000;
    box-shadow: 0 10.5px 21px rgba(0,0,0,0.08);
  }

  body.dark-mode #ag-drawer {
    background: #141414;
    border-color: #333;
    box-shadow: 0 10.5px 21px rgba(0,0,0,0.5);
  }

  #ag-drawer.open {
    max-height: 85vh;
    opacity: 1;
  }

  /* --- CAPA DO MENU --- */
  .ag-drawer-cover {
    position: relative;
    width: 100%;
    height: 120px;
    background-image: url('https://iili.io/q3aI4nI.md.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    margin-bottom: 21px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }

  body.dark-mode .ag-drawer-cover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  }

  .ag-char-fixed {
    position: absolute;
    bottom: 0;
    right: 0;
    height: 95%;
    width: auto;
    max-width: 50vw;
    object-fit: contain;
    object-position: bottom right;
    pointer-events: none;
    z-index: 0;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }

  #ag-drawer.open .ag-char-fixed {
    opacity: 1;
  }

  .ag-drawer-scroll {
    position: relative;
    z-index: 5;
    max-height: 85vh;
    overflow-y: auto;
    padding: 21px 14px;
    scrollbar-width: thin;
  }

  /* --- HEADER: PESQUISA E MODOS --- */
  .ag-drawer-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 14px;
    flex-wrap: wrap;
    max-width: 840px;
    position: sticky;
    top: -21px;
    z-index: 100;
    margin: -21px auto 21px auto;
    padding: 17.5px 0;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(8.4px);
    -webkit-backdrop-filter: blur(8.4px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    transition: background 0.3s ease;
  }

  body.dark-mode .ag-drawer-header {
    background: rgba(20, 20, 20, 0.85);
    border-color: rgba(255, 255, 255, 0.08);
  }

  .ag-drawer-header::after {
    content: '';
    position: absolute;
    bottom: -14px;
    left: 0;
    width: 100%;
    height: 14px;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.9), transparent);
    pointer-events: none;
  }

  body.dark-mode .ag-drawer-header::after {
    background: linear-gradient(to bottom, rgba(20, 20, 20, 0.9), transparent);
  }

  .ag-search-wrapper {
    position: relative;
    flex: 1;
    min-width: 196px;
  }

  .ag-search-icon-svg {
    position: absolute;
    left: 9.8px;
    top: 50%;
    transform: translateY(-50%);
    width: 12.6px;
    height: 12.6px;
    fill: #999;
    pointer-events: none;
  }

  .ag-search-input {
    width: 100%;
    padding: 7.7px 10.5px 7.7px 31.5px;
    border-radius: 7px;
    border: 1px solid rgba(0,0,0,0.1);
    background: rgba(0,0,0,0.04);
    font-size: 9.8px;
    font-weight: 500;
    outline: none;
    transition: all 0.3s ease;
  }

  body.dark-mode .ag-search-input {
    background: rgba(255,255,255,0.05);
    border-color: rgba(255,255,255,0.1);
    color: #fff;
  }

  .ag-search-input:focus {
    background: #fff;
    border-color: var(--primary-color, #e50914);
    box-shadow: 0 2.8px 10.5px rgba(0,0,0,0.08);
  }
  body.dark-mode .ag-search-input:focus { background: #252525; }

  /* --- BOTÕES DE MODO --- */
  .ag-mode-group {
    background: rgba(0,0,0,0.05);
    padding: 2.8px;
    border-radius: 7px;
    display: flex;
  }
  body.dark-mode .ag-mode-group { background: rgba(255,255,255,0.08); }

  .ag-mode-btn {
    padding: 5.6px 11.2px;
    border: none;
    background: transparent;
    border-radius: 4.9px;
    font-size: 7.7px; font-weight: 800;
    color: #888;
    cursor: pointer;
    text-transform: uppercase;
    transition: all 0.2s;
  }

  .ag-mode-btn.active {
    background: #fff;
    color: #000;
    box-shadow: 0 1.4px 5.6px rgba(0,0,0,0.12);
  }
  body.dark-mode .ag-mode-btn.active {
    background: #333;
    color: #fff;
  }

  /* === NOVO: ABAS DE CATEGORIA === */
  .ag-category-tabs {
    display: flex;
    gap: 7px;
    margin: 14px 0 21px 0;
    padding: 7px 0;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    flex-wrap: nowrap;
  }
  .ag-category-tabs::-webkit-scrollbar { display: none; }

  .ag-category-tab {
    padding: 7px 14px;
    border: none;
    border-radius: 21px;
    background: rgba(0,0,0,0.05);
    color: #555;
    font-size: 9.1px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
    text-transform: uppercase;
  }

  body.dark-mode .ag-category-tab {
    background: rgba(255,255,255,0.08);
    color: #ccc;
  }

  .ag-category-tab:hover {
    background: rgba(0,0,0,0.1);
    transform: translateY(-1px);
  }
  body.dark-mode .ag-category-tab:hover {
    background: rgba(255,255,255,0.15);
  }

  .ag-category-tab.active {
    background: var(--primary-color, #e50914);
    color: #fff !important;
    box-shadow: 0 3.5px 10.5px rgba(229, 9, 20, 0.3);
  }

  /* --- SESSÕES --- */
  .ag-section-block {
    margin-bottom: 24.5px;
    max-width: 840px;
    margin-left: auto;
    margin-right: auto;
  }

  .ag-section-header-btn {
    display: flex;
    align-items: center;
    gap: 7px;
    margin-bottom: 8.4px;
    background: transparent;
    border: none;
    padding: 3.5px 0;
    cursor: pointer;
    width: fit-content;
    transition: 0.2s;
  }

  .ag-section-header-btn:hover { opacity: 0.7; }

  .ag-section-text {
    font-size: 9.8px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.7px;
    color: #333;
  }
  body.dark-mode .ag-section-text { color: #fff; }

  .ag-section-header-btn.is-active .ag-section-text {
    color: var(--primary-color, #e50914);
    text-decoration: underline;
    text-decoration-thickness: 1.4px;
    text-underline-offset: 2.8px;
  }

  .ag-section-marker {
    width: 7px;
    height: 7px;
    border-radius: 2.1px;
    box-shadow: 0 0 3.5px rgba(0,0,0,0.2);
  }

  /* --- GRID --- */
  .ag-grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(105px, 1fr));
    gap: 7px;
  }

  .ag-card {
    position: relative;
    background: #f9f9f9;
    border: 1px solid transparent;
    border-radius: 4.2px;
    padding: 8.4px 7px;
    font-size: 9.1px;
    font-weight: 500;
    color: #444;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  body.dark-mode .ag-card {
    background: #1e1e1e;
    color: #ccc;
  }

  .ag-card:hover {
    background: #ececec;
    transform: translateY(-1.4px);
  }
  body.dark-mode .ag-card:hover { background: #2a2a2a; }

  .ag-card.is-selected {
    background: #fff;
    border-color: var(--primary-color, #e50914);
    color: var(--primary-color, #e50914);
    box-shadow: inset 0 0 0 0.7px var(--primary-color, #e50914);
    font-weight: 700;
  }
  body.dark-mode .ag-card.is-selected { background: #1a1a1a; }

  .ag-card-action {
    position: absolute;
    top: 2.1px;
    right: 2.8px;
    width: 11.2px;
    height: 11.2px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 7px;
    border-radius: 50%;
    color: inherit;
    opacity: 0.6;
    transition: 0.2s;
  }

  .ag-card-action:hover {
    background: var(--primary-color, #e50914);
    color: #fff !important;
    opacity: 1;
  }

  /* --- TOAST --- */
  #ag-toast-container {
    position: fixed;
    bottom: 21px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 99999;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    gap: 7px;
  }

  .ag-toast {
    background: rgba(30, 30, 30, 0.95);
    color: #fff;
    padding: 8.4px 16.8px;
    border-radius: 35px;
    font-size: 9.1px;
    font-weight: 600;
    box-shadow: 0 3.5px 10.5px rgba(0,0,0,0.3);
    backdrop-filter: blur(3.5px);
    opacity: 0;
    transform: translateY(14px);
    animation: agSlideUp 0.3s forwards;
    display: flex;
    align-items: center;
    gap: 7px;
  }

  .ag-toast.error { border-left: 2.8px solid #ff4444; }
  .ag-toast.success { border-left: 2.8px solid #00C851; }

  @keyframes agSlideUp {
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes agFadeOut {
    to { opacity: 0; transform: translateY(-7px); }
  }

  /* --- BARRA DE FILTROS --- */
  #filterScroller {
    display: flex;
    align-items: center;
    position: relative;
    gap: 5.6px;
    padding-right: 0 !important;
    overflow-x: auto;
    scrollbar-width: none;
    flex-wrap: nowrap;
  }
  #filterScroller::-webkit-scrollbar { display: none; }

  .filter-tag.cfg-btn {
    position: sticky;
    right: 0 !important;
    z-index: 99;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(5.6px);
    -webkit-backdrop-filter: blur(5.6px);
    min-width: 33.6px;
    height: 23.8px;
    margin-left: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-left: 1px solid rgba(0, 0, 0, 0.05);
    box-shadow: -7px 0 14px rgba(0, 0, 0, 0.05);
    cursor: pointer;
    font-size: 12.6px;
    transition: all 0.3s ease;
  }

  .filter-tag.cfg-btn::before {
    content: '';
    position: absolute;
    left: -14px;
    top: 0;
    width: 14px;
    height: 100%;
    background: linear-gradient(to right, transparent, rgba(255,255,255,0.9));
    pointer-events: none;
  }

  body.dark-mode .filter-tag.cfg-btn {
    background: rgba(20, 20, 20, 0.9);
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: -10.5px 0 17.5px rgba(0, 0, 0, 0.5);
  }

  body.dark-mode .filter-tag.cfg-btn::before {
    background: linear-gradient(to right, transparent, rgba(20, 20, 20, 0.9));
  }

  .filter-tag.cfg-btn:active {
    transform: scale(0.9);
    opacity: 0.8;
  }

  /* --- BARRA DE PESQUISA FIXA --- */
  .ag-top-bar {
    position: sticky;
    top: 0;
    z-index: 1100;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    padding: 14px 0;
    border-bottom: 1px solid rgba(0,0,0,0.05);
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  }

  body.dark-mode .ag-top-bar {
    background: rgba(20, 20, 20, 0.95);
    border-color: rgba(255,255,255,0.1);
    box-shadow: 0 2px 10px rgba(0,0,0,0.3);
  }

  .ag-top-bar-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 21px;
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .ag-top-search {
    flex: 1;
    min-width: 200px;
  }

  .ag-top-search input {
    width: 100%;
    padding: 8px 12px 8px 32px;
    border-radius: 8px;
    border: 1px solid rgba(0,0,0,0.1);
    background: rgba(0,0,0,0.03);
    font-size: 14px;
    outline: none;
    transition: all 0.3s;
  }

  body.dark-mode .ag-top-search input {
    background: rgba(255,255,255,0.05);
    border-color: rgba(255,255,255,0.1);
    color: #fff;
  }

  .ag-top-search input:focus {
    border-color: var(--primary-color, #e50914);
    background: #fff;
    box-shadow: 0 0 15px rgba(229, 9, 20, 0.1);
  }

  body.dark-mode .ag-top-search input:focus {
    background: #2a2a2a;
  }

  .ag-top-buttons {
    display: flex;
    gap: 8px;
  }

  .ag-top-btn {
    padding: 8px 16px;
    border: none;
    border-radius: 8px;
    background: rgba(0,0,0,0.05);
    color: #333;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  body.dark-mode .ag-top-btn {
    background: rgba(255,255,255,0.08);
    color: #fff;
  }

  .ag-top-btn:hover {
    background: rgba(0,0,0,0.1);
    transform: translateY(-2px);
  }

  body.dark-mode .ag-top-btn:hover {
    background: rgba(255,255,255,0.15);
  }

  .ag-top-btn.active {
    background: var(--primary-color, #e50914);
    color: #fff;
    box-shadow: 0 4px 12px rgba(229, 9, 20, 0.3);
  }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

/* ===========================
   SISTEMA DE TOAST
=========================== */
function showToast(message, type = 'normal') {
  let container = document.getElementById('ag-toast-container');
  if(!container) {
    container = document.createElement('div');
    container.id = 'ag-toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `ag-toast ${type}`;
  toast.innerHTML = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'agFadeOut 0.3s forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/* ===========================
   LÓGICA CORE
=========================== */
function load(k,d){ try{ return JSON.parse(localStorage.getItem(k)) ?? d }catch(e){ return d } }
function save(k,v){ localStorage.setItem(k,JSON.stringify(v)); }

function getMode(){ return load(CONFIG.KEYS.MODE, 'dynamic'); }
function setMode(m){ save(CONFIG.KEYS.MODE, m); renderDrawer(); }

function getOrder(){
  const saved = load(CONFIG.KEYS.ORDER, null);
  if(saved) return saved;
  return ['anime_i_geek', 'saihate_no_paladin', 'Jujutsu_kaisen_shimetsu_kaiyu'];
}

function findItem(id){
  for(let sec of CATALOGO){
    if(sec.id === id) return sec;
    const item = sec.itens.find(i => i.id === id);
    if(item) return item;
  }
  return null;
}

function track(id){
  if(getMode() !== 'dynamic') return;
  const stats = load(CONFIG.KEYS.STATS, {});
  stats[id] = (stats[id] || 0) + 1;
  save(CONFIG.KEYS.STATS, stats);

  const order = getOrder();
  order.sort((a,b) => (stats[b]||0) - (stats[a]||0));
  save(CONFIG.KEYS.ORDER, order);
}

/* ===========================
   VARIÁVEL GLOBAL PARA FILTRO DE CATEGORIA
=========================== */
let categoriaAtiva = null; // null = todas as categorias

/* ===========================
   RENDERIZAÇÃO BARRA HORIZONTAL
=========================== */
function renderBar(){
  const bar = document.getElementById('filterScroller');
  if(!bar) return;

  let drawer = document.getElementById('ag-drawer');
  if(!drawer) {
    drawer = document.createElement('div');
    drawer.id = 'ag-drawer';
    bar.parentNode.insertBefore(drawer, bar.nextSibling);
  }

  const order = getOrder();
  bar.innerHTML = '';

  order.forEach(id => {
    const item = findItem(id);
    if(!item) return;

    const btn = document.createElement('button');
    btn.className = 'filter-tag';
    btn.textContent = item.label || item.sessao;
    btn.dataset.id = id;
    btn.onclick = () => {
      document.querySelectorAll('#filterScroller .filter-tag').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      track(id);
      document.getElementById('ag-drawer').classList.remove('open');

      const url = new URL(window.location);
      url.searchParams.set('secao', id);
      window.history.replaceState({}, '', url);

      if(window.carregarSecao) window.carregarSecao(id);
      else console.log("Carregando:", id);
    };
    bar.appendChild(btn);
  });

  const cfg = document.createElement('button');
  cfg.className = 'filter-tag cfg-btn';
  cfg.innerHTML = '⚙';
  cfg.onclick = toggleDrawer;
  bar.appendChild(cfg);
}

/* ===========================
   GAVETA (DRAWER)
=========================== */
function toggleDrawer(){
  const drawer = document.getElementById('ag-drawer');
  if(!drawer) return;

  if(drawer.classList.contains('open')){
    drawer.classList.remove('open');
  } else {
    renderDrawer();
    drawer.classList.add('open');
    // ✅ CORREÇÃO: NÃO focar no input ao abrir o drawer
    // Removido qualquer .focus() que poderia abrir o teclado no mobile
  }
}

function renderDrawer(filterText = ""){
  const drawer = document.getElementById('ag-drawer');
  const currentOrder = getOrder();
  const currentMode = getMode();

  const searchIcon = `<svg class="ag-search-icon-svg" viewBox="0 0 24 24"><path d="M21.71 20.29l-5.01-5.01C17.54 13.68 18 11.91 18 10c0-4.41-3.59-8-8-8S2 5.59 2 10s3.59 8 8 8c1.91 0 3.68-.46 5.28-1.3l5.01 5.01c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41z"/></svg>`;

  // === NOVO: HTML das abas de categoria ===
  const categoryTabsHTML = `
    <div class="ag-category-tabs" id="ag-category-tabs">
      ${CONFIG.CATEGORIES.map(cat => `
        <button class="ag-category-tab ${categoriaAtiva === cat.id ? 'active' : ''}" 
                data-cat="${cat.id}" 
                style="--cat-cor: ${cat.cor}">
          ${cat.label}
        </button>
      `).join('')}
      <button class="ag-category-tab ${categoriaAtiva === null ? 'active' : ''}" data-cat="all">
        Todos
      </button>
    </div>
  `;

  let html = `
    <div class="ag-drawer-cover"></div>

    <div class="ag-drawer-scroll">
      <div class="ag-drawer-header">
        <div class="ag-search-wrapper">
          ${searchIcon}
          <input type="text" class="ag-search-input" id="ag-search-input" placeholder="Pesquisar..." value="${filterText}" autocomplete="off">
        </div>

        <div class="ag-mode-group">
          <button id="btn-fixo" class="ag-mode-btn ${currentMode==='fixed'?'active':''}">Fixo</button>
          <button id="btn-dinamico" class="ag-mode-btn ${currentMode==='dynamic'?'active':''}">Automático</button>
        </div>
      </div>

      ${categoryTabsHTML}

      <div id="ag-catalog-container"></div>

      <div style="text-align:center; padding-top:20px; font-size:12px; color:#888;">
        ${currentOrder.length} de ${CONFIG.MAX_TABS} abas ativas
      </div>
    </div>
  `;

  drawer.innerHTML = html;

  // === NOVO: Listener para abas de categoria ===
  document.querySelectorAll('.ag-category-tab').forEach(tab => {
    tab.onclick = (e) => {
      e.preventDefault();
      const catId = tab.dataset.cat;
      categoriaAtiva = catId === 'all' ? null : catId;
      
      // Atualiza visual das abas
      document.querySelectorAll('.ag-category-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Re-renderiza o catálogo com o novo filtro
      renderCatalogList(filterText);
    };
  });

  const container = document.getElementById('ag-catalog-container');
  const term = filterText.toLowerCase();

  // Renderiza apenas as sessões que correspondem ao filtro de categoria + busca
  CATALOGO.forEach(sec => {
    // Filtra por categoria primeiro
    if(categoriaAtiva && sec.categoria !== categoriaAtiva) return;
    
    const itensFiltrados = sec.itens.filter(i => i.label.toLowerCase().includes(term));
    const sessaoMatch = sec.sessao.toLowerCase().includes(term);

    if(term !== "" && !sessaoMatch && itensFiltrados.length === 0) return;
    const itensParaMostrar = sessaoMatch ? sec.itens : itensFiltrados;

    const sectionDiv = document.createElement('div');
    sectionDiv.className = 'ag-section-block';

    const isCatSelected = currentOrder.includes(sec.id);
    let catIcon = '';
    if(isCatSelected) {
       catIcon = currentMode === 'dynamic' ? ' <span style="font-size:10px; opacity:0.6; margin-left:5px">✕</span>' : ' <span style="font-size:10px; opacity:0.6; margin-left:5px">•••</span>';
    }

    sectionDiv.innerHTML = `
      <button class="ag-section-header-btn ${isCatSelected ? 'is-active' : ''}" data-cat-id="${sec.id}">
        <div class="ag-section-marker" style="background:${sec.cor}"></div>
        <span class="ag-section-text">${sec.sessao}${catIcon}</span>
      </button>
      <div class="ag-grid-container"></div>
    `;

    sectionDiv.querySelector('.ag-section-header-btn').onclick = (e) => {
        if(isCatSelected && currentMode === 'fixed') {
             handleAction(sec.id, sec.sessao);
        } else {
             toggleItem(sec.id, sec.sessao);
        }
    };

    container.appendChild(sectionDiv);
    const grid = sectionDiv.querySelector('.ag-grid-container');

    itensParaMostrar.forEach(item => {
      const isSelected = currentOrder.includes(item.id);

      const card = document.createElement('div');
      card.className = `ag-card ${isSelected ? 'is-selected' : ''}`;

      let actionIcon = '';
      if(isSelected) {
        actionIcon = currentMode === 'dynamic' ? '✕' : '•••';
      }

      card.innerHTML = `
        ${item.label}
        ${isSelected ? `<div class="ag-card-action" data-id="${item.id}" data-action="true">${actionIcon}</div>` : ''}
      `;

      card.onclick = (e) => {
        if(e.target.dataset.action || e.target.parentNode.dataset.action) {
          e.stopPropagation();
          handleAction(item.id, item.label);
          return;
        }
        toggleItem(item.id, item.label);
      };

      grid.appendChild(card);
    });
  });

  const searchInput = document.getElementById('ag-search-input');
  
  // ✅ CORREÇÃO: Não focar automaticamente no input
  // Removido: searchInput.focus() - isso causava o teclado abrir no mobile
  
  searchInput.oninput = (e) => {
    filterDrawer(e.target.value);
  };

  document.getElementById('btn-fixo').onclick = () => setMode('fixed');
  document.getElementById('btn-dinamico').onclick = () => setMode('dynamic');
}

// Função para filtrar os elementos existentes, sem recriar o drawer
function filterDrawer(term) {
  const termLower = term.toLowerCase();
  document.querySelectorAll('.ag-section-block').forEach(block => {
    const catId = block.querySelector('.ag-section-header-btn').dataset.catId;
    const cat = CATALOGO.find(c => c.id === catId);
    if (!cat) return;

    // Aplica filtro de categoria primeiro
    if(categoriaAtiva && cat.categoria !== categoriaAtiva) {
      block.style.display = 'none';
      return;
    }

    const sessaoMatch = cat.sessao.toLowerCase().includes(termLower);
    const itensFiltrados = cat.itens.filter(i => i.label.toLowerCase().includes(termLower));
    const grid = block.querySelector('.ag-grid-container');
    const headerBtn = block.querySelector('.ag-section-header-btn');

    if (termLower !== "" && !sessaoMatch && itensFiltrados.length === 0) {
      block.style.display = 'none';
      return;
    }
    block.style.display = '';

    grid.querySelectorAll('.ag-card').forEach(card => {
      const label = card.textContent.trim();
      if (label.toLowerCase().includes(termLower) || sessaoMatch) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

/* ===========================
   RENDERIZAÇÃO DO CATÁLOGO COM FILTRO DE CATEGORIA
=========================== */
function renderCatalogList(filterText = "") {
  const container = document.getElementById('ag-catalog-container');
  if(!container) return;
  
  container.innerHTML = '';
  const term = filterText.toLowerCase();
  const currentOrder = getOrder();
  const currentMode = getMode();

  CATALOGO.forEach(sec => {
    // Filtra por categoria
    if(categoriaAtiva && sec.categoria !== categoriaAtiva) return;
    
    const itensFiltrados = sec.itens.filter(i => i.label.toLowerCase().includes(term));
    const sessaoMatch = sec.sessao.toLowerCase().includes(term);

    if(term !== "" && !sessaoMatch && itensFiltrados.length === 0) return;
    const itensParaMostrar = sessaoMatch ? sec.itens : itensFiltrados;

    const sectionDiv = document.createElement('div');
    sectionDiv.className = 'ag-section-block';

    const isCatSelected = currentOrder.includes(sec.id);
    let catIcon = '';
    if(isCatSelected) {
       catIcon = currentMode === 'dynamic' ? ' <span style="font-size:10px; opacity:0.6; margin-left:5px">✕</span>' : ' <span style="font-size:10px; opacity:0.6; margin-left:5px">•••</span>';
    }

    sectionDiv.innerHTML = `
      <button class="ag-section-header-btn ${isCatSelected ? 'is-active' : ''}" data-cat-id="${sec.id}">
        <div class="ag-section-marker" style="background:${sec.cor}"></div>
        <span class="ag-section-text">${sec.sessao}${catIcon}</span>
      </button>
      <div class="ag-grid-container"></div>
    `;

    sectionDiv.querySelector('.ag-section-header-btn').onclick = (e) => {
        if(isCatSelected && currentMode === 'fixed') {
             handleAction(sec.id, sec.sessao);
        } else {
             toggleItem(sec.id, sec.sessao);
        }
    };

    container.appendChild(sectionDiv);
    const grid = sectionDiv.querySelector('.ag-grid-container');

    itensParaMostrar.forEach(item => {
      const isSelected = currentOrder.includes(item.id);

      const card = document.createElement('div');
      card.className = `ag-card ${isSelected ? 'is-selected' : ''}`;

      let actionIcon = '';
      if(isSelected) {
        actionIcon = currentMode === 'dynamic' ? '✕' : '•••';
      }

      card.innerHTML = `
        ${item.label}
        ${isSelected ? `<div class="ag-card-action" data-id="${item.id}" data-action="true">${actionIcon}</div>` : ''}
      `;

      card.onclick = (e) => {
        if(e.target.dataset.action || e.target.parentNode.dataset.action) {
          e.stopPropagation();
          handleAction(item.id, item.label);
          return;
        }
        toggleItem(item.id, item.label);
      };

      grid.appendChild(card);
    });
  });
}

/* ===========================
   AÇÕES & NOTIFICAÇÕES
=========================== */
function toggleItem(id, label){
  let order = getOrder();

  if(order.includes(id)){
    order = order.filter(x => x !== id);
    showToast(`Removido: <b>${label}</b>`, 'normal');
  } else {
    if(order.length >= CONFIG.MAX_TABS) {
      showToast(`Limite de ${CONFIG.MAX_TABS} abas atingido!`, 'error');
      return;
    }
    order.push(id);
    showToast(`Adicionado: <b>${label}</b>`, 'success');
  }

  save(CONFIG.KEYS.ORDER, order);
  renderBar();

  setTimeout(() => {
    const button = document.querySelector(`#filterScroller .filter-tag[data-id="${id}"]`);
    if (button) {
      button.click();
    }
  }, 100);
}

function handleAction(id, label){
  const mode = getMode();
  let order = getOrder();

  if(mode === 'dynamic') {
    order = order.filter(x => x !== id);
    save(CONFIG.KEYS.ORDER, order);
    showToast(`Removido: <b>${label}</b>`);
    renderBar();
    const currentInput = document.getElementById('ag-search-input');
    const currentValue = currentInput ? currentInput.value : '';
    renderDrawer(currentValue);
    if (currentInput) currentInput.value = currentValue;
  } else {
    const currentIndex = order.indexOf(id);
    const newPos = prompt(`Mover "${label}" para qual posição? (1-${order.length})`, currentIndex + 1);

    if(newPos !== null){
      const targetIndex = parseInt(newPos) - 1;
      if(!isNaN(targetIndex) && targetIndex >= 0 && targetIndex < order.length) {
        order.splice(currentIndex, 1);
        order.splice(targetIndex, 0, id);
        save(CONFIG.KEYS.ORDER, order);
        renderBar();
        const currentInput = document.getElementById('ag-search-input');
        const currentValue = currentInput ? currentInput.value : '';
        renderDrawer(currentValue);
        if (currentInput) currentInput.value = currentValue;
        showToast(`<b>${label}</b> movido para posição ${newPos}`);
      }
    }
  }
}

/* ===========================
   FUNÇÃO: Garante que a aba exista no order
=========================== */
function ensureTabExists(id){
  const exists = CATALOGO.some(sec => sec.id === id || sec.itens.some(i => i.id === id));
  if (!exists) return false;

  let order = getOrder();
  if (!order.includes(id)) {
    if (order.length >= CONFIG.MAX_TABS) {
      order.pop();
    }
    order.unshift(id);
    save(CONFIG.KEYS.ORDER, order);
  }
  return true;
}

/* ===========================
   CARREGAMENTO DE SEÇÃO POR URL (Deep Linking & Params)
=========================== */
window.addEventListener('DOMContentLoaded', () => {
  renderBar();

  const params = new URLSearchParams(window.location.search);
  const newsId = params.get('id');
  const secaoForcada = params.get('secao');
  
  if (newsId) {
    const abaAlvo = 'saihate_no_paladin';
    
    if(ensureTabExists(abaAlvo)) {
        renderBar(); 
        setTimeout(() => {
            const btn = document.querySelector(`#filterScroller .filter-tag[data-id="${abaAlvo}"]`);
            if(btn) {
                document.querySelectorAll('#filterScroller .filter-tag').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                if (window.carregarSecao) {
                    window.carregarSecao(abaAlvo);
                } else {
                    btn.click();
                }
            }
        }, 200);
    }
    return;
  }

  if (secaoForcada) {
    if(ensureTabExists(secaoForcada)) {
        renderBar();
        setTimeout(() => {
            const btn = document.querySelector(`#filterScroller .filter-tag[data-id="${secaoForcada}"]`);
            if (btn) {
                document.querySelectorAll('#filterScroller .filter-tag').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                btn.click();
            } else if (window.carregarSecao) {
                window.carregarSecao(secaoForcada);
            }
        }, 150);
    }
  }
});

})();
