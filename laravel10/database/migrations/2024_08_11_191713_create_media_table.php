<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('webinar_videos', function (Blueprint $table) {
            $table->id();
            $table->string('type');
            $table->string('titre');
            $table->text('description')->nullable();
            $table->date('date')->nullable();
            $table->string('video')->nullable();
            $table->string('poster')->nullable();
            $table->boolean('etat')->default(1);
            $table->integer('ordre')->nullable();
            $table->timestamp('date_creation')->nullable();
            $table->string('lien')->nullable();
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('media');
    }
};
