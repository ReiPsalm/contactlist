<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactList extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function scopeContactList($query)
    {
        return $query->select('contact_id', 'name', 'isDeleted');
    }

    public function scopeViewContact($query, $contact_id)
    {
        return $query->where('contact_id', $contact_id);
    }

    public function scopeSoftdelete($query)
    {
        return $query->update(['isDeleted' => true]);
    }

    public function scopeRestoreContact($query)
    {
        return $query->update(['isDeleted' => false]);
    }

    public function scopeCheckMobile($query, $mobile)
    {
        return $query->where('mobile', $mobile);
    }

    public function scopeContactUpdate($query, $request)
    {
        return $query->where('email', $request['email'])->update([
            'name' => $request['name'],
            'mobile' => $request['mobile'],
            'address' => $request['address'],
            'notes' => $request['notes'],
            'email' => $request['email'],
        ]);
    }

    public function scopeContactStore($query, $request)
    {
        return $query->create([
            'name' => $request['name'],
            'mobile' => $request['mobile'],
            'address' => $request['address'],
            'notes' => $request['notes'],
            'email' => $request['email'],
        ]);
    }

    public function scopeUploadImage($query, $request)
    {
        return $query->update(['image' => $request['image']]);
    }
}
