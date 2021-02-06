<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ContactList;
use App\Models\ContactNote;

class ContactController extends Controller
{
    public function fetch()
    {
        return ContactList::contactlist()->get()->toJson();
    }

    public function view($contact_id)
    {
        return ContactList::viewcontact($contact_id)->get()->toJson();
    }

    public function delete($contact_id)
    {
        if(ContactList::viewcontact($contact_id)->softdelete()) {
            return response()->json([
                'header' => 'Contact successfully removed!',
                'message' => 'You have successfully removed a contact.',
                'status' => 200
            ]);
        }else {
            return response()->json([
                'header' => 'Server Failed!',
                'message' => 'Oh My Dear Bananas!, Please try reloading the page again.',
                'status' => 500
            ]);
        }
    }

    public function restore($contact_id)
    {
        if(ContactList::viewcontact($contact_id)->restorecontact()) {
            return response()->json([
                'header' => 'Contact successfully restored!',
                'message' => 'You have successfully restored a contact.',
                'status' => 200
            ]);
        }else {
            return response()->json([
                'header' => 'Server Failed!',
                'message' => 'Oh My Dear Bananas!, Please try reloading the page again.',
                'status' => 500
            ]);
        }
    }

    public function changeimage(Request $request, $contact_id)
    {
        if(ContactList::viewcontact($contact_id)->uploadimage($request->all())) {
            return response()->json([
                'header' => 'Contact image successfully added!',
                'message' => 'You have successfully added a new Image to a contact.',
                'status' => 200
            ]);
        }else {
            return response()->json([
                'header' => 'Server Failed!',
                'message' => 'Oh My Dear Bananas!, Please try reloading the page again.',
                'status' => 500
            ]);
        }
    }

    public function store(Request $request)
    {
        if(ContactList::checkmobile($request->input('mobile'))->count() >= 1) {
            return response()->json([
                'header' => 'Mobile number exist!',
                'message' => 'The mobile you have entered is already existed. Please try another mobile.',
                'status' => 400
            ]);
        }else {
            if(ContactList::contactstore($request->all())) {
                return response()->json([
                    'header' => 'Contact successfully saved!',
                    'message' => 'You have successfully added a new contact.',
                    'status' => 200
                ]);
            }else {
                return response()->json([
                    'header' => 'Server Failed!',
                    'message' => 'Oh My Dear Bananas!, Please try reloading the page again.',
                    'status' => 500
                ]);
            }
        }
    }

    public function patch(Request $request)
    {
        if(ContactList::contactupdate($request->all())) {
            return response()->json([
                'header' => 'Contact successfully updated!',
                'message' => 'You have successfully updated a contact.',
                'status' => 200
            ]);
        }else {
            return response()->json([
                'header' => 'Server Failed!',
                'message' => 'Oh My Dear Bananas!, Please try reloading the page again.',
                'status' => 500
            ]);
        }
    }
}
