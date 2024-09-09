<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreVectorAssetsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'max:255'],
            'description' => ['required', 'max:1000'],
            'vector_category_id' => ['required', 'exists:vector_categories,id'],
            'file' => ['required', 'file', 'mimes:svg,png,jpg,jpeg', 'max:2048'], // sesuaikan ekstensi dan ukuran file sesuai kebutuhan
            'status' => ['required', 'in:active,inactive'],
        ];
    }
}
