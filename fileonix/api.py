import frappe
import json

@frappe.whitelist()
def dynamic_get_data(doctype, fields=None, filters=None, limit=20, order_by=None):

    if not frappe.has_permission(doctype, "read"):
        frappe.throw("Not permitted", frappe.PermissionError)

    if isinstance(fields, str):
        fields = json.loads(fields)

    if isinstance(filters, str):
        filters = json.loads(filters)

    if not fields:
        fields = ["name"]

    return frappe.get_list(
        doctype,
        fields=fields,
        filters=filters,
        limit_page_length=int(limit),
        order_by=order_by
    )