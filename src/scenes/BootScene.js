/**
 * BootScene.js
 * High-speed silent asset loader scene.
 * Loads all 32 waste items, environment chutes, and backgrounds into the Phaser TextureManager
 * without showing a duplicate black loading screen, handing off immediately to SplashScene.
 */
import { GAME_CONFIG } from '../config.js';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    // 1. Backgrounds
    this.load.image('bg_cover_splash', 'assets/backgrounds/bg_cover_splash.png');
    this.load.image('bg_facility_main', 'assets/backgrounds/bg_facility_main.png');
    this.load.image('map_city_overworld', 'assets/backgrounds/map_city_overworld.png');
    this.load.image('bg_level_1_residential', 'assets/backgrounds/bg_level_1_residential.png');
    this.load.image('bg_level_2_business', 'assets/backgrounds/bg_level_2_business.png');
    this.load.image('bg_level_3_culinary', 'assets/backgrounds/bg_level_3_culinary.png');
    this.load.image('bg_level_4_market', 'assets/backgrounds/bg_level_4_market.png');
    this.load.image('bg_level_5_metropolis', 'assets/backgrounds/bg_level_5_metropolis.png');

    // 2. Chutes & Modern Wheelie Sorting Bins
    this.load.image('chute_organic', 'assets/environment/chute_organic.png');
    this.load.image('chute_recycle', 'assets/environment/chute_recycle.png');
    this.load.image('chute_hazard', 'assets/environment/chute_hazard.png');
    this.load.image('chute_residual', 'assets/environment/chute_residual.png');

    this.load.image('bin_organic', 'assets/environment/bin_organic.png');
    this.load.image('bin_recycle', 'assets/environment/bin_recycle.png');
    this.load.image('bin_hazard', 'assets/environment/bin_hazard.png');
    this.load.image('bin_residual', 'assets/environment/bin_residual.png');

    // 3. Waste Items (Organik - 12 items)
    this.load.image('item_apple_core', 'assets/items/item_apple_core.png');
    this.load.image('item_dry_leaves', 'assets/items/item_dry_leaves.png');
    this.load.image('item_snack_fruit', 'assets/items/item_snack_fruit.png');
    this.load.image('item_orange_peel', 'assets/items/item_orange_peel.png');
    this.load.image('item_fish_bone', 'assets/items/item_fish_bone.png');
    this.load.image('item_chicken_bone', 'assets/items/item_chicken_bone.png');
    this.load.image('item_banana_peel', 'assets/items/item_banana_peel.png');
    this.load.image('item_egg_shell', 'assets/items/item_egg_shell.png');
    this.load.image('item_bread_crust', 'assets/items/item_bread_crust.png');
    this.load.image('item_corn_cob', 'assets/items/item_corn_cob.png');
    this.load.image('item_tea_bag', 'assets/items/item_tea_bag.png');
    this.load.image('item_coffee_grounds', 'assets/items/item_coffee_grounds.png');

    // 4. Waste Items (Anorganik Daur Ulang - 12 items)
    this.load.image('item_school_paper', 'assets/items/item_school_paper.png');
    this.load.image('item_milk_carton', 'assets/items/item_milk_carton.png');
    this.load.image('item_plastic_bottle', 'assets/items/item_plastic_bottle.png');
    this.load.image('item_plastic_cup', 'assets/items/item_plastic_cup.png');
    this.load.image('item_aluminum_can', 'assets/items/item_aluminum_can.png');
    this.load.image('item_cardboard_box', 'assets/items/item_cardboard_box.png');
    this.load.image('item_newspaper', 'assets/items/item_newspaper.png');
    this.load.image('item_glass_bottle', 'assets/items/item_glass_bottle.png');
    this.load.image('item_glass_jar', 'assets/items/item_glass_jar.png');
    this.load.image('item_metal_can_food', 'assets/items/item_metal_can_food.png');
    this.load.image('item_cardboard_cup', 'assets/items/item_cardboard_cup.png');
    this.load.image('item_shampoo_bottle', 'assets/items/item_shampoo_bottle.png');

    // 5. Waste Items (B3 Hazard - 12 items)
    this.load.image('item_whiteboard_marker', 'assets/items/item_whiteboard_marker.png');
    this.load.image('item_antiseptic_bottle', 'assets/items/item_antiseptic_bottle.png');
    this.load.image('item_battery_aa', 'assets/items/item_battery_aa.png');
    this.load.image('item_bleach_bottle', 'assets/items/item_bleach_bottle.png');
    this.load.image('item_spray_pesticide', 'assets/items/item_spray_pesticide.png');
    this.load.image('item_thermometer', 'assets/items/item_thermometer.png');
    this.load.image('item_fluorescent_lamp', 'assets/items/item_fluorescent_lamp.png');
    this.load.image('item_expired_medicine', 'assets/items/item_expired_medicine.png');
    this.load.image('item_broken_glass', 'assets/items/item_broken_glass.png');
    this.load.image('item_electronics_mouse', 'assets/items/item_electronics_mouse.png');
    this.load.image('item_paint_can', 'assets/items/item_paint_can.png');
    this.load.image('item_syringe', 'assets/items/item_syringe.png');

    // 6. Waste Items (Residu - 12 items)
    this.load.image('item_snack_wrapper', 'assets/items/item_snack_wrapper.png');
    this.load.image('item_plastic_straw', 'assets/items/item_plastic_straw.png');
    this.load.image('item_coffee_sachet', 'assets/items/item_coffee_sachet.png');
    this.load.image('item_plastic_bag', 'assets/items/item_plastic_bag.png');
    this.load.image('item_diaper', 'assets/items/item_diaper.png');
    this.load.image('item_dirty_tissue', 'assets/items/item_dirty_tissue.png');
    this.load.image('item_cigarette_butt', 'assets/items/item_cigarette_butt.png');
    this.load.image('item_dirty_styrofoam', 'assets/items/item_dirty_styrofoam.png');
    this.load.image('item_bubble_wrap', 'assets/items/item_bubble_wrap.png');
    this.load.image('item_broken_ceramic', 'assets/items/item_broken_ceramic.png');
    this.load.image('item_mika_plastic', 'assets/items/item_mika_plastic.png');
    this.load.image('item_sanitary_pad', 'assets/items/item_sanitary_pad.png');
  }

  create() {
    this.scene.start('SplashScene');
  }
}
